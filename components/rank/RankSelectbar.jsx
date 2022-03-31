import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const RankSelectbar = ({ gameList, getSelectedGameTitle }) => {
  // 선택한 게임명을 부모함수로 넘기기
  const selectGame = (e) => {
    getSelectedGameTitle(e.target.name);
  };

  return (
    <Flex m={"0 10px"} flexDirection={"column"}>
      {gameList.map((game) => (
        <Button
          name={game.gameTitle}
          key={game.gameId}
          onClick={selectGame}
          m={"10px 5px"}
          w={""}
        >
          {game.gameTitle}
        </Button>
      ))}
    </Flex>
  );
};

export default RankSelectbar;
