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
  const { account, gameTitle, score, resultBonus, getAttemptsMade, gameStart } = props;

  const reStart = () => {
    dispatch(restartGame());
    gameStart();
  };
  const giveUp = () => {
    if (!window.confirm(`현재 점수의 절반만 얻고 게임을 포기합니다.`)) return;
    GameInterface.sendScore(account, gameTitle, score / 2, resultBonus);
    dispatch(giveUpGame());
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
        남은 열쇠: {attemptsMade}/{MAX_ATTEMPTS}
      </p>
      <div>
        <Button disabled={gameStatus == GameStatus.IN_PROGRESS} onClick={() => reStart()}>
          재시작
        </Button>
        <Button
          disabled={attemptsMade > MAX_ATTEMPTS - MAX_ATTEMPTS / 3 || gameStatus != GameStatus.IN_PROGRESS}
          onClick={() => giveUp()}
        >
          포기하기
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
