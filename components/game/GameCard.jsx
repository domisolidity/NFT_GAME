import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";

const GameCard = ({ game }) => {
  return (
    <>
      <div className="game-card">
        <img
          className="game-card-img"
          src={`./images/game_${game.gameId}.png`}
        />
        <div className="game-card-box">
          <p className="game-card-text">{game.gameTitle}</p>
        </div>
        {/* <div className="loader">
          <span></span>
        </div> */}
      </div>

      <style jsx>{`
        .game-card {
          display: flex;
          overflow: hidden;
          border-radius: 15px;
          width: 100%;
          height: 100%;
          position: relative;
          color: #1e315f;
          font-size: 50px;
          font-weight: bold;
        }
        .game-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;

          width: 50%;
          height: 100%;
          background: linear-gradient(
            to top,
            transparent,
            rgba(0, 255, 249, 0.4)
          );
          background-size: 100px 180px;
          background-repeat: no-repeat;
        }
        .game-card::after {
          content: "";
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #00fff9;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 30px #00fff9,
            0 0 40px #00fff9, 0 0 50px #00fff9, 0 0 60px #00fff9,
            0 0 70px #00fff9, 0 0 80px #00fff9, 0 0 90px #00fff9,
            0 0 100px #00fff9;
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
          -webkit-box-reflect: below 10px linear-gradient(#0001, #0004);
        }

        .loader::after {
          content: "";
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #00fff9;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 30px #00fff9,
            0 0 40px #00fff9, 0 0 50px #00fff9, 0 0 60px #00fff9,
            0 0 70px #00fff9, 0 0 80px #00fff9, 0 0 90px #00fff9,
            0 0 100px #00fff9;
        }
        .loader span {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          /* background: #102626; */
          background-image: url("./images/game_3.png");
        }
      `}</style>
    </>
  );
};

export default GameCard;
