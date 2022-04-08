import React, { useEffect, useReducer, useState } from "react";
import ContextProvider from "../../components/game/FindTheRing/store/contextProvider";
import { createChests } from "../../components/game/FindTheRing/utils";
import { CHEST_COUNT, GameStatus } from "../../components/game/FindTheRing/consts";
import reducer from "../../components/game/FindTheRing/store/reducer";
import Menu from "../../components/game/FindTheRing/components/Menu/Menu";
import { useSelector } from "react-redux";
import GameInterface from "../../components/game/GameInterface";
import GameItem from "../../components/game/GameItem";
import ChestContainer from "../../components/game/FindTheRing/components/ChestContainer/ChestContainer";
import ControlPanel from "../../components/game/FindTheRing/components/ControlPanel/ControlPanel";
import GameSelectbar from "../../components/game/GameSelectbar";
import BlankComponent from "../../components/BlankComponent";
import MissionCard from "../../components/game/MissionCard";

const TreasureHunt = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[2];
  const [state, dispatch] = useReducer(reducer, {
    gameStatus: GameStatus.IN_PROGRESS,
    chests: createChests(CHEST_COUNT),
  });
  const [chance, setChance] = useState(0);
  const [gameItems, setGameItems] = useState("");
  const [resultBonus, setResultBonus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hasMission, setHasMission] = useState("");
  const [mainNFT, setMainNFT] = useState("");

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    if (recivedItemEffect.resultBonus) {
      setResultBonus(recivedItemEffect.resultBonus);
    }
  };

  // 게임 시작
  const gameStart = async () => {
    // 게임 기회가 없으면 아무것도 안하기
    if (chance <= 0) {
      alert("잔여 게임 기회가 없습니다. 아이템을 구입하셔서 충전하세요 ^ㅈ^");
      return;
    }
    if (!window.confirm("게임기회가 차감됩니다. 게임을 시작하시겠나이까?")) return;
    setIsPlaying(true); // 게임중으로 상태 변경
    setResultBonus(""); // 아이템 효과 초기화
    await GameInterface.minusGameCount(account, gameTitle);
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
  };

  // 남은 횟수는 점수가 될 것임
  const getAttemptsMade = (attemptsMade) => {
    setScore(attemptsMade);
  };

  // 게임 끝났을 때 링 찾은 상태면 서버에 점수 전송
  useEffect(async () => {
    if (state.gameStatus == GameStatus.VICTORY) {
      GameInterface.sendScore(account, gameTitle, score, resultBonus).then((res) => console.log(res));
      setBestScore(await GameInterface.getMyBestScore(account, gameTitle));
      if (hasMission) {
        console.log("미션있음");
        // 이미 일일미션 달성 상태면 아무것도 안하기
        if (hasMission.attainment) return;
        // 남은 횟수(열쇠 수)가 미션 제시량 이상이면 달성으로 업데이트
        if (score >= hasMission.DailyMission.targetValue) {
          await GameInterface.updateMission(account, hasMission.mission_id);
          const recivedMission = await GameInterface.getMission(account, gameTitle);
          setHasMission(recivedMission);
        }
      }
    }
  }, [state.gameStatus]);

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
    }
  }, [mainNFT]);

  return (
    <>
      {account && auth && mainNFT ? (
        <>
          <GameSelectbar />
          <ContextProvider state={state} dispatch={dispatch}>
            <div className="App">
              <div className="App__container">
                {isPlaying ? (
                  <>
                    <h1 className="App__heading">상자를 열어요!</h1>
                    <ChestContainer />
                    <ControlPanel
                      gameStart={gameStart}
                      getAttemptsMade={getAttemptsMade}
                      account={account}
                      gameTitle={gameTitle}
                      score={score}
                      resultBonus={resultBonus}
                      hasMission={hasMission}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="App__heading">최소한의 횟수로 링을 찾으세요</h1>
                    <Menu gameStart={gameStart} />
                  </>
                )}
              </div>
              <div>
                {gameItems &&
                  gameItems.map((item) => (
                    <GameItem
                      key={item.itemId}
                      item={item}
                      gameTitle={gameTitle}
                      getItemEffect={getItemEffect}
                      resultBonus={resultBonus}
                      isPlaying={isPlaying}
                      updateChance={updateChance}
                    />
                  ))}
              </div>
              <div className="score__box">
                점수
                <br />
                {resultBonus ? Math.ceil(score * resultBonus) : score}
              </div>
              {resultBonus ? (
                <div className="item_effect__box">
                  이번 판 점수
                  <br />
                  {Math.round((resultBonus - 1) * 100)} % 증가!
                </div>
              ) : null}
              <div className="best_score__box">
                최고기록
                <br />
                {bestScore}
              </div>
              <div className="chance__box">
                남은 기회
                <br />
                {chance}
              </div>
            </div>
          </ContextProvider>
          {hasMission && <MissionCard filledValue={score} hasMission={hasMission} />}
        </>
      ) : (
        <BlankComponent receivedText={"로그인 및 대표 NFT를 설정하셔야 게임에 참여하실 수 있읍니다"} />
      )}
      <style jsx>{`
        .App {
          min-height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          border: solid 3px yellow;
        }
        .App__container {
          margin: 0 auto;
          padding: 0 10px;
          min-width: 525px;
          max-width: 1020px;
        }
        .App__heading {
          text-align: center;
          font-size: 18px;
          margin: 20px 0;
        }
        .chance__box {
          width: 80px;
          position: absolute;
          top: 10px;
          right: 90px;
          text-align: center;
        }
        .score__box {
          width: 70px;
          position: absolute;
          top: 10px;
          left: 120px;
          text-align: center;
        }
        .best_score__box {
          width: 70px;
          position: absolute;
          top: 10px;
          left: 20px;
          text-align: center;
        }
        .item_effect__box {
          width: 100px;
          position: absolute;
          top: 10px;
          left: 220px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default TreasureHunt;
