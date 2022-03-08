import React from "react";
import { useSelector } from "react-redux";

const Game = () => {
  const blockchain = useSelector(state=>state.blockchain);

  return (
    <div>
      {console.log("Game.jsx 렌더")}

      <p>address : {blockchain.account}</p>
    </div>
  );
};

export default Game;
