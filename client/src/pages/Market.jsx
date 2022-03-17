import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, GridItem, Flex, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import {nfts} from  "../assets/temporaryData/nfts.js";
import nftImg from "../assets/GameCoin2.png";

const Market = () => {
  console.log(nfts);
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
// ===== 상민 =====
  // // 아이템 목록
  // const [gameItems, setGameItems] = useState([]);
  // // 아이템 목록 가져오기
  // const getGameItems = async () =>
  //   await axios
  //     .get(`/api/items/game-items`)
  //     .then((res) => setGameItems(res.data));

  // useEffect(() => {
  //   getGameItems();
  // }, [account]);

  return (
    // ===== 상민 =====
    // <div>
    //   {console.log("Market.jsx 렌더")}
    //   MarketPage
    //   <Grid
    //     templateRows={`auto`}
    //     templateColumns={`repeat(3, 1fr)`}
    //     gap={5}
    //     justifyItems="center"
    //   >
    //     {gameItems &&
    //       gameItems.map((item) => {
    //         return <ItemCard key={item.itemId} item={item} />;
    //       })}
    //   </Grid>
    // </div>
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
        <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5}>
          왼쪽바 <br /> Nft 판매 등록 / 필터 
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={4} rowSpan={5} >
            <Grid templateColumns="repeat(4, 1fr)" ml="5"  gap={10} padding="5">

              {nfts && nfts.map((i,item)=>{
                return (
                <Box w="15vw" h="40vh" bg="whiteAlpha.500" key={i}>
                    <Box h="75%" bg="navy">이미지</Box>
                    <Flex h="15%" justify="space-between">
                      <Box  bg="green.400">
                        ㅈㅈㅈ{item.name}
                      <Box bg="purple" borderRadius="30">ㅇㅇㅇㅇ{item.grade}</Box> 
                      </Box>
                      <Box >
                        price {item.price}
                      </Box>
                    </Flex>
                    <Box h="10%">
                        <Link to="/market/:wdwd">
                      <Button bg="blue.400">
                          Buy now
                      </Button>
                        </Link>
                    </Box>
                </Box>
                )
              })}

            </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Market;
