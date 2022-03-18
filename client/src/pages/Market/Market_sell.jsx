import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, GridItem, Flex, Image, Button } from "@chakra-ui/react";
import { nfts } from "../../assets/temporaryData/nfts.js";
import { useSelector } from "react-redux";
const Market_sell = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { nftContract, account } = blockchain;
  const [nft, setNft] = useState({
    id: null,
    metadata: null,
  });

  const baseUri = "http://127.0.0.1:8080/ipfs";

  // @ my Nft 찾기
  const getMyNft = async () => {
    await nftContract.methods
      .getMyToken()
      .call({ from: account })
      .then(async (result) => {
        let myNfts = [];
        for (const info of result) {
          if (info.uri == "") continue;
          const response = await axios.get(
            `${baseUri}${info.uri.slice(6)}/${info.id}.json`
          );
          myNfts.push({
            id: info.id,
            name: response.data.name,
            image: `${baseUri}${response.data.image.slice(6)}`,
            description: response.data.description,
          });
        }
        console.log("myNft", myNfts);
        setNft(myNfts);
      });
  };

  useEffect(async () => {
    if (!account) return false;
    console.log("유즈이펙트");
    await getMyNft();
  }, [account]);
  return (
    <Box>
      {console.log(nft)}
      {nft[0] &&
        nft.map((item, i) => {
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
