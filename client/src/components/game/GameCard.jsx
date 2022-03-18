import React from "react";

const GameCard = (props) => {
  const selectGame = () => {
    props.selectGame(props.gameTitle);
  };
  return (
    <div>
      게임카드{props.gameTitle}
      <button onClick={selectGame}>버튼</button>
    </div>
  );
};

export default GameCard;
