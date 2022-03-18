import React, { useEffect, useState } from "react";

import { createStage, didCollide } from "./gameHelpers";

// Custom Hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/userPlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus } from "./hooks/useGameStatus";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import GameInterface from "../GameInterface";
import { useSelector } from "react-redux";

const Tetris = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle, requestAddress } = GameInterface.gameList[1];
  const [chance, setChance] = useState("");

  //   useEffect(() => {
  //     setChance(GameInterface.getMyChance(account, auth, requestAddress));
  //   }, [account, auth]);

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  // left-right
  const movePlayer = (dir) => {
    if (didCollide(player, stage, { x: dir, y: 0 })) return;
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    // minusGameCount(); // 횟수 차감
    //reset everything
    setStage(createStage());
    setDropTime(1000); // 1 sec
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // also increase the speed
      setDropTime(1000 / (level + 1) + 100);
    }

    if (didCollide(player, stage, { x: 0, y: 1 })) {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    } else {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (gameOver) return;

    if (keyCode === 40) {
      setDropTime(1000 / (level + 1) + 100); // 1 sec
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        //left
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right
        movePlayer(1);
      } else if (keyCode === 40) {
        //down
        dropPlayer();
      } else if (keyCode === 38) {
        // up
        playerRotate(stage, -1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    // style wrapper to cover whole of the page to catch key presses
    <>
      <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
        <StyledTetris>
          <Stage stage={stage} gameOver={gameOver} />
          <aside>
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
            <StartButton callback={startGame} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;
