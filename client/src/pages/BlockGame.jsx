import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import "./BlockGame.css";

const BlockGame = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const [score, setScore] = useState("");
  const [gameEnded, setGameEnded] = useState(true);

  const getGameState = () => {
    if (
      document.querySelector("#blockGameContainer.playing") ||
      document.querySelector("#blockGameContainer.resetting")
    ) {
      setGameEnded(false);
    } else {
      setGameEnded(true);
    }
  };

  const getGameScore = () => {
    setScore(document.querySelector("#score").innerHTML);
    if (!document.querySelector("#blockGameContainer.playing"))
      setGameEnded(true);
  };

  const sendScore = async () => {
    await axios
      .post(`http://localhost:5000/game/send-score`, { score: parseInt(score) })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // 랜더 될 때 게임 관련 스크립트를 html에 넣어준다
  useEffect(() => {
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
  }, []);

  return (
    <div id="blockGameContainer">
      <div id="game"></div>
      <div id="score">0</div>
      <Box color={"#333344"} id="instructions">
        블록을 높이 쌓으세요
      </Box>
      <div className="game-over">
        <Button id="restart-button" onClick={getGameState}>
          다시시작
        </Button>
        <h2>게임 종료</h2>
        <p>대~단합니다</p>
      </div>
      <div className="game-ready">
        <Button id="start-button" onClick={getGameState}>
          시작
        </Button>
        <div></div>
      </div>
      <Button
        colorScheme={"blue"}
        w={100}
        onClick={getGameScore}
        disabled={gameEnded}
        className="placeBlock-button"
      >
        멈춰!
      </Button>
      <Button
        colorScheme={"orange"}
        onClick={sendScore}
        className="score-registration-button"
      >
        점수 등록
      </Button>
    </div>
  );
};

export default BlockGame;
