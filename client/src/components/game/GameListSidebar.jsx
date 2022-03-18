import React from "react";
import { Button, Flex } from "@chakra-ui/react";

const GameListSidebar = (props) => {
  const selectGame = (e) => {
    props.selectGame(e.target.innerHTML);
  };
  return (
    <Flex flexDirection={"column"} m={"0 10px"}>
      {props.gameList.map((game, index) => (
        <Button key={index} onClick={selectGame}>
          {game}
        </Button>
      ))}
    </Flex>
  );
};

export default GameListSidebar;
