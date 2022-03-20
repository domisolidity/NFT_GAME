import { MAX_ATTEMPTS, DANGER_ATTEMPTS, GameStatus } from "../../consts";
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/contextProvider";
import { restartGame } from "../../store/actions";
import { countOpenedChests } from "../../utils";
import Button from "../UI/Button/Button";
import "./ControlPanel.css";

const ControlPanel = (props) => {
  const [state, dispatch] = useContext(Context);
  const { gameStatus, chests } = state;
  const openedChests = countOpenedChests(chests);
  let attemptsMade = MAX_ATTEMPTS - openedChests;

  const reStart = () => {
    dispatch(restartGame());
    props.gameStart();
  };

  useEffect(() => {
    if (gameStatus == GameStatus.IN_PROGRESS) {
      props.getAttemptsMade(attemptsMade);
    } else if (gameStatus == GameStatus.DEFEAT) {
      props.getAttemptsMade(0);
    } else if (gameStatus == GameStatus.VICTORY) {
      props.getAttemptsMade(attemptsMade + 1);
    }
  }, [attemptsMade]);

  return (
    <div className="ControlPanel">
      <p className="ControlPanel__text">
        남은 열쇠: {attemptsMade}/{MAX_ATTEMPTS}
      </p>
      <Button disabled={gameStatus == GameStatus.IN_PROGRESS} onClick={() => reStart()}>
        재시작
      </Button>
    </div>
  );
};

export default ControlPanel;
