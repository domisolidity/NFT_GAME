import React from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import ChestContainer from "../ChestContainer/ChestContainer";

const Game = (props) => {
  return (
    <>
      <ChestContainer />
      <ControlPanel gameStart={props.gameStart} getAttemptsMade={props.getAttemptsMade} />
    </>
  );
};

export default Game;
