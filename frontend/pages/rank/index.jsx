import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import GameInterface from "../../components/game/GameInterface";
import RankSelectbar from "../../components/rank/RankSelectbar";
import CurrentRanking from "../../components/rank/CurrentRanking";
import PastRanking from "../../components/rank/PastRanking";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import SubMenuList from "../../components/Menu/SubMenuList";

const Rank = ({ gameList }) => {
  const [selectedGameTitle, setSelectedGameTitle] = useState("블록쌓기");
  const [currentRankData, setCurrentRankData] = useState([]);
  const [pastRankData, setPastRankData] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState("블록쌓기");

  // 선택한 게임 useState에 담기
  const getSelectedGameTitle = async (selectedGame) => {
    setSelectedGameTitle(selectedGame);
  };

  // 이번 주 순위정보 받아오기
  const getCurrentRankData = async () => {
    await axios
      .post(`/api/ranks/current-ranking`, { gameTitle: selectedSubMenu })
      .then((res) => {
        setCurrentRankData(res.data);
      });
  };

  // 역대 순위정보 받아오기
  const getPastRankData = async () => {
    await axios
      .post(`/api/ranks/past-ranking`, { gameTitle: selectedSubMenu })
      .then((res) => {
        setPastRankData(res.data);
      });
  };

  // 게임이 선택되면 해당 게임 현재순위, 역대순위 받아다 useState에 담아주기
  useEffect(() => {
    if (!selectedSubMenu) return;
    getCurrentRankData(); // 현재순위 받아와
    getPastRankData(); // 과거순위 받아와
  }, [selectedSubMenu]);

  const getSelectedSubMenu = (e) => {
    setSelectedSubMenu(e.target.value);
  };

  const menuList = ["블록쌓기", "테트리스", "보물찾기"];

  return (
    <>
      <Flex
        flexDirection={"column"}
        maxWidth={"1000px"}
        margin="0 auto"
        alignItems="center"
        justifyContent={"center"}
        pt={{ base: "120px", md: "75px" }}
      >
        <SubMenuList
          subMenu={menuList}
          getSelectedSubMenu={getSelectedSubMenu}
        />
        {/* 
        <RankSelectbar
          gameList={gameList}
          getSelectedGameTitle={getSelectedGameTitle}
        /> */}
        <CurrentRanking
          title={selectedGameTitle}
          currentRankData={currentRankData}
          captions={["Rnaking", "profile", "player", "score", "updated at", ""]}
        />
        <PastRanking pastRankData={pastRankData} />
      </Flex>
    </>
  );
};

export default Rank;

export async function getStaticProps() {
  // 게임리스트 받아오기
  const gameList = GameInterface.gameList;
  return {
    props: {
      gameList: gameList,
    },
  };
}

// getLayout property
Rank.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
