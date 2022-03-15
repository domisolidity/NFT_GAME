import React from "react";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";

import NftCard from "../../components/NftCard";
import Loader from "../../components/Loader";

const NftMint = (props) => {
  const { loading, remainNft, renderNft, minting } = props.toMintJSX;

  return (
    <Box mt={6}>
      {loading ? (
        <Box align="center" w="450" h="550">
          <Loader />
        </Box>
      ) : (
        <Flex justify="space-around" w="70vw">
          <NftCard toMintJSX={props.toMintJSX} />
        </Flex>
      )}
    </Box>
  );
};

export default NftMint;
