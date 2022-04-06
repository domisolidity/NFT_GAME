import React from "react";
import { useSelector } from "react-redux";

const CurrentRanking = ({ currentRankData }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  return (
    <>
      <div className={"ranking-table"}>
        <div>Ranking</div>
        <div>Player</div>
        <div>Score</div>
        <div>Updated at</div>
      </div>
      {currentRankData.length > 0 &&
        currentRankData.map((user, index) => {
          // 날짜 원하는 스타일로 출력하기 위해 정제
          const tempUpdatedAt = new Date(user.updatedAt);
          const tempMonth = tempUpdatedAt.getMonth() + 1;
          const tempDate = tempUpdatedAt.getDate();
          const tempHours = tempUpdatedAt.getHours();
          const tempMinutes = tempUpdatedAt.getMinutes();
          const tempSeconds = tempUpdatedAt.getSeconds();
          const updatedAt = `${tempMonth}/${tempDate} ${tempHours}:${tempMinutes}:${tempSeconds}`;

          return (
            <div
              className={
                auth && user.user_address == account
                  ? "ranking-table my-record"
                  : "ranking-table"
              }
              key={user.inGameUserId}
            >
              <div>{index + 1}</div>
              <div>
                {user.user_address.substr(0, 5)}...
                {user.user_address.substr(user.user_address.length - 4, 4)}
              </div>
              <div>{user.gameScore}</div>
              <div>{`${updatedAt}`}</div>
            </div>
          );
        })}
      <style jsx>{`
        .ranking-table {
          gap: 10px;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
        }
        .ranking-table div:nth-child(1) {
          min-width: 70px;
        }
        .ranking-table div:nth-child(2) {
          min-width: 140px;
        }
        .ranking-table div:nth-child(3) {
          min-width: 70px;
        }
        .ranking-table div:nth-child(4) {
          min-width: 140px;
        }
        .my-record {
          color: yellow;
          text-shadow: 0 0 10px white, 0 0 10px white, 0 0 10px white,
            0 0 10px white, 0 0 10px white;
        }
      `}</style>
    </>
  );
};

export default CurrentRanking;
