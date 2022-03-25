import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import axios from "axios";
import NftTransfer from "../../components/NftTransfer";
import NftMint from "../../components/NftMint";
const Nft = () => {
  const [MintOrTransfer, setMintOrTransfer] = useState(false);

  const onMint = (e) => {
    e.preventDefault();
    setMintOrTransfer(false);
  };

  const onTransfer = (e) => {
    e.preventDefault();
    setMintOrTransfer(true);
  };

  return (
    <Box align="center" pb={20}>
      <Box w="400px" mb={70}>
        <Flex
          justifyContent="space-evenly"
          borderRadius="30"
          bg="whiteAlpha.400"
          mt={10}
        >
          <Button
            onClick={onMint}
            variant="ghost"
            isActive={MintOrTransfer ? 0 : 1}
          >
            NFT 구매
          </Button>
          <Button
            onClick={onTransfer}
            variant="ghost"
            isActive={MintOrTransfer ? 1 : 0}
          >
            NFT 선물
          </Button>
        </Flex>
      </Box>
      {MintOrTransfer ? <NftTransfer /> : <NftMint />}
    </Box>
  );
};

export default Nft;
