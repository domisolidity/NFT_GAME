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
import BlankComponent from "../../components/BlankComponent";
import MissionCard from "../../components/game/MissionCard";

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
  const [resultBonus, setResultBonus] = useState("");
  const [previousScore, setPreviousScore] = useState("");
  const [extraPoints, setExtraPoints] = useState(0);
  const [extraScore, setExtraScore] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState("");
  const [hasMission, setHasMission] = useState("");
  const [mainNFT, setMainNFT] = useState("");

  // 키보드 스크롤 방지
  function stopScroll(e) {
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
      e.preventDefault();
    }
  }

  // 반전 아이템 사용 시 현재 점수를 useState에 담기
  useEffect(() => {
    if (extraPoints) {
      setExtraScore(score);
      setPreviousScore(score);
    }
  }, [extraPoints]);

  // 반전 아이템 사용 중 추가점수 부여
  useEffect(() => {
    if (extraPoints) {
      setExtraScore(extraScore + (score - previousScore) * parseFloat(extraPoints));
      setPreviousScore(score);
    }
  }, [score]);

  // 페이지 진입 시 대표 NFT 받아오기
  useEffect(async () => {
    if (!(account && auth)) return;
    const mainNFT = await GameInterface.getMyNFT(account);
    setMainNFT(mainNFT);
  }, [account, auth]);

  // 로그인, 대표NFT까지 확인 됐으면
  useEffect(async () => {
    if (!(account && auth && gameTitle && mainNFT)) return;
    await GameInterface.setParticipant(account, gameTitle); // 참여자 초기화
    await GameInterface.initChance(account, gameTitle, mainNFT); // 게임횟수 초기화
    setChance(await GameInterface.getMyChance(account, gameTitle)); // 횟수 불러오기
    setGameItems(await GameInterface.getGameItems()); // 게임아이템 불러오기
    setBestScore(await GameInterface.getMyBestScore(account, gameTitle)); // 최고점수 불러오기
    // 사용자 일일미션 불러오기
    const recivedMission = await GameInterface.getMission(account, gameTitle);
    if (recivedMission) {
      setHasMission(recivedMission);
    } // 테트리스 게임에 방해가 되는 키보드 스크롤 기능 막기
    window.addEventListener("keydown", stopScroll);
  }, [mainNFT]);

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    if (recivedItemEffect.resultBonus) {
      setResultBonus(recivedItemEffect.resultBonus);
    }
    if (recivedItemEffect.extraPoints) {
      setExtraPoints(recivedItemEffect.extraPoints);
    }
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
    const isMinusGameCount = await GameInterface.minusGameCount(account, gameTitle); // 횟수 차감
    if (!isMinusGameCount.data) {
      alert("게임 횟수에 문제 있음");
      return;
    }
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
    setIsPlaying(true); // 게임중으로 상태 변경
    setResultBonus(""); // 아이템 효과 초기화
    setExtraPoints(""); // 아이템 효과 초기화
    setExtraScore(""); // 아이템 효과 초기화
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
        if (extraScore) {
          await GameInterface.sendScore(account, gameTitle, extraScore, resultBonus);
        } else {
          await GameInterface.sendScore(account, gameTitle, score, resultBonus);
        }
        if (hasMission) {
          console.log("미션있음");
          // 이미 일일미션 달성 상태면 아무것도 안하기
          if (hasMission.attainment) return;
          // 제거한 줄이 미션 제시량 이상이면 달성으로 업데이트
          if (rows >= hasMission.DailyMission.targetValue) {
            await GameInterface.updateMission(account, hasMission.mission_id);
            const recivedMission = await GameInterface.getMission(account, gameTitle);
            setHasMission(recivedMission);
          }
        }
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
    if (extraPoints) {
      if (keyCode === 38) {
        setDropTime(1000 / (level + 1) + 100); // 1 sec
      }
    } else if (keyCode === 40) {
      setDropTime(1000 / (level + 1) + 100); // 1 sec
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (extraPoints) {
        switch (keyCode) {
          case 37:
            keyCode = 39;
            break;
          case 39:
            keyCode = 37;
            break;
          case 38:
            keyCode = 40;
            break;
          case 40:
            keyCode = 38;
            break;

          default:
            break;
        }
      }
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
    <>
      {account && auth ? (
        <>
          <GameSelectbar />
          {/* 키 누름을 감지하기 위해 감싸는 스타일 래퍼 */}
          <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
              <Stage stage={stage} gameOver={gameOver} />
              <aside>
                <div>
                  <Display text={`Chance: ${chance}`} />
                  <Display text={`Best score: ${bestScore}`} />

                  {extraScore && resultBonus ? (
                    <Display text={`Score: ${extraScore} x${resultBonus}`} />
                  ) : extraScore ? (
                    <Display text={`Score: ${extraScore}`} />
                  ) : resultBonus ? (
                    <Display text={`Score: ${score} x${resultBonus}`} />
                  ) : (
                    <Display text={`Score: ${score}`} />
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
                      resultBonus={resultBonus}
                      extraPoints={extraPoints}
                      isPlaying={isPlaying}
                      updateChance={updateChance}
                    />
                  ))}
              </div>
              {hasMission && (
                <div className="mission-box">
                  <MissionCard filledValue={rows} hasMission={hasMission} />
                </div>
              )}
            </StyledTetris>
          </StyledTetrisWrapper>
        </>
      ) : (
        <BlankComponent receivedText={"로그인 및 대표 NFT를 설정하셔야 게임에 참여하실 수 있읍니다"} />
      )}
    </>
  );
};

export default Tetris;
