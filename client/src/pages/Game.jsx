import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/game/GameCard";
import GameInterface from "../components/game/GameInterface";
import GameListSidebar from "../components/game/GameListSidebar";
import StackingBlocks from "../components/game/StackingBlocks/StackingBlocks";
import Tetris from "../components/game/Tetris/Tetris";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;

  // 실행중인 게임
  const [runningGame, setRunningGame] = useState("");

  // 게임 선택
  const selectGame = async (selectedGame) => {
    setRunningGame(selectedGame);
  };

  // 선택한 게임 컴포넌트 소환
  const settingGame = () => {
    switch (runningGame) {
      case "":
        break;
      case GameInterface.gameList[0].gameTitle:
        return <StackingBlocks />;
      case GameInterface.gameList[1].gameTitle:
        return <Tetris />;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(runningGame);
  }, [runningGame]);

  return (
    <>
      {account && auth ? (
        <Flex>
          {runningGame != "" ? (
            <GameListSidebar selectGame={selectGame} />
          ) : // 실행중인 게임이 없으면 사이드바 표시 안하기
          null}
          <Box w={"100%"}>
            {runningGame == "" ? (
              // 실행중인 게임이 없을 땐 게임선택칸 크게
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
      ) : (
        <div>로그인 좀 하세요</div>
      )}
    </>
  );
};

export default Game;
