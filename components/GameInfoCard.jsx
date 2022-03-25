import React from "react";


const GameInfoCard = () => {
  return (
    <div className="gameInfoCard">
      <div className="gameInfoCard__name">BLOCK STOCK</div>
      <div className="gameInfoCard__description">
        the game of block.You should stock blocks to top.
      </div>
      <div className="gameInfoCard__preview">
        <img src="/logo.png" />
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
      <style jsx>{`
        .gameInfoCard {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        border: solid 0.1rem;
        border-radius: 0.1rem;
        color: #d1d2d0;
        box-shadow: 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0, 0 0 0.5rem #d1d2d0,
          inset 0 0 0.5rem #d1d2d0, 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0;
        padding: 1.2rem;
      }

      .gameInfoCard__name {
        grid-row: 1/2;
        grid-column: 1/2;
        color: #0511f2;
        font-size: 1.5rem;
        justify-self: baseline;
      }

      .gameInfoCard__description {
        grid-row: 2/2;
        grid-column: 1/2;
        justify-self: baseline;
      }
      .gameInfoCard__preview {
        grid-row: 1/3;
        grid-column: 2/3;
      }
      .gameInfoCard__preview > img {
        max-width: 10rem;
      }

      .gameInfoCard__score {
        grid-row: 3/3;
        grid-column: 1/3;
      }

      .gameInfoCard__item {
      }
      th {
          border-bottom: 1px solid;
          color: #d1d2d0;
          padding: 0.5rem;
        }
        th,
        td {
          padding: 0.5rem 1.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default GameInfoCard;
