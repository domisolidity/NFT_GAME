import { QuestionIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Img, Link, Text } from "@chakra-ui/react";

import IconBox from "../Icons/IconBox";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import GameInterface from "../game/GameInterface";

export function SidebarBottom(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;

  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract, stakingContract } = blockchain;
  const baseUri = "http://127.0.0.1:8080/ipfs";

  const [mainNFT, setMainNFT] = useState("");
  const [dailyMission, setDailyMission] = useState([]);

  useEffect(async () => {
    if (!(account && auth)) return;
    const stakingData = await stakingContract.methods.getStakingData().call({ from: account });
    const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
    const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
    setMainNFT(response.data);
  }, [account, auth]);

  useEffect(async () => {
    if (!(account && auth && mainNFT)) return;
    // 대표 NFT가 있으면 일일미션정보 받아오기
    let receivedMissions = await GameInterface.getMission(account);
    // 일일미션이 없으면 새로 받기
    if (receivedMissions.length == 0) {
      await GameInterface.missionReg(account, mainNFT);
      receivedMissions = await GameInterface.getMission(account);
    }
    setDailyMission(receivedMissions);
  }, [mainNFT]);

  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      boxSize="border-box"
      p="16px"
      w="100%"
      backgroundColor={`var(--chakra-colors-${mainNFT.grade}-700)`}
    >
      {mainNFT ? (
        <>
          <Img src={`${baseUri}${mainNFT.image.slice(6)}`} />
          <Text fontSize="sm" color="white" fontWeight="bold">
            오늘의 미션
          </Text>
          {dailyMission.length != 0 &&
            dailyMission.map((mission, index) => (
              <Flex gap="5px">
                <Box>{mission.DailyMission.game_title}</Box>
                <Box>{mission.attainment ? "완료!" : "안완료!"}</Box>
              </Flex>
            ))}
        </>
      ) : null}
    </Flex>
  );
}
