import React, { useEffect, useState } from "react";

import { createStage, didCollide } from "../../components/game/Tetris/gameHelpers";

// Custom Hooks
import { useInterval } from "../../components/game/Tetris/hooks/useInterval";
import { usePlayer } from "../../components/game/Tetris/hooks/usePlayer";
import { useStage } from "../../components/game/Tetris/hooks/useStage";
import { useGameStatus } from "../../components/game/Tetris/hooks/useGameStatus";

// Components
import Stage from "../../components/game/Tetris/Stage";
import Display from "../../components/game/Tetris/Display";
import StartButton from "../../components/game/Tetris/StartButton";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "../../components/game/Tetris/styles/StyledTetris";

import GameInterface from "../../components/game/GameInterface";
import { useSelector } from "react-redux";
import GameItem from "../../components/game/GameItem";
import GameSelectbar from "../../components/game/GameSelectbar";

const Tetris = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[1];

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const [chance, setChance] = useState("");
  const [gameItems, setGameItems] = useState("");
  const [itemEffect, setItemEffect] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState("");

  // 키보드 스크롤 방지
  function stopScroll(e) {
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
      e.preventDefault();
    }
  }

  useEffect(async () => {
    if (!(account && auth)) return;
    // 사용자 초기화
    await GameInterface.setParticipant(account, gameTitle);
    // 사용자 게임횟수 불러오기
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance);
    // 게임 아이템 및 사용자의 아이템 수량 불러오기
    const recivedItems = await GameInterface.getGameItems();
    setGameItems(recivedItems);
    // 사용자 게임 기록 불러오기
    const recivedBestScore = await GameInterface.getMyBestScore(account, gameTitle);
    setBestScore(recivedBestScore);
    window.addEventListener("keydown", stopScroll);
  }, [account, auth]);

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
  };

  // left-right
  const movePlayer = (dir) => {
    if (didCollide(player, stage, { x: dir, y: 0 })) return;
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = async () => {
    // 게임 기회가 없으면 아무것도 안하기
    if (chance <= 0) {
      alert("잔여 게임 기회가 없습니다. 아이템을 구입하셔서 충전하세요 ^ㅈ^");
      return;
    }
    if (!window.confirm("횟수가 차감됩니다. 게임을 시작하시겠읍니까?")) return;
    setIsPlaying(true); // 게임중으로 상태 변경
    setItemEffect(1); // 아이템 효과 초기화
    await GameInterface.minusGameCount(account, gameTitle); // 횟수 차감
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
    //reset everything
    setStage(createStage());
    setDropTime(1000); // 1 sec
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = async () => {
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
        await GameInterface.sendScore(account, gameTitle, score, itemEffect);
        const recivedBestScore = await GameInterface.getMyBestScore(account, gameTitle);
        setBestScore(recivedBestScore);
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
    // 키 누름을 감지하기 위해 감싸는 스타일 래퍼
    <>
      <GameSelectbar />
      <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
        <StyledTetris>
          <Stage stage={stage} gameOver={gameOver} />
          <aside>
            <div>
              <Display text={`Chance: ${chance}`} />
              <Display text={`Best score: ${bestScore}`} />

              {itemEffect == 1 ? (
                <Display text={`Score: ${score}`} />
              ) : (
                <Display text={`Score: ${score} x${itemEffect}`} />
              )}

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
                  isPlaying={isPlaying}
                  updateChance={updateChance}
                />
              ))}
          </div>
        </StyledTetris>
      </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;