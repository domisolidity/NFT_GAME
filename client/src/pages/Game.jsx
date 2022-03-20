import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TreasureHunt from "../components/game/FindTheRing/containers/App/TreasureHunt";
import GameCard from "../components/game/GameCard";
import GameInterface from "../components/game/GameInterface";
import GameListSidebar from "../components/game/GameListSidebar";
import StackingBlocks from "../components/game/StackingBlocks/StackingBlocks";
import Tetris from "../components/game/Tetris/Tetris";
import usePrompt from "../hooks/PageMoveBlocker";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;

  /* 실행중인 게임 */
  const [runningGame, setRunningGame] = useState("");

  /* 게임이 선택되어있는 상태에서 페이지 이동 시 확인창 출력 */
  usePrompt(
    "진행중인 게임정보가 사라집니다. 정말로 페이지를 이동하시겠읍니까?",
    runningGame
  );

  /* 게임 선택 */
  const selectGame = async (selectedGame) => {
    // 로그인 안 하면 게임 선택 못하게 막기
    if (!(account && auth)) {
      alert("로그인 안하시면 게임 안 시켜줄겁니다");
      return;
    }
    // 선택한 게임을 useState에 담아 실행중임을 표시
    setRunningGame(selectedGame);
  };

  /* 선택한 게임 컴포넌트 소환 */
  const settingGame = () => {
    switch (runningGame) {
      case "":
        break;
      case GameInterface.gameList[0].gameTitle:
        return <StackingBlocks runningGame={runningGame} />;
      case GameInterface.gameList[1].gameTitle:
        return <Tetris runningGame={runningGame} />;
      case GameInterface.gameList[2].gameTitle:
        return <TreasureHunt runningGame={runningGame} />;

      default:
        break;
    }
  };

  return (
    <Flex>
      {runningGame != "" ? (
        <GameListSidebar selectGame={selectGame} />
      ) : // 실행중인 게임이 없으면 사이드바 표시 안하기
      null}
      <Box w={"100%"} minHeight={"400px"}>
        {runningGame == "" ? (
          // 실행중인 게임이 없을 땐 게임선택창 표시
          <Flex justifyContent={"space-evenly"}>
            {GameInterface.gameList.map((game, index) => (
              <GameCard key={index} game={game} selectGame={selectGame} />
            ))}
          </Flex>
        ) : (
          // 실행중인 게임 있으면 해당게임 컴포넌트 출력
          settingGame()
        )}
      </Box>
    </Flex>
  );
};

export default Game;
