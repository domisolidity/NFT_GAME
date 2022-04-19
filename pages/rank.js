import React, { useState, useEffect, useRef } from "react";
import { Flex, Box, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button } from "@chakra-ui/react";
import { AddIcon, InfoIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import GameInterface from "../components/game/GameInterface";
import RankSelectbar from "../components/rank/RankSelectbar";
import CurrentRanking from "../components/rank/CurrentRanking";
import PastRanking from "../components/rank/PastRanking";
import BlankComponent from "../components/BlankComponent";

const Rank = ({ gameList }) => {
  const accordian = useRef()
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const [currentRankData, setCurrentRankData] = useState([]);
  const [pastRankData, setPastRankData] = useState([]);
  const [pastWeeks, setPastWeeks] = useState([]);
  const [processedRankData, setProcessedRankData] = useState([]);

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
    getCurrentRankData(); // 현재순위 받아와
    getPastRankData(); // 과거순위 받아와
  }, [selectedGameTitle]);


  // 역대 순위들 주별로 나누는 작업
  useEffect(() => {
    if (pastRankData.length == 0) return;
    const tempRankData = [];
    let week = 1;
    const latestWeek = pastRankData[pastRankData.length - 1].weeks;

    setPastWeeks(latestWeek)



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

      setPastWeeks(tempRankData)
    }
    // 최신 주를 위로 출력하기 위해 배열 뒤집기
    tempRankData.reverse();
    setProcessedRankData(tempRankData);
  }, [pastRankData]);


  const allClosed = () => {


  }


  return (
    <Flex flexDirection={"column"} maxWidth={"1000px"} margin="0 auto" justifyContent={"space-between"}>
      <RankSelectbar gameList={gameList} getSelectedGameTitle={getSelectedGameTitle} />
      {selectedGameTitle ? (
        <Flex flexDirection={"column"} m="20px" p={"20px"} borderRadius="10px" outline="solid 5px" textAlign="center">
          <Box marginRight={"10px"} maxHeight={"70vh"} overflow="auto">
            <CurrentRanking
              title={selectedGameTitle}
              currentRankData={currentRankData}
              captions={[
                "Rnaking",
                "profile",
                "player",
                "score",
                "updated at",
                "",
              ]}
            />
          </Box>
          <Box minWidth="300px" maxHeight={"70vh"} overflow="auto" borderLeft="3px solid" color={"white"}>
            {/* <PastRanking pastRankData={data} /> */}
            {/* {console.log(pastWeeks)}
            <Accordion allowMultiple >
              {pastWeeks.map((data, i) => {
                { console.log(data) }
                <AccordionItem key={i}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {data.length}주차
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    dfsdfsdfsdfsdfsd
             
                  </AccordionPanel>
                </AccordionItem>
              })}
            </Accordion> */}
            <Accordion allowMultiple ref={accordian}>
              {pastWeeks.map((data, i) => {
                return (
                  <AccordionItem key={i} ref={accordian}>
                    {({ isExpanded }) => (
                      <>
                        {console.log(accordian)}
                        {console.log(`${i}번`, isExpanded)}
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              {(data[i].weeks)} 주차
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
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
                )
              })}
            </Accordion>
          </Box>
        </Flex>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.200"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            <BlankComponent receivedText={"게임을 선택하여 참여자들의 게임별 순위를 확인하세요!"} />
          </Heading>
          <Text color={"gray.500"} p={5} fontSize={"1.2rem"}>
            매 주, 각 게임의 1~3위에게는 보상이 주어집니다.
          </Text>
        </Box>
      )
      }
    </Flex >
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