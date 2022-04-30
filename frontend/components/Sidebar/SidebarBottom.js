import { Box, Flex, Img, Text, useColorModeValue } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { missionUpdate } from "../../redux/dailyMission/dailyMissionActions";
import GameInterface from "../game/GameInterface";
import { BlockIcon, DiamondIcon, TetrisIcon } from "../Icons/Icons";

export function SidebarBottom(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;

  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, mainNftData } = blockchain;
  const missionState = useSelector((state) => state.mission);
  const { updated } = missionState;

  const dispatch = useDispatch();

  const baseUri = "https://gateway.pinata.cloud/ipfs/";

  const [mainNFT, setMainNFT] = useState("");
  const [dailyMission, setDailyMission] = useState([]);

  useEffect(async () => {
    if (!(account && auth)) return;
    if (!mainNFT) {
      setMainNFT(await GameInterface.getMyNFT(account));
    }
  }, [account, auth, mainNftData, updated, mainNFT]);

  useEffect(async () => {
    if (!(account && auth && mainNftData && mainNFT)) return;

    // if (!mainNFT) return;
    // 대표 NFT가 있으면 일일미션정보 받아오기
    let receivedMissions = await GameInterface.getMission(account);
    // 일일미션이 없으면 새로 받기
    if (receivedMissions.length == 0 && mainNFT) {
      await GameInterface.missionReg(account, mainNFT);
      receivedMissions = await GameInterface.getMission(account);
    }
    setDailyMission(receivedMissions);
    dispatch(missionUpdate());
  }, [account, auth, mainNftData, updated, mainNFT]);

  const gameIcon = (title) => {
    switch (title) {
      case "블록쌓기":
        return <BlockIcon />;
      case "테트리스":
        return <TetrisIcon />;
      case "보물찾기":
        return <DiamondIcon />;
      default:
        break;
    }
  };

  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <Flex opacity="0" flexDirection="column" textAlign={"center"} w="100%" as={props.as} animation={props.slideIn}>
        {mainNftData && auth && mainNFT ? (
          <>
            <Flex
              mb={3}
              borderRadius="50%"
              justifyContent="flex-start"
              alignItems="center"
              boxSize="border-box"
              // p="1.5px"
              backgroundColor={mainNftData && `var(--chakra-colors-${mainNftData.mainNftJson.grade}-100)`}
            >
              <Img borderRadius="50%" src={`${baseUri}${mainNftData.mainNftJson.image.slice(6)}`} />
            </Flex>
            <Flex flexDirection="column" fontSize="md">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Daily Quest
              </Text>
              {dailyMission.length != 0 &&
                dailyMission.map((mission, index) => (
                  <Flex
                    justifyContent={"center"}
                    alignItems="center"
                    bgColor="whiteAlpha.100"
                    m={1}
                    borderRadius="15px"
                  >
                    <Box
                      key={index}
                      color={`var(--chakra-colors-${mainNftData.mainNftJson.grade}-300)`}
                      fontSize="xl"
                      fontWeight="bold"
                      mr={2}
                    >
                      {gameIcon(mission.DailyMission.game_title)}
                    </Box>
                    <Box color={textColor} fontSize="12px">
                      {mission.attainment ? "Complete" : "Incomplete"}
                    </Box>
                  </Flex>
                ))}
            </Flex>
          </>
        ) : (
          <>
            <Flex mb={3} borderRadius="50%" justifyContent="flex-start" alignItems="center" boxSize="border-box">
              <Img borderRadius="50%" src={`/circle.png`} />
            </Flex>
            <Flex flexDirection="column" fontSize="md">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                Main NFT
              </Text>

              <Flex justifyContent={"center"} alignItems="center" bgColor="whiteAlpha.100" m={1} borderRadius="15px">
                <Box color={`whiteAlpha.300`} fontSize="xl" fontWeight="bold" mr={2}>
                  아이콘
                </Box>
                <Box color={textColor} fontSize="12px">
                  선택하러가기
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
