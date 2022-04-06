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
      <Text mt="150" fontSize="25" w="10vw">
        <span>NFT 구매</span>       
        </Text>
      </Box>

          <NftMint />
      <style jsx>{`
        span{
          font-size:35px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }
      `}</style>
    </Box>
  );
};

export default Nft;
