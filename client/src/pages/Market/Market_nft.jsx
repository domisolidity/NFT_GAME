import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid, GridItem, Flex, Image, Button } from "@chakra-ui/react";
import { useSelector } from 'react-redux';


const Market_nft = () => {
    const blockchain = useSelector(state => state.blockchain);
    const { nftContract,account } = blockchain;

    
  return (
      <>
        <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5}>
          왼쪽바 <br /> Nft 판매 등록 / 필터 
            <Link to="/market/sell"><Button>판매 등록</Button></Link>
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={4} rowSpan={5} >
            <Grid templateColumns="repeat(4, 1fr)" ml="5"  gap={10} padding="5">

             {/* {nft && nft.map((item,i)=>{
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
              })}  */}

            </Grid>
        </GridItem>
      </>

  )
}

export default Market_nft