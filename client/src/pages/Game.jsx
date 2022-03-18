import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/game/GameCard";
import GameListSidebar from "../components/game/GameListSidebar";
import StackingBlocks from "../components/game/StackingBlocks/StackingBlocks";
import Tetris from "../components/game/Tetris/Tetris";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;

  const gameList = ["블록쌓기", "테트리스"];

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
      case gameList[0]:
        return <StackingBlocks />;
      case gameList[1]:
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
            <GameListSidebar gameList={gameList} selectGame={selectGame} />
          ) : null}
          <Box w={"100%"}>
            {runningGame == ""
              ? gameList.map((gameCard, index) => (
                  <GameCard
                    key={index}
                    gameTitle={gameCard}
                    selectGame={selectGame}
                  />
                ))
              : settingGame()}
          </Box>
        </Flex>
      ) : (
        <div>로그인 좀 하세요</div>
      )}
    </>
  );
};

export default Game;
