import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Redirect, Route } from "react-router";
import ContextProvider from "../../store/contextProvider";
import { createChests } from "../../utils";
import { CHEST_COUNT, GameStatus } from "../../consts";
import reducer from "../../store/reducer";
import Game from "../../components/Game/Game";
import Menu from "../../components/Menu/Menu";
import "./TreasureHunt.css";
import GameInterface from "../../../GameInterface";
import { useSelector } from "react-redux";

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
  const [itemEffect, setItemEffect] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
  };

  const gameStart = async () => {
    if (!window.confirm("게임기회가 차감됩니다. 게임을 시작하시겠나이까?")) return;
    setItemEffect(undefined);
    setIsPlaying(true);
    setChance(await GameInterface.minusGameCount(account, gameTitle));

    console.log("syasya");
  };

  const getAttemptsMade = (attemptsMade) => {
    setScore(attemptsMade);
  };
  // useEffect(() => {
  //   GameInterface.sendScore(account, gameTitle, score, itemEffect);
  // }, [score]);

  useEffect(async () => {
    if (!(account && auth && gameTitle)) return;
    await GameInterface.setParticipant(account, auth, gameTitle);

    setChance(await GameInterface.getMyChance(account, auth, gameTitle));
    setGameItems(await GameInterface.getGameItems());
  }, [account, auth]);

  return (
    <ContextProvider state={state} dispatch={dispatch}>
      <div className="App">
        <div className="App__container">
          <h1 className="App__heading">최소한의 횟수로 링을 찾으세요</h1>
          {isPlaying ? (
            <Game gameStart={gameStart} getAttemptsMade={getAttemptsMade} />
          ) : (
            <Menu gameStart={gameStart} />
          )}
        </div>
        <div className="score__box">
          점수
          <br />
          {score}
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
