import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import GameInterface from "../GameInterface";
import GameItem from "../GameItem";

const StackingBlocks = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[0];

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chance, setChance] = useState("");
  const [gameEnded, setGameEnded] = useState(true);
  const [gameItems, setGameItems] = useState("");
  const [itemEffect, setItemEffect] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // 로그인 되어있으면 해당계정의 남은 기회와 점수를 불러온다
  useEffect(async () => {
    await GameInterface.setParticipant(account, gameTitle);
    setChance(await GameInterface.getMyChance(account, gameTitle));
    setBestScore(await GameInterface.getMyBestScore(account, gameTitle));
    setGameItems(await GameInterface.getGameItems());
  }, []);

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 게임이 끝나서 점수가 State에 들어오면 게임기록 서버에 전송
  useEffect(async () => {
    if (document.querySelector("#blockGameContainer.ended")) {
      await GameInterface.sendScore(account, gameTitle, score, itemEffect);
      const recivedBestScore = await GameInterface.getMyBestScore(
        account,
        gameTitle
      );
      setBestScore(recivedBestScore);
    }
  }, [score]);

  // 게임시작
  const playGame = async () => {
    if (
      !(
        document.querySelector("#blockGameContainer.playing") ||
        document.querySelector("#blockGameContainer.resetting")
      )
    )
      return;
    setIsPlaying(true);
    setGameEnded(false); // 게임상태 변경
    await GameInterface.minusGameCount(account, gameTitle); // 횟수 차감
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
    setItemEffect(1); // 이전판 아이템 효과 제거
  };

  // 블록쌓기
  const stackingBlock = () => {
    // 게임이 끝나면
    if (document.querySelector("#blockGameContainer.ended")) {
      setGameEnded(true); // 게임상태 변경
      // 현재 점수 useState에 담기
      setScore(document.querySelector("#score").innerHTML);
    }
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    setItemEffect(recivedItemEffect);
  };

  // 블록쌓기 게임 불러오기
  useEffect(() => {
    // if (!(account && auth)) return;
    setTimeout(() => {
      const scriptSrc = [
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js",
        "./blockGameScript.js",
      ];
      const scripts = [, ,];
      for (let i = 0; i < scriptSrc.length; i++) {
        // <script> 태그를 만들어 배열에 넣고
        scripts[i] = document.createElement("script");
        // 그 태그의 src 정보를 넣어
        scripts[i].src = scriptSrc[i];
        scripts[i].async = true;
        // 문서 body에 추가해준다
        document.body.appendChild(scripts[i]);
      }

      return () => {
        scripts.forEach((script) => {
          // 스크립트 태그 지워주는 녀석
          document.body.removeChild(script);
        });
      };
    }, 500);
  }, [account, auth]);

  return (
    <>
      {account ? (
        <>
          <div id="blockGameContainer">
            <div id="game"></div>
            <div id="score">0</div>
            <div color={"#333344"} id="instructions">
              블록을 높이 쌓으세요
            </div>
            <div className="game-over">
              <button id="restart-button" onClick={playGame}>
                다시시작
              </button>
              <h2>게임 종료</h2>
              <p>대~단합니다</p>
            </div>
            <div className="game-ready">
              <button
                id="start-button"
                onClick={playGame}
                disabled={!gameEnded}
              >
                시작
              </button>
              <div></div>
            </div>
            <div color={"#333344"} className="my-score-box">
              최고점수
              <p fontWeight={"bold"} textAlign={"center"}>
                {bestScore}
              </p>
            </div>
            <div color={"#333344"} className="chance-box">
              남은기회
              <p fontWeight={"bold"} textAlign={"center"}>
                {chance}
              </p>
            </div>
            {itemEffect != 1 ? (
              <div color={"#333344"} className="item-effect-box">
                x {itemEffect}!
              </div>
            ) : null}
            <button
              colorScheme={"blue"}
              width={"100"}
              onClick={stackingBlock}
              disabled={gameEnded}
              className="placeBlock-button"
            >
              멈춰!
            </button>
          </div>
          <Flex justifyContent={"center"}>
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
          </Flex>
        </>
      ) : (
        <div>로그인 해주세요</div>
      )}
      <style jsx>{`
        #game canvas {
          max-width: 100% !important;
          max-height: 100% !important;
        }
        .placeBlock-button {
          position: absolute;
          left: 80%;
          top: 58.5%;
          transform: translate(-50%, -50%);
        }
        .chance-box {
          position: absolute;
          right: 45px;
          top: 30px;
        }
        .my-score-box {
          position: absolute;
          left: 45px;
          top: 30px;
        }
        .item-effect-box {
          position: absolute;
          left: 60%;
          top: 9%;
          font-size: 5vh;
        }
        #blockGameContainer {
          overflow: hidden;
          position: relative;
          height: 70vh;
          margin: 0 auto;
        }
        #blockGameContainer #score {
          position: absolute;
          top: 20px;
          width: 100%;
          text-align: center;
          font-size: 10vh;
          -webkit-transition: -webkit-transform 0.5s ease;
          transition: -webkit-transform 0.5s ease;
          transition: transform 0.5s ease;
          transition: transform 0.5s ease, -webkit-transform 0.5s ease;
          color: #333344;
          -webkit-transform: translatey(-200px) scale(1);
          transform: translatey(-200px) scale(1);
        }
        #blockGameContainer #game {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        #blockGameContainer .game-over {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 85%;
          display: -webkit-box;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
        }
        #blockGameContainer .game-over * {
          -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease,
            -webkit-transform 0.5s ease;
          opacity: 0;
          -webkit-transform: translatey(-50px);
          transform: translatey(-50px);
          color: #333344;
        }
        #blockGameContainer .game-over h2 {
          margin: 0;
          padding: 0;
          font-size: 40px;
        }
        #blockGameContainer .game-ready {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: -webkit-box;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          -webkit-box-align: center;
          align-items: center;
          justify-content: space-around;
        }
        #blockGameContainer .game-ready #start-button,
        #blockGameContainer .game-over #restart-button {
          cursor: default;
          -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease,
            -webkit-transform 0.5s ease;
          opacity: 0;
          -webkit-transform: translatey(-50px);
          transform: translatey(-50px);
          border: 3px solid #333344;
          padding: 10px 20px;
          background-color: transparent;
          color: #333344;
          font-size: 30px;
          z-index: 0;
        }
        #blockGameContainer .game-ready #start-button:hover,
        #blockGameContainer .game-over #restart-button:hover {
          background-color: rgba(69, 69, 90, 0.5);
          transition: 0.3s ease;
        }
        #blockGameContainer #instructions {
          position: absolute;
          width: 100%;
          top: 16vh;
          left: 0;
          text-align: center;
          -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease,
            -webkit-transform 0.5s ease;
          opacity: 0;
        }
        #blockGameContainer #instructions.hide {
          opacity: 0 !important;
        }
        #blockGameContainer.playing #score,
        #blockGameContainer.resetting #score {
          -webkit-transform: translatey(0px) scale(1);
          transform: translatey(0px) scale(1);
        }
        #blockGameContainer.playing #instructions {
          opacity: 1;
        }
        #blockGameContainer.ready .game-ready #start-button,
        #blockGameContainer.ended .game-over #restart-button {
          cursor: pointer;
          opacity: 1;
          -webkit-transform: translatey(0);
          transform: translatey(0);
          z-index: 1;
        }

        #blockGameContainer.ended #score {
          -webkit-transform: translatey(6vh) scale(1.5);
          transform: translatey(6vh) scale(1.5);
        }
        #blockGameContainer.ended .game-over * {
          opacity: 1;
          -webkit-transform: translatey(0);
          transform: translatey(0);
        }
        #blockGameContainer.ended .game-over p {
          -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
        }
      `}</style>
    </>
  );
};

export default StackingBlocks;
