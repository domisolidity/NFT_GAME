import { MAX_ATTEMPTS, DANGER_ATTEMPTS, GameStatus } from "../../consts";
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/contextProvider";
import { restartGame, giveUpGame } from "../../store/actions";
import { countOpenedChests } from "../../utils";
import Button from "../UI/Button/Button";
import "./ControlPanel.css";
import GameInterface from "../../../GameInterface";

const ControlPanel = (props) => {
  const [state, dispatch] = useContext(Context);
  const { gameStatus, chests } = state;
  const openedChests = countOpenedChests(chests);
  let attemptsMade = MAX_ATTEMPTS - openedChests;

  const reStart = () => {
    dispatch(restartGame());
    props.gameStart();
  };
  const giveUp = () => {
    dispatch(giveUpGame());
    GameInterface.sendScore(props.account, props.gameTitle, props.score / 2, props.itemEffect);
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
      <div>
        <Button disabled={gameStatus == GameStatus.IN_PROGRESS} onClick={() => reStart()}>
          재시작
        </Button>
        <Button disabled={attemptsMade > MAX_ATTEMPTS - MAX_ATTEMPTS / 3} onClick={() => giveUp()}>
          포기하기
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
