import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, GridItem, Flex, Image, Button } from "@chakra-ui/react";
import { nfts } from "../../assets/temporaryData/nfts.js";
import { useSelector } from "react-redux";
const Market_sell = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { nftContract, account } = blockchain;
 



  useEffect(async () => {
    if (!account) return false;
  }, [account]);
  return (
    <Box>
      {nfts&&
        nfts.map((item, i) => {
          return (
            <Box w="15vw" h="40vh" bg="whiteAlpha.500" key={i}>
              <Box h="75%" bg="navy">
                이미지
              </Box>
              <Flex h="15%" justify="space-between">
                <Box bg="green.400">
                  ㅈㅈㅈ{item.name}
                  <Box bg="purple" borderRadius="30">
                    ㅇㅇㅇㅇ
                  </Box>
                </Box>
                <Box>price {item.id}</Box>
              </Flex>
              <Box h="10%">
                <Link to="/market/:id">
                  <Button bg="blue.400">Buy now</Button>
                </Link>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default Market_sell;
