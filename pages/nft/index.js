import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
import Tier from "../../components/nft/Tier";
import NftTransfer from "../../components/NftTransfer";
import NftMint from "../../components/NftMint";
const Nft = () => {
  const [MintOrTransfer, setMintOrTransfer] = useState(false);


  return (
    <Box align="center" pb={20}>
        <Tier />
      <Box w="400px" mb={70}>
      <Text mt="200" fontSize="25" borderRadius="20" w="10vw" bg="#8382821f">
        NFT 구매
      </Text>
      </Box>
      <NftMint />
    </Box>
  );
};

export default Nft;
