import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import GameInterface from "../../components/game/GameInterface";
import GameItem from "../../components/game/GameItem";
import GameSelectbar from "../../components/game/GameSelectbar";
import BlankComponent from "../../components/BlankComponent";
import InGameProfile from "../../components/game/InGameProfile";

const StackingBlocks = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { gameTitle } = GameInterface.gameList[0];

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chance, setChance] = useState("");
  const [gameEnded, setGameEnded] = useState(true);
  const [gameItems, setGameItems] = useState("");
  const [resultBonus, setResultBonus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMission, setHasMission] = useState("");
  const [mainNFT, setMainNFT] = useState("");

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

  // 잔여 기회 갱신
  const updateChance = (updatedChance) => {
    setChance(updatedChance);
  };

  // 게임이 끝나서 점수가 State에 들어오면 게임기록 서버에 전송
  useEffect(async () => {
    if (document.querySelector("#blockGameContainer.ended")) {
      await GameInterface.sendScore(account, gameTitle, score, resultBonus);
      const recivedBestScore = await GameInterface.getMyBestScore(account, gameTitle);
      setBestScore(recivedBestScore);
      if (hasMission) {
        console.log("미션있음");
        // 이미 일일미션 달성 상태면 아무것도 안하기
        if (hasMission.attainment) return;
        // 쌓은 블록 수가 미션 제시량 이상이면 달성으로 업데이트
        if (score >= hasMission.DailyMission.targetValue) {
          await GameInterface.updateMission(account, hasMission.mission_id);
          const recivedMission = await GameInterface.getMission(account, gameTitle);
          setHasMission(recivedMission);
        }
      }
    }
  }, [gameEnded]);

  // 게임시작
  const playGame = async () => {
    if (
      !(
        document.querySelector("#blockGameContainer.playing") || document.querySelector("#blockGameContainer.resetting")
      )
    )
      return;
    const isMinusGameCount = await GameInterface.minusGameCount(account, gameTitle); // 횟수 차감
    if (!isMinusGameCount.data) {
      alert("게임 횟수에 문제 있음");
      return;
    }
    setIsPlaying(true);
    setGameEnded(false); // 게임상태 변경
    const recivedChance = await GameInterface.getMyChance(account, gameTitle);
    setChance(recivedChance); // 횟수 차감됐으니 횟수 다시 불러오기
    setResultBonus(""); // 이전판 아이템 효과 제거
  };

  // 블록쌓기
  const stackingBlock = () => {
    // 현재 점수 useState에 담기
    setScore(document.querySelector("#score").innerHTML);
    // 게임이 끝나면
    if (document.querySelector("#blockGameContainer.ended")) {
      setGameEnded(true); // 게임상태 변경
    }
  };

  // 아이템 효과 담기
  const getItemEffect = async (recivedItemEffect) => {
    if (recivedItemEffect.resultBonus) {
      setResultBonus(recivedItemEffect.resultBonus);
    }
  };

  // 블록쌓기 게임 불러오기
  useEffect(() => {
    if (!(account && auth && mainNFT)) return;
    // <script> 태그를 만들고
    const script = document.createElement("script");
    // 그 태그의 src 정보를 넣어
    script.src = "../blockGameScript.js";
    // 문서 body에 추가해준다
    document.body.appendChild(script);

    return () => {
      // 다른곳으로 이동할 때 스크립트 없애주는 녀석
      document.body.removeChild(script);
    };
  }, [mainNFT]);

  return (
    <Flex m={"0 10px"}>
      <InGameProfile filledValue={score} hasMission={hasMission} />
      {account && auth && mainNFT ? (
        <Box w={"100%"}>
          <GameSelectbar />
          <div id="blockGameContainer">
            <div id="game"></div>
            <div id="score">0</div>
            <div id="instructions">블록을 높이 쌓으세요</div>
            <div className="game-over">
              <button id="restart-button" onClick={playGame}>
                다시시작
              </button>
              <h2>게임 종료</h2>
              <p>대~단합니다</p>
            </div>
            <div className="game-ready">
              <button id="start-button" onClick={playGame} disabled={!gameEnded}>
                시작
              </button>
              <div></div>
            </div>
            <div className="my-score-box">
              최고점수
              <p>{bestScore}</p>
            </div>
            <div className="chance-box">
              남은기회
              <p>{chance}</p>
            </div>
            {resultBonus ? <div className="item-effect-box">x {resultBonus}!</div> : null}
            <button onClick={stackingBlock} disabled={gameEnded} className="placeBlock-button">
              멈춰 !
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
                  resultBonus={resultBonus}
                  isPlaying={isPlaying}
                  updateChance={updateChance}
                />
              ))}
          </Flex>
        </Box>
      ) : (
        <BlankComponent receivedText={"로그인 및 대표 NFT를 설정하셔야 게임에 참여하실 수 있읍니다"} />
      )}
      <style jsx>{`
        #game canvas {
          max-width: 100% !important;
          max-height: 100% !important;
        }
        .placeBlock-button {
          width: 100px;
          height: 40px;
          border-radius: 10px;
          background-color: #7d0000;
          color: #ebebeb;
          position: absolute;
          left: 80%;
          top: 65%;
          transform: translate(-50%, -50%);
          transition-duration: 0.3s;
        }
        .placeBlock-button:hover {
          background-color: #7d0000;
          opacity: 0.4;
        }
        .placeBlock-button:disabled {
          opacity: 0;
          cursor: default;
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
        .mission-box {
          color: #333344;
          position: absolute;
          left: 30px;
          top: 65%;
          transform: translateY(-50%);
          border-radius: 10px;
          background-color: #ffa5008c;
          padding: 5px;
        }
        #blockGameContainer {
          overflow: hidden;
          position: relative;
          height: 70vh;
          margin: 0 auto;
          text-align: center;
          color: #333344;
          font-weight: bold;
        }
        #blockGameContainer #score {
          position: absolute;
          top: 20px;
          width: 100%;
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
          transition: opacity 0.5s ease, transform 0.5s ease, -webkit-transform 0.5s ease;
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
          transition: opacity 0.5s ease, transform 0.5s ease, -webkit-transform 0.5s ease;
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
          -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transition: opacity 0.5s ease, transform 0.5s ease, -webkit-transform 0.5s ease;
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
    </Flex>
  );
};

export default StackingBlocks;
