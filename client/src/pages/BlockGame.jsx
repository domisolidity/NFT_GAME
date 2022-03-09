import React, { useState } from "react";
import { useSelector } from "react-redux";

const BlockGame = () => {
  const blockchain = useSelector(state=>state.blockchain);
  const { account } = blockchain;

  const [score, setScore] = useState('');

  const getGameScore = () => {
    setScore(document.querySelector('#score').innerHTML);
    // setTimeout(() => {
    //   if (document.querySelector('#blockGameContainer.ended') != null) {
    //     console.log('인생 끝');
    //   }
    // }, 500);
  };
  const sendScore =async() => {
    await console.log(score);
  }

  return (
    <>
    <div id="blockGameContainer">
      <div id="game"></div>
      <div id="score">0</div>
      <div id="instructions">블록을 멈춰 높이 쌓으세요</div>
      <div className="game-over">
        <div id="restart-button">다시시작</div>
        <h2>게임 종료</h2>
        <p>대~단합니다</p>
      </div>
      <div className="game-ready">
        <div id="start-button">시작</div>
        <div></div>
      </div>
    </div>
    <button onClick={getGameScore} className="placeBlock-button">
      멈춰!
    </button>
    <button onClick={sendScore} className="score-registration-button">
      점수 등록
    </button>
  </>
  );
};

export default BlockGame;
