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
          33% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            -webkit-box-reflect: below 0px linear-gradient(#00000001, #00000004);
          }
          55% {
            -webkit-box-reflect: below 0px linear-gradient(#00000002, #00000008);
          }
          60% {
            -webkit-box-reflect: below 0px linear-gradient(#00000003, #00000012);
          }
          65% {
            -webkit-box-reflect: below 0px linear-gradient(#00000004, #00000016);
          }
          70% {
            -webkit-box-reflect: below 0px linear-gradient(#00000005, #00000020);
          }
          75% {
            -webkit-box-reflect: below 0px linear-gradient(#00000006, #00000024);
          }
          80% {
            -webkit-box-reflect: below 0px linear-gradient(#00000007, #00000028);
          }
          85% {
            -webkit-box-reflect: below 0px linear-gradient(#00000008, #00000032);
          }
          90% {
            -webkit-box-reflect: below 0px linear-gradient(#00000009, #00000036);
          }
          95% {
            -webkit-box-reflect: below 0px linear-gradient(#00000010, #00000040);
          }
          100% {
            -webkit-box-reflect: below 0px linear-gradient(#00000011, #00000044);
            opacity: 1;
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
          animation: slideIn 1s linear ${animationDelay}s forwards;
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
      `}</style>
    </>
  );
};

export default GameCard;
