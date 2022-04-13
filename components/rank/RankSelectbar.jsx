import React, { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";

const RankSelectbar = ({ gameList, getSelectedGameTitle }) => {
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
    <Flex m={"0 10px"} flexDirection={"column"}>
      {gameList.map((game) => (
        <button
          className="rank-menu-button"
          name={game.gameTitle}
          key={game.gameId}
          onClick={selectGame}
        >
          {game.gameTitle}
        </button>
      ))}
      <style jsx>{`
        .rank-menu-button {
          margin: 10px 5px;
          background-color: rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 10px;
        }
        .rank-menu-button:hover {
          background-color: #7e09bd5c;
        }
        .rank-menu-button.active {
          background-color: #7e09bd5c;
        }
      `}</style>
    </Flex>
  );
};

export default RankSelectbar;
