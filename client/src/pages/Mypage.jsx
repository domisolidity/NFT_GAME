import React from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import NetworkCard from "../components/networkCard/NetworkCard";
import InventoryCard from "../components/inventoryCard/InventoryCard";

const Mypage = () => {
  return (
    <Grid 
      height="85vh"
      mt="15vh"
      padding="0 4vw" 
      templateRows='repeat(5, 1fr)' //세로
      templateColumns='repeat(7, 1fr)' //가로
      gap={4}
    >
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5} >
        사이드 바 <br />
        [카테고리 EX] <br />
        메인:(네트워크 연결+지갑+인벤토리) <br />
        nft:(판매중 Nft + 찜한 Nft) <br />
        정보 수정 등등
        </GridItem>
      
      
      <GridItem bg="whiteAlpha.100" colSpan={2}>네트워크연결</GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={2}>지갑</GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={2}>현재등수?</GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={2}>내 인벤토리</GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={2}>찜한 Nft</GridItem>

    </Grid>
    // <Box>
    //   <Box>
    //     <Box fontSize="xl" bg="black" fontWeight="bold">
    //       내 지갑
    //     </Box>
    //     <Flex m={5} bg="orange">
    //       <NetworkCard
    //         title={"Ethereum Network"}
    //         icon={"이더"}
    //         unit={"ETH"}
    //         tokenName={"도레"}
    //         tokenUnit={"미파"}
    //       />
    //       <NetworkCard
    //         title={"Local Network"}
    //         icon={"폴리"}
    //         unit={"BNB"}
    //         tokenName={"솔리"}
    //         tokenUnit={"디티"}
    //       />
    //     </Flex>
    //   </Box>

    //   <Box mb={10} />

    //   <Box>
    //     <Box fontSize="xl" bg="black" fontWeight="bold">
    //       내 인벤토리
    //     </Box>
    //     <Flex m={4} bg="orange">
    //       <Box mr={2} justifyItems="center">
    //         캐릭터
    //       </Box>
    //       <InventoryCard />
    //     </Flex>
    //     <Flex m={4} bg="orange">
    //       <Box mr={2}>아이템</Box>
    //       <InventoryCard />
    //     </Flex>
    //   </Box>
    // </Box>
  );
};

export default Mypage;
