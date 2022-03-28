import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import GameInterface from "./GameInterface";

const GameSelectbar = (props) => {
  const { getSelectGame } = props;
  // 버튼에 있는 텍스트를 상위 컴포넌트(Game)의 함수selectGame에 전달
  const selectGame = (e) => {
    const selectedGame = e.target.innerHTML;
    if (
      window.confirm(
        `진행 중이던 게임 정보가 사라집니다.\n${selectedGame} 게임으로 이동하시겠읍니까?`
      )
    )
      getSelectGame(e.target.innerHTML);
  };
  return (
    <Flex m={"0 10px"} justifyContent={"space-evenly"}>
      {GameInterface.gameList.map((game, index) => (
        <Button key={index} onClick={selectGame} m={"10px 5px"} w={""}>
          {game.gameTitle}
        </Button>
      ))}
    </Flex>
  );
};

export default GameSelectbar;
