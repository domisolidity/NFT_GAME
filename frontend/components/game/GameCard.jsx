import React from "react";

const GameCard = ({ game, animationDelay }) => {
  return (
    <>
      <div className="game-card">
        {/* <div className="effect-box"></div> */}
        <img
          className="game-card-img"
          src={`./images/game_${game.gameId}.png`}
        />
        <div className="game-card-box">
          <p className="game-card-text">{game.gameTitle}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes animate {
          0% {
            top: calc(0% - 12%);
            left: calc(0% - 12%);
            background-position: 0% 0%;
          }
          25% {
            top: calc(0% - 12%);
            left: calc(100% + 12%);
          }
          50% {
            top: calc(100% + 12%);
            left: calc(100% + 12%);
            background-position: 100% 100%;
          }
          75% {
            top: calc(100% + 12%);
            left: calc(0% - 12%);
          }
          100% {
            top: calc(0% - 12%);
            left: calc(0% - 12%);
            background-position: 0% 0%;
          }
        }
        @keyframes slideIn {
          0% {
            transform: translateY(-100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes textIn {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(50%);
          }
        }
        .game-card {
          display: flex;
          overflow: hidden;
          min-height: 200px;
          height: 100%;
          max-height: 300px;
          position: relative;
          color: #1e315f;
          font-size: 50px;
          font-weight: bold;
          opacity: 0;
          animation: slideIn 2s cubic-bezier(0, 1, 0, 1) ${animationDelay}s
            forwards;
        }
        /* .game-card:hover .effect-box {
          animation: animate 4s linear infinite;
          content: "";
          position: absolute;
          transform: translate(-50%, -50%);
          width: 30%;
          height: 30%;
          background: linear-gradient(
            -45deg,
            red,
            orange,
            yellow,
            lawngreen,
            blue,
            navy,
            purple
          );
          background-size: 4000% 4000%;
          z-index: 10;
          box-shadow: 0 0 20px purple, 0 0 20px navy, 0 0 20px blue,
            0 0 20px lawngreen, 0 0 20px yellow, 0 0 20px orange, 0 0 20px red,
            0 0 30px purple, 0 0 30px navy, 0 0 30px blue, 0 0 30px lawngreen,
            0 0 30px yellow, 0 0 30px orange, 0 0 30px red;
        } */
        .game-card-box {
          display: flex;
          width: 100%;
          height: 100%;
          transition: 0.5s ease;
          opacity: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background-color: rgba(200, 200, 200, 0.5);
          justify-content: center;
          align-items: center;
        }
        .game-card-box:hover {
          opacity: 1;
          cursor: pointer;
        }
        .game-card-box .game-card-text {
          position: absolute;
          transform: translateY(50%);
          bottom: -10%;
          transition-duration: 0.3s;
          transition-timing-function: linear;
        }
        .game-card-box:hover .game-card-text {
          bottom: 50%;
        }
      `}</style>
    </>
  );
};

export default GameCard;
