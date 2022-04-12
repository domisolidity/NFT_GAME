import React,{useState} from "react";
import {  Grid,Text,Flex } from "@chakra-ui/react";

import Market_nft from "../../components/Market_nft";
import Market_item from "../../components/Market_item";

const Market = () => {
  const [isTrue, setIsTrue] = useState(false);

  return (
    <>
      <Flex justify="space-around" bg="whiteAlpha.100" h="40vh" align="center" >
        <Text lineHeight="40vh" fontSize="40" fontWeight="bold" bgGradient='linear(to-r, #ffffff, #666565)' bgClip='text'> Welcome To MarketPlace ! </Text> 
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
        {!isTrue ? <Market_nft /> : <Market_item />}
      </Grid>
    </>
  );
};

export default Market;