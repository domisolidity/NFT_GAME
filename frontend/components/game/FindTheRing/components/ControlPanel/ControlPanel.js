import { MAX_ATTEMPTS, DANGER_ATTEMPTS, GameStatus } from "../../consts";
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/contextProvider";
import { restartGame, giveUpGame } from "../../store/actions";
import { countOpenedChests } from "../../utils";
import Button from "../UI/Button/Button";
import GameInterface from "../../../GameInterface";

const ControlPanel = (props) => {
  const [state, dispatch] = useContext(Context);
  const { gameStatus, chests } = state;
  const openedChests = countOpenedChests(chests);
  let attemptsMade = MAX_ATTEMPTS - openedChests;
  const { account, gameTitle, score, itemEffect, getAttemptsMade, gameStart } = props;

  const reStart = () => {
    dispatch(restartGame());
    gameStart();
  };
  const giveUp = () => {
    if (!window.confirm(`현재 점수의 반만 얻고 게임을 포기합니다.`)) return;
    dispatch(giveUpGame());
    GameInterface.sendScore(account, gameTitle, score / 2, itemEffect);
  };

  useEffect(() => {
    if (gameStatus == GameStatus.IN_PROGRESS) {
      getAttemptsMade(attemptsMade);
    } else if (gameStatus == GameStatus.DEFEAT) {
      getAttemptsMade(0);
    } else if (gameStatus == GameStatus.VICTORY) {
      getAttemptsMade(attemptsMade + 1);
    }
  }, [attemptsMade]);

  return (
    <div className="ControlPanel">
      <p className="ControlPanel__text">
        KEY: {attemptsMade}/{MAX_ATTEMPTS}
      </p>
      <div>
        <Button disabled={gameStatus == GameStatus.IN_PROGRESS} onClick={() => reStart()}>
          RESTART
        </Button>
        <Button
          disabled={attemptsMade > MAX_ATTEMPTS - MAX_ATTEMPTS / 3 || gameStatus != GameStatus.IN_PROGRESS}
          onClick={() => giveUp()}
        >
          GIVE UP
        </Button>
      </div>
      <style jsx>{`
        .ControlPanel__text {
          text-align: center;
          margin: 0 0 25px;
          font-size: 14px;
        }

        .ControlPanel__text--danger {
          color: #ea2027;
        }
      `}</style>
    </div>
  );
};

export default ControlPanel;
