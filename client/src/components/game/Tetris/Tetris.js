import React, { useEffect, useState } from "react";

import { createStage, didCollide } from "./gameHelpers";

// Custom Hooks
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
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
import GameItem from "../GameItem";

const Tetris = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[1];

  const [chance, setChance] = useState(0);
  const [gameItems, setGameItems] = useState("");
  const [itemEffect, setItemEffect] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
  };

  useEffect(async () => {
    if (!(account && auth && gameTitle)) return;
    await GameInterface.setParticipant(account, auth, gameTitle);

    setChance(await GameInterface.getMyChance(account, auth, gameTitle));
    setGameItems(await GameInterface.getGameItems());
  }, [account, auth]);

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

  const startGame = async () => {
    if (!window.confirm("횟수가 차감됩니다. 게임을 시작하시겠읍니까?")) return;
    setIsPlaying(true);
    setItemEffect(undefined); // 아이템 효과 초기화
    setChance(await GameInterface.minusGameCount(account, gameTitle)); // 횟수 차감
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
        GameInterface.sendScore(account, gameTitle, score, itemEffect);
        setIsPlaying(false);
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
              <Display text={`Chance: ${chance}`} />
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
            <StartButton callback={startGame} isPlaying={isPlaying} />
          </aside>
          <div>
            {gameItems &&
              gameItems.map((item) => (
                <GameItem
                  key={item.itemId}
                  item={item}
                  gameTitle={gameTitle}
                  getItemEffect={getItemEffect}
                  itemEffect={itemEffect}
                />
              ))}
          </div>
        </StyledTetris>
      </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;
