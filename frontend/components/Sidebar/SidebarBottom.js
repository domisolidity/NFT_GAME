import { Box, Flex, Img, Text } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameInterface from "../game/GameInterface";

export function SidebarBottom(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;

  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, mainNftData } = blockchain;
  const baseUri = "http://127.0.0.1:8080/ipfs";

  const [dailyMission, setDailyMission] = useState([]);

  useEffect(async () => {
    if (!(account && auth && mainNftData)) return;
    // 대표 NFT가 있으면 일일미션정보 받아오기
    let receivedMissions = await GameInterface.getMission(account);
    // 일일미션이 없으면 새로 받기
    if (receivedMissions.length == 0) {
      await GameInterface.missionReg(account, mainNftData.stakingData.tokenId);
      receivedMissions = await GameInterface.getMission(account);
    }
    setDailyMission(receivedMissions);
  }, [mainNftData]);

  return (
    <>
      <Flex flexDirection="column" textAlign={"center"} w="200px">
        {mainNftData && auth ? (
          <>
            <Flex
              borderRadius="15px"
              justifyContent="flex-start"
              alignItems="center"
              boxSize="border-box"
              p="16px"
              backgroundColor={mainNftData && `var(--chakra-colors-${mainNftData.mainNftJson.grade}-700)`}
            >
              <Img borderRadius={"15px"} src={`${baseUri}${mainNftData.mainNftJson.image.slice(6)}`} />
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="sm" color="white" fontWeight="bold">
                오늘의 미션
              </Text>
              {dailyMission.length != 0 &&
                dailyMission.map((mission, index) => (
                  <Flex justifyContent={"center"} gap="20px">
                    <Box w="80px" key={index}>
                      {mission.DailyMission.game_title}
                    </Box>
                    <Box w="100px">{mission.attainment ? "Complete" : "Incomplete"}</Box>
                  </Flex>
                ))}
            </Flex>
          </>
        ) : (
          <>
            Main NFT
            <br />
            space
          </>
        )}
      </Flex>
    </>
  );
}
