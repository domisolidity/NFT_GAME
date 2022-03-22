import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Redirect, Route } from "react-router";
import ContextProvider from "../../store/contextProvider";
import { createChests } from "../../utils";
import { CHEST_COUNT, GameStatus } from "../../consts";
import reducer from "../../store/reducer";
import Menu from "../../components/Menu/Menu";
import "./TreasureHunt.css";
import GameInterface from "../../../GameInterface";
import { useSelector } from "react-redux";
import GameItem from "../../../GameItem";
import ChestContainer from "../../components/ChestContainer/ChestContainer";
import ControlPanel from "../../components/ControlPanel/ControlPanel";

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
  const [itemEffect, setItemEffect] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 사용 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
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
    setItemEffect(1); // 아이템 효과 초기화
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
      await GameInterface.sendScore(account, gameTitle, score, itemEffect);
    }
    setBestScore(await GameInterface.getMyBestScore(account, gameTitle));
  }, [state.gameStatus]);

  useEffect(async () => {
    if (!(account && auth && gameTitle)) return;
    await GameInterface.setParticipant(account, gameTitle);
    setChance(await GameInterface.getMyChance(account, gameTitle));
    setGameItems(await GameInterface.getGameItems());
    setBestScore(await GameInterface.getMyBestScore(account, gameTitle));
  }, []);

  return (
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
                itemEffect={itemEffect}
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
                itemEffect={itemEffect}
                isPlaying={isPlaying}
                updateChance={updateChance}
              />
            ))}
        </div>
        <div className="score__box">
          점수
          <br />
          {itemEffect == 1 ? score : Math.ceil(score * itemEffect)}
        </div>
        {itemEffect == 1 ? null : (
          <div className="item_effect__box">
            이번 판 점수
            <br />
            {Math.round((itemEffect - 1) * 100)} % 증가!
          </div>
        )}
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
  );
};

export default TreasureHunt;
