import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import "./BlockGame.css";

const BlockGame = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const [score, setScore] = useState("");
  const [chance, setChance] = useState("");
  const [gameEnded, setGameEnded] = useState(true);

  // 처음 한번 게임 관련 스크립트를 html에 넣어준다
  useEffect(async () => {
    getStackingBlocksGame();
  }, []);
  // 계정이 있으면 해당계정의 남은 기회를 불러온다
  useEffect(() => {
    if (!account) return;
    giveMeChance();
  }, [account]);

  // 남은 기회 가져오기
  const giveMeChance = async () => {
    await axios
      .post(`http://localhost:5000/game/my-count`, { account: account })
      .then((res) => {
        setChance(res.data.gameCount);
      })
      .catch((err) => console.log(err));
  };

  // 게임 기회 차감하기
  const minusGameCount = async () => {
    if (!account) return;
    if (document.querySelector("#blockGameContainer.playing") == null) return;
    await axios
      .post(`http://localhost:5000/game/minus-count`, { account: account })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // 게임상태 설정(게임 시작,재시작 누를때 종료상태 풀어주기)
  const setGameStateOn = () => {
    setGameEnded(false);
    setTimeout(() => {
      minusGameCount();
    }, 500);
  };

  // 블록쌓기
  const stackingBlock = () => {
    // 멈춰 버튼 누를때마다 점수useState에 담기
    setScore(document.querySelector("#score").innerHTML);
    // 게임이 종료됐을때 게임상태useState 종료로 해주기
    if (document.querySelector("#blockGameContainer.playing") == null) {
      setGameEnded(true);
    }
  };

  // 점수 등록(전송)
  const sendScore = async () => {
    await axios
      .post(`http://localhost:5000/game/send-score`, { score: parseInt(score) })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // 블록쌓기 게임 불러오기
  const getStackingBlocksGame = async () => {
    // <script>에 들어갈 js들의 src
    const scriptSrc = [
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js",
      "./blockGameScript.js",
    ];
    const scripts = [, ,];
    for (let i = 0; i < scriptSrc.length; i++) {
      // <script> 태그를 만들어 배열에 넣고
      scripts[i] = document.createElement("script");
      // 그 태그의 src 정보를 넣어
      scripts[i].src = scriptSrc[i];
      scripts[i].async = true;
      // 문서 body에 추가해준다
      document.body.appendChild(scripts[i]);
    }

    return () => {
      scripts.forEach((script) => {
        // 스크립트 태그 지워주는 녀석
        document.body.removeChild(script);
      });
    };
  };

  return (
    <div id="blockGameContainer">
      <div id="game"></div>
      <div id="score">0</div>
      <Box color={"#333344"} id="instructions">
        블록을 높이 쌓으세요
      </Box>
      <div className="game-over">
        <Button id="restart-button" onClick={setGameStateOn}>
          다시시작
        </Button>
        <h2>게임 종료</h2>
        <p>대~단합니다</p>
      </div>
      <div className="game-ready">
        <Button id="start-button" onClick={setGameStateOn}>
          시작
        </Button>
        <div></div>
      </div>
      {/* <GameCountBox chance={chance} /> */}
      <Box color={"#333344"} className="chance-box">
        남은기회
        <Text fontWeight={"bold"} textAlign={"center"}>
          {chance}
        </Text>
      </Box>
      <Button
        colorScheme={"blue"}
        w={100}
        onClick={stackingBlock}
        disabled={gameEnded}
        className="placeBlock-button"
      >
        멈춰!
      </Button>
      <Button
        colorScheme={"orange"}
        onClick={sendScore}
        disabled={document.querySelector("#blockGameContainer.ended") == null}
        className="score-registration-button"
      >
        점수 등록
      </Button>
      {/* <Button
        colorScheme={"orange"}
        onClick={minusGameCount}
        className="score-registration-button"
      >
        기회
      </Button> */}
    </div>
  );
};

export default BlockGame;
