import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const PastRanking = ({ pastRankData }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const [processedRankData, setProcessedRankData] = useState([]);

  // 역대 순위들 주별로 나누는 작업
  useEffect(() => {
    if (pastRankData.length == 0) return;
    const tempRankData = [];
    let week = 1;
    const latestWeek = pastRankData[pastRankData.length - 1].weeks;

    for (let i = 0; i < latestWeek; i++) {
      const tempArray = [];
      // 특정 게임의 역대 순위 개수만큼 반복
      pastRankData.forEach((data) => {
        if (data.weeks == week) {
          tempArray.push(data);
        }
      });
      // 순위별 오름차순 정렬
      tempArray.sort((a, b) => a.ranking - b.ranking);
      tempRankData.push(tempArray);
      week++;
    }
    // 최신 주를 위로 출력하기 위해 배열 뒤집기
    tempRankData.reverse();
    setProcessedRankData(tempRankData);
  }, [pastRankData]);

  // 한 주에 대한 컴포넌트
  const PastWeek = ({ weeks }) => {
    return (
      <Flex
        className="past-ranking-box"
        flexDirection={"column"}
        marginBottom="10px"
        backgroundColor="rgb(118 118 118 / 40%)"
        borderRadius="10px"
        transitionDuration="0.3s"
        _hover={{
          boxShadow:
            "-1px -1px 10px 2px #5ce3f2, 1px 1px 10px 2px #5ce3f2, 1px -1px 10px 2px #5ce3f2, -1px 1px 10px 2px #5ce3f2, inset -3px -3px 10px -4px #5ce3f2, inset 3px 3px 10px -4px #5ce3f2, inset 3px -3px 10px -4px #5ce3f2, inset -3px 3px 10px -4px #5ce3f2",
        }}
      >
        <Text>{weeks[0].weeks}주차</Text>
        {weeks.map((rankData) => (
          <div
            className={
              auth && rankData.user_address == account
                ? "past-ranking-table my-record"
                : "past-ranking-table"
            }
            key={rankData.rankingId}
          >
            <div>{rankData.ranking}위</div>
            <div>{rankData.gameScore}점</div>
            <div>
              {rankData.user_address.substr(0, 5)}...
              {rankData.user_address.substr(
                rankData.user_address.length - 4,
                4
              )}
            </div>
          </div>
        ))}
        <style jsx>{`
          .past-ranking-table {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
          }
          .past-ranking-table div:nth-child(1) {
            min-width: 33px;
            text-align: right;
          }
          .past-ranking-table div:nth-child(2) {
            min-width: 100px;
            text-align: right;
          }
          .past-ranking-table div:nth-child(3) {
            min-width: 140px;
          }
          .my-record {
            color: yellow;
            font-weight: bold;
          }
        `}</style>
      </Flex>
    );
  };

  return (
    <Flex flexDirection={"column"}>
      {processedRankData.length > 0 &&
        processedRankData.map((weeks, index) => {
          return <PastWeek weeks={weeks} key={index} />;
        })}
    </Flex>
  );
};

export default PastRanking;
