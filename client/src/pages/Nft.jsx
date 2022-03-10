import React from "react";
import { Box, Heading, Flex} from "@chakra-ui/react";
import NftCard from "../components/NftCard";
import { useSelector } from "react-redux";

import NftDetailButton from "../components/NftDetailButton";
const Nft = () => {
  const data = useSelector((state) => state.data);
  const { mintingTier } = data;

  return (
    <>
      <Box w={"100%"} h={300} bg={"yellow"}>
        {console.log("Nft.jsx 렌더")}
        NFT 페이지
      </Box>
      <Box w={"100%"}>
        <Heading as='h2' size='2xl' textAlign={"center"}>NFT</Heading>
      </Box>
      <Flex justifyContent={"space-around"}>
        {mintingTier && mintingTier.map((nft, index) => {
          return (
            <Box key={index}>
                <NftCard grade={nft.grade} price={nft.price} />
                <NftDetailButton grade={nft.grade}/>
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default Nft;
