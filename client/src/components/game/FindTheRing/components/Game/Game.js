import React from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import ChestContainer from "../ChestContainer/ChestContainer";

const Game = (props) => {
  return (
    <>
      <ChestContainer />
      <ControlPanel
        account={props.account}
        gameTitle={props.gameTitle}
        score={props.score}
        itemEffect={props.itemEffect}
        gameStart={props.gameStart}
        getAttemptsMade={props.getAttemptsMade}
      />
    </>
  );
};

export default Game;
