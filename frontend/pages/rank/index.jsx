import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import GameInterface from "../../components/game/GameInterface";
import RankSelectbar from "../../components/rank/RankSelectbar";
import CurrentRanking from "../../components/rank/CurrentRanking";
import PastRanking from "../../components/rank/PastRanking";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import SubMenuList from "../../components/Menu/SubMenuList";

const Rank = ({ gameList }) => {
  const accordian = useRef();
  const [selectedGameTitle, setSelectedGameTitle] = useState("블록쌓기");
  const [currentRankData, setCurrentRankData] = useState([]);
  const [pastRankData, setPastRankData] = useState([]);
  const [pastWeeks, setPastWeeks] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState("블록쌓기");
  const [processedRankData, setProcessedRankData] = useState([]);
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  // 선택한 게임 useState에 담기
  const getSelectedGameTitle = async (selectedGame) => {
    setSelectedGameTitle(selectedGame);
  };

  // 이번 주 순위정보 받아오기
  const getCurrentRankData = async () => {
    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/ranks/current-ranking`, {
        gameTitle: selectedSubMenu,
      })
      .then((res) => {
        setCurrentRankData(res.data);
      });
  };

  // 역대 순위정보 받아오기
  const getPastRankData = async () => {
    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/ranks/past-ranking`, {
        gameTitle: selectedSubMenu,
      })
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

  // 역대 순위들 주별로 나누는 작업
  useEffect(() => {
    if (pastRankData.length == 0) return;
    const tempRankData = [];
    let week = 1;
    const latestWeek = pastRankData[pastRankData.length - 1].weeks;

    setPastWeeks(latestWeek);

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

      setPastWeeks(tempRankData);
    }
    // 최신 주를 위로 출력하기 위해 배열 뒤집기
    tempRankData.reverse();
    setProcessedRankData(tempRankData);
  }, [pastRankData]);

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
        <Text fontSize={"30px"} mt={"40px"}>
          This Week's winners 🏆
        </Text>
        <CurrentRanking
          title={selectedSubMenu}
          currentRankData={currentRankData}
          captions={["Rnaking", "profile", "player", "score", "updated at"]}
        />

        <Box
          w={"100%"}
          // minWidth="300px"
          // maxHeight={"70vh"}
          // overflow="auto"
          // borderLeft="3px solid"
          // color={"white"}
        >
          <Accordion allowMultiple ref={accordian}>
            {pastWeeks.map((data, i) => {
              return (
                <AccordionItem key={i} ref={accordian}>
                  {({ isExpanded }) => (
                    <>
                      {/* {console.log(accordian)}
                      {console.log(`${i}번`, isExpanded)} */}

                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {data[i].weeks} 주차 🏆
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        <CurrentRanking
                          title={`${data[i].game_title} ${data[i].weeks} 주`}
                          currentRankData={data}
                          captions={[
                            "Rnaking",
                            "profile",
                            "player",
                            "score",
                            `${data[i].updatedAt ? "updated at" : ""}`,
                            "",
                          ]}
                        />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        </Box>
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
