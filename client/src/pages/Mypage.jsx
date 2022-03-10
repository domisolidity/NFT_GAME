import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import NetworkCard from "../components/networkCard/NetworkCard";
import InventoryCard from "../components/inventoryCard/InventoryCard";

const Mypage = () => {
  return (
    <Box>
      <Box>
        <Box fontSize="xl" bg="black" fontWeight="bold">
          내 지갑
        </Box>
        <Flex m={5} bg="orange">
          <NetworkCard
            title={"Ethereum Network"}
            icon={"이더"}
            unit={"ETH"}
            tokenName={"도레"}
            tokenUnit={"미파"}
          />
          <NetworkCard
            title={"Local Network"}
            icon={"폴리"}
            unit={"BNB"}
            tokenName={"솔리"}
            tokenUnit={"디티"}
          />
        </Flex>
      </Box>

      <Box mb={10} />

      <Box>
        <Box fontSize="xl" bg="black" fontWeight="bold">
          내 인벤토리
        </Box>
        <Flex m={4} bg="orange">
          <Box mr={2} justifyItems="center">
            캐릭터
          </Box>
          <InventoryCard />
        </Flex>
        <Flex m={4} bg="orange">
          <Box mr={2}>아이템</Box>
          <InventoryCard />
        </Flex>
      </Box>
    </Box>
  );
};

export default Mypage;
