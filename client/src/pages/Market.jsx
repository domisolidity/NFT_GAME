import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, GridItem, Flex, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Market_nft from "./Market/Market_nft.jsx";
import Market_item from "./Market/Market_item.jsx";


const Market = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const [isTrue,setIsTrue] = useState(false)

  return (
    <>
      <Box bg="whiteAlpha.100" h="40vh" align="center" lineHeight="40vh">
          배너
      </Box>
      <Box bg="whiteAlpha.100" h="10vh" align="center" lineHeight="10vh" mt="10">
          Market Place
      </Box>
      <Grid
        mt="2%"
        h="85%"
        padding="0 4vw"
        templateRows="repeat(6, 1fr)" //세로
        templateColumns="repeat(5, 1fr)" //가로
        align="center"
        gap={1}
      >
      {!isTrue ? <Market_nft/> : <Market_item/>}
      </Grid>
    </>
  );
};

export default Market;
