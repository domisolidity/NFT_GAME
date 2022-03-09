import React from "react";
import { useSelector } from "react-redux";

const BlockGame = () => {
  const blockchain = useSelector(state=>state.blockchain);
  const { account } = blockchain;
  return (
    <div>
      {console.log("Game.jsx 렌더")}

      <p>address : {account}</p>
    </div>
  );
};

export default BlockGame;
