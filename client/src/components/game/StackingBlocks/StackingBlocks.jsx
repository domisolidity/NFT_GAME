import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import "./StackingBlocks.css";
import GameInterface from "../GameInterface";
import GameItem from "../GameItem";

const StackingBlocks = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[0];

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chance, setChance] = useState("");
  const [gameEnded, setGameEnded] = useState(true);
  const [gameItems, setGameItems] = useState("");
  const [itemEffect, setItemEffect] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // 로그인 되어있으면 해당계정의 남은 기회와 점수를 불러온다
  useEffect(async () => {
    await GameInterface.setParticipant(account, gameTitle);
    setChance(await GameInterface.getMyChance(account, gameTitle));
    setBestScore(await GameInterface.getMyBestScore(account, gameTitle));
    setGameItems(await GameInterface.getGameItems());
  }, []);

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 게임이 끝나서 점수가 State에 들어오면 게임기록 서버에 전송
  useEffect(async () => {
    if (document.querySelector("#blockGameContainer.ended")) {
      await GameInterface.sendScore(account, gameTitle, score, itemEffect);
      const recivedBestScore = await GameInterface.getMyBestScore(
        account,
        gameTitle
      );
      setBestScore(recivedBestScore);
    }
  }, [score]);

  // 게임시작
  const playGame = async () => {
    if (
      !(
        document.querySelector("#blockGameContainer.playing") ||
        document.querySelector("#blockGameContainer.resetting")
      )
    )
      return;
    setIsPlaying(true);
    setGameEnded(false); // 게임상태 변경
    await GameInterface.minusGameCount(account, gameTitle); // 횟수 차감
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
    setItemEffect(1); // 이전판 아이템 효과 제거
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

  // 블록쌓기 게임 불러오기
  useEffect(() => {
    if (!(account && auth)) return;
    setTimeout(() => {
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
    }, 500);
  }, [account, auth]);

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
                <GameItem
                  key={item.itemId}
                  item={item}
                  gameTitle={gameTitle}
                  getItemEffect={getItemEffect}
                  itemEffect={itemEffect}
                  isPlaying={isPlaying}
                  updateChance={updateChance}
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
