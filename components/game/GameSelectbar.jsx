import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import GameInterface from "./GameInterface";
import Link from "next/link";

const GameSelectbar = () => {
  return (
    <Flex m={"0 10px 10px"} justifyContent={"space-evenly"}>
      {GameInterface.gameList.map((game, index) => (
        <Link href={`/game/${game.gameUrl}`} key={index} m={"10px 5px"}>
          <a>
            <Button>{game.gameTitle}</Button>
          </a>
        </Link>
      ))}
    </Flex>
  );
};

export default GameSelectbar;
