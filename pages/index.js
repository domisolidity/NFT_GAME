import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import RetroGames from "../assets/retro_games_blur.png";
import NeonCard from "../components/NeonCard";
import GameInfoCard from "../components/GameInfoCard";

const Main = () => {
  let a= true;

  const test =()=>{
      alert("nono");
      return;
  }

  return (
    <div className="Main">
      <div className="main__content">
        <div className="main__top_item">
          <img src="/retro_games_blur.png" />
        </div>
        <div className="main__top_item">
          <div className="main__top_item_head">
            Let's Play, <br />
            earn and collect!
          </div>
          <div className="main__top_item_middle">
            Doremi Game provides various mini-games. <br />
            Weekly ranking winners will be rewarded. <br />
            Don't miss this great opportunity.
          </div>
          <div className="main__top_item_bottom">
            <div className="main__top_item_bottom_line">
              <Link href={!a? "/game" : "/"}>
                <a onClick={!a ? null : test}>
                  <NeonCard type={1} text={"Play"} />
                </a>
              </Link>
            </div>
            <div className="main__top_item_bottom_linesecond">
              <Link href="/rank">
                <NeonCard type={2} text={"Earn"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main__bottom">
        <GameInfoCard />
      </div>
      <style jsx>{`
      .main {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        justify-items: center;
      }

      .main__content {
        grid-row: 1/3;
        grid-column: 1/5;
        display: flex;
        justify-content: center;
      }

      .main__top_item {
        margin: 5rem;
      }
      .main__top_item > img {
        width: 16rem;
      }

      .main__top_item_head {
        font-size: 2.3rem;
        font-weight: bold;
        font-style: italic;
        color: #d4eaff;
        text-shadow: 0 0 0 transparent, 0 0 1rem #d1d2d0,
          0 0 0.1rem rgba(38, 149, 255, 0.5), 0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0,
          0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0;
      }

      .main__top_item_middle {
        margin: 2rem 0 2.6rem 0;
        font-size: 1.2rem;
      }

      .main__top_item_bottom {
        display: flex;
        font-size: 1.5rem;
      }
      .main__top_item_bottom_line {
        border: solid 0.1rem;
        border-radius: 0.5rem;
        color: #d1d2d0;
        box-shadow: 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0, 0 0 0.5rem #d1d2d0,
          inset 0 0 0.5rem #d1d2d0, 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0;
        padding: 0 3rem;
        margin-right: 2.5rem;
      }
      .main__top_item_bottom_linesecond {
        border: solid 0.1rem;
        border-radius: 0.5rem;
        color: #d1d2d0;
        box-shadow: 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0, 0 0 0.5rem #d1d2d0,
          inset 0 0 0.5rem #d1d2d0, 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0;
        padding: 0 3rem;
        margin-right: 2.5rem;
      }

      .main__top_item_bottom_line:hover {
        border: solid 0.1rem;
        border-radius: 0.5rem;
        color: #d1d2d0;
        box-shadow: 0 0 0.1rem #ee05f2, inset 0 0 0.1rem #ee05f2, 0 0 0.5rem #ee05f2,
          inset 0 0 0.5rem #ee05f2, 0 0 0.1rem #ee05f2, inset 0 0 0.1rem #ee05f2;
        padding: 0 3rem;
        margin-right: 2.5rem;
      }

      .main__top_item_bottom_linesecond:hover {
        border: solid 0.1rem;
        border-radius: 0.5rem;
        color: #d1d2d0;
        box-shadow: 0 0 0.1rem #2695ff, inset 0 0 0.1rem #2695ff, 0 0 0.5rem #2695ff,
          inset 0 0 0.5rem #2695ff, 0 0 0.1rem #2695ff, inset 0 0 0.1rem #2695ff;
        padding: 0 3rem;
        margin-right: 2.5rem;
      }
      .main__bottom {
        grid-row: 3/5;
        grid-column: 1/5;
      }

      `}</style>
    </div>
  );
};

export default Main;
