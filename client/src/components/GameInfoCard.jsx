import React from "react";
import "./gameInfoCard.css";
import img from "../assets/logo.png";

const GameInfoCard = () => {
  return (
    <div className="gameInfoCard">
      <div className="gameInfoCard__name">BLOCK STOCK</div>
      <div className="gameInfoCard__description">
        the game of block.You should stock blocks to top.
      </div>
      <div className="gameInfoCard__preview">
        <img src={img} />
      </div>
      <div className="gameInfoCard__score">
        <table>
          <thead>
            <tr>
              <th>weeks</th>
              <th>address</th>
              <th>character</th>
              <th>score</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 week</td>
              <td>0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc</td>
              <td>red nft</td>
              <td>23</td>
              <td>22.03.18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameInfoCard;
