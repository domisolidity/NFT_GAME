import React,{useState} from "react";
import {  Grid,Text,Flex } from "@chakra-ui/react";

import Market_nft from "../../components/Market_nft";
import Market_item from "../../components/Market_item";
import Market_nft_auction from "../../components/market/Market_nft_auction";

const Market = () => {
  const [isTrue, setIsTrue] = useState(false);

  return (
    <>
      <Flex justify="space-around" h="50vh" align="center" filter='auto' brightness='80%' bgImage="url('/images/backgrounds/marketplace-background2.jpg')" bgPosition="bottom" >
        <Text lineHeight="40vh" fontSize="55" fontWeight="bold" bgGradient='linear(to-r, #ffffff, #ffffff)' bgClip='text'> Welcome To MarketPlace ! </Text> 
      </Flex>
      <Grid
        mt="2%"
        h="85%"
        padding="0"
        templateRows="repeat(6, 1fr)" //세로
        templateColumns="repeat(6, 1fr)" //가로
        align="center"
        gap={1}
      >
        <Market_nft_auction/>
        {!isTrue ? <Market_nft /> : <Market_item />}
      </Grid>
    </>
  );
};

export default Market;