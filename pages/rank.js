import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import GameInterface from "../components/game/GameInterface";
import RankSelectbar from "../components/rank/RankSelectbar";
import CurrentRanking from "../components/rank/CurrentRanking";
import PastRanking from "../components/rank/PastRanking";
import BlankComponent from "../components/BlankComponent";

const Rank = ({ gameList }) => {
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const [currentRankData, setCurrentRankData] = useState([]);
  const [pastRankData, setPastRankData] = useState([]);

  // 선택한 게임 useState에 담기
  const getSelectedGameTitle = async (selectedGame) => {
    setSelectedGameTitle(selectedGame);
  };

  // 이번 주 순위정보 받아오기
  const getCurrentRankData = async () => {
    await axios.post(`/api/ranks/current-ranking`, { gameTitle: selectedGameTitle }).then((res) => {
      setCurrentRankData(res.data);
    });
  };

  // 역대 순위정보 받아오기
  const getPastRankData = async () => {
    await axios.post(`/api/ranks/past-ranking`, { gameTitle: selectedGameTitle }).then((res) => {
      setPastRankData(res.data);
    });
  };

  // 게임이 선택되면 해당 게임 현재순위, 역대순위 받아다 useState에 담아주기
  useEffect(() => {
    if (!selectedGameTitle) return;
    getCurrentRankData();
    getPastRankData();
  }, [selectedGameTitle]);

  return (
    <Flex maxWidth={"1000px"} margin="0 auto" justifyContent={"center"}>
      <RankSelectbar gameList={gameList} getSelectedGameTitle={getSelectedGameTitle} />
      {selectedGameTitle ? (
        <Flex flexDirection={"column"} textAlign="center">
          <Box>{selectedGameTitle} 게임의 순위입니다.</Box>
          <Flex>
            <Box>
              <CurrentRanking currentRankData={currentRankData} />
            </Box>
            <Box minWidth="300px">
              <PastRanking pastRankData={pastRankData} />
            </Box>
          </Flex>
        </Flex>
      ) : (
        <BlankComponent receivedText={"게임을 선택하여 참여자들의 게임별 순위를 확인하세요!"} />
      )}
    </Flex>
  );
};

export default Rank;

export async function getStaticProps() {
  // const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  // const data = res.data;

  const gameList = GameInterface.gameList;

  return {
    props: {
      gameList: gameList,
    },
  };
}
