import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import "./StackingBlocks.css";
import InventoryBox from "./InventoryBox";
import GameInterface from "../GameInterface";

const StackingBlocks = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[0];

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chance, setChance] = useState("");
  const [gameEnded, setGameEnded] = useState(true);
  const [gameItems, setGameItems] = useState([]);
  const [itemEffect, setItemEffect] = useState(undefined);

  // 로그인 되어있으면 해당계정의 남은 기회와 점수를 불러온다
  useEffect(async () => {
    if (!(account && auth && props.runningGame)) return;
    await GameInterface.setParticipant(account, auth, gameTitle);
    setChance(await GameInterface.getMyChance(account, auth, gameTitle));
    setBestScore(await GameInterface.getMyBestScore(account, auth, gameTitle));
    setGameItems(await GameInterface.getGameItems());
  }, [props.runningGame]);

  // 게임이 끝나서 점수가 State에 들어오면 게임기록 서버에 전송
  useEffect(async () => {
    if (document.querySelector("#blockGameContainer.ended")) {
      // await GameInterface.sendScore(
      //   account,
      //   auth,
      //   gameTitle,
      //   score,
      //   itemEffect
      // );
      sendScore(score);
    }
  }, [score]);

  // 게임 기회 차감하기
  const minusGameCount = async () => {
    if (!account) return;

    await axios
      .post(`/api/games/stacking-blocks/minus-count`, { account: account })
      .then((res) => setChance(res.data.gameCount)) // 차감 후 화면에 횟수 갱신
      .catch((err) => console.log(err));
  };

  // 게임시작
  const playGame = () => {
    if (
      !(
        document.querySelector("#blockGameContainer.playing") ||
        document.querySelector("#blockGameContainer.resetting")
      )
    )
      return;
    setGameEnded(false); // 게임상태 변경
    minusGameCount(); // 횟수 차감
    setItemEffect(undefined); // 이전판 아이템 효과 제거
  };

  // 블록쌓기
  const stackingBlock = () => {
    // 게임이 끝나면
    if (document.querySelector("#blockGameContainer.ended")) {
      setGameEnded(true); // 게임상태 변경
      // 현재 점수 useState에 담기
      setScore(document.querySelector("#score").innerHTML);
    }
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
  };

  // 점수 등록(전송)
  const sendScore = async (score) => {
    await axios
      .post(`/api/games/stacking-blocks/send-score`, {
        account: account,
        score: parseInt(score),
        itemEffect: itemEffect,
      })
      .then((res) => setBestScore(res.data.gameScore))
      .catch((err) => console.log(err));
  };

  // 블록쌓기 게임 불러오기
  useEffect(() => {
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
  }, [account]);

  return (
    <>
      {account ? (
        <>
          <div id="blockGameContainer">
            <div id="game"></div>
            <div id="score">0</div>
            <Box color={"#333344"} id="instructions">
              블록을 높이 쌓으세요
            </Box>
            <div className="game-over">
              <Button id="restart-button" onClick={playGame}>
                다시시작
              </Button>
              <h2>게임 종료</h2>
              <p>대~단합니다</p>
            </div>
            <div className="game-ready">
              <Button
                id="start-button"
                onClick={playGame}
                disabled={!gameEnded}
              >
                시작
              </Button>
              <div></div>
            </div>
            <Box color={"#333344"} className="my-score-box">
              최고점수
              <Text fontWeight={"bold"} textAlign={"center"}>
                {bestScore}
              </Text>
            </Box>
            <Box color={"#333344"} className="chance-box">
              남은기회
              <Text fontWeight={"bold"} textAlign={"center"}>
                {chance}
              </Text>
            </Box>
            {itemEffect ? (
              <Box color={"#333344"} className="item-effect-box">
                x {itemEffect}!
              </Box>
            ) : null}
            <Button
              colorScheme={"blue"}
              w={100}
              onClick={stackingBlock}
              disabled={gameEnded}
              className="placeBlock-button"
            >
              멈춰!
            </Button>
          </div>
          <Flex justifyContent={"center"}>
            {gameItems &&
              gameItems.map((item) => (
                <InventoryBox
                  key={item.itemId}
                  item={item}
                  gameTitle={gameTitle}
                  getItemEffect={getItemEffect}
                  gameEnded={gameEnded}
                />
              ))}
          </Flex>
        </>
      ) : (
        <div>로그인 해주세요</div>
      )}
    </>
  );
};

export default StackingBlocks;
