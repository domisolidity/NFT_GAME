import React from "react";

const GameCard = ({ game }) => {
  return (
    <>
      <div className="game-card">
        <div className="effect-box"></div>
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
        .game-card {
          display: flex;
          overflow: hidden;
          width: 100%;
          height: 100%;
          position: relative;
          color: #1e315f;
          font-size: 50px;
          font-weight: bold;
          -webkit-box-reflect: below 0px linear-gradient(#0001, #0004);
        }
        .game-card:hover .effect-box {
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
        }
        .game-card-img {
          width: 100%;
        }
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
      `}</style>
    </>
  );
};

export default GameCard;
