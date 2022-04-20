import React, { useEffect } from "react";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";

const RankSelectbar = ({ gameList, getSelectedGameTitle }) => {
  // const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  useEffect(() => {
    const buttons = document.querySelectorAll(".rank-menu-button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // 이전에 active 된 메뉴 삭제
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });
        // 지금 클릭한 메뉴 active
        btn.classList.add("active");
      });
    });
  }, []);

  // 선택한 게임명을 부모함수로 넘기기
  const selectGame = (e) => {
    getSelectedGameTitle(e.target.name);

    // const body = window.document.body;
    // body.classList.add("overflow-hidden");
  };

  return (
    <Flex m={"0 10px"} flexDirection={"row"}>
      {gameList.map((game) => (
        <Button
          w={"100px"}
          h={"100px"}
          name={game.gameTitle}
          key={game.gameId}
          onClick={selectGame}
          m={"0 10px"}
          // bgColor={bgColor}
        >
          {game.gameTitle}
        </Button>
      ))}
    </Flex>
  );
};

export default RankSelectbar;
