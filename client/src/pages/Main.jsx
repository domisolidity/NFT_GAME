import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

import RetroGames from "../assets/retro_games_blur.png";
import NeonCard from "../components/NeonCard";

const Main = () => {
  return (
    <div className="main">
      <div className="main__content">
        <div className="main__top_item">
          <img src={RetroGames} />
        </div>
        <div className="main__top_item">
          <div className="main__top_item-head">
            Let's Play, <br />
            earn and collect!
          </div>
          <div className="main__top_item-middle">
            Doremi Game provides various mini-games. <br />
            Weekly ranking winners will be rewarded. <br />
            Don't miss this great opportunity.
          </div>
          <div className="main__top_item-bottom">
            <div className="main__top_item-bottom-line">
              <Link to="/game">
                <NeonCard type={1} text={"Play"} />
              </Link>
            </div>
            <div className="main__top_item-bottom-linesecond">
              <Link to="/rank">
                <NeonCard type={2} text={"Earn"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
