import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import GameInterface from "./GameInterface";

const GameListSidebar = (props) => {
  // 버튼에 있는 텍스트를 상위 컴포넌트(Game)의 함수selectGame에 전달
  const selectGame = (e) => {
    const selectedGame = e.target.innerHTML;
    if (
      window.confirm(
        `진행 중이던 게임 정보가 사라집니다.\n${selectedGame} 게임으로 이동하시겠읍니까?`
      )
    )
      props.selectGame(e.target.innerHTML);
  };
  return (
    <Flex flexDirection={"column"} m={"0 10px"}>
      {GameInterface.gameList.map((game, index) => (
        <Button key={index} onClick={selectGame} mb={"10px"}>
          {game.gameTitle}
        </Button>
      ))}
    </Flex>
  );
};

export default GameListSidebar;
