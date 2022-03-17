import React from 'react'
import { Box, Grid, GridItem, Flex, Image, Button,Heading, Text
 } from "@chakra-ui/react";

const MarketDetail = () => {
  return (
    <Grid 
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}
      align="center"
    
    >
      <GridItem colSpan={2} bg="whiteAlpha.100">
          <Flex direction="column"> 
              <Box>
                아이템이미지
              </Box>
              <Box>
                디스크립션
              </Box>
          </Flex>
      </GridItem>
      <GridItem colSpan={3} bg="whiteAlpha.100">
          <Heading>제목</Heading>
          <Text>게시자 (nft주인)</Text>
          <Box>
              <Text>current price</Text>
              <Heading>1</Heading>
              <Button>Buy now</Button>
          </Box>
      </GridItem>
    </Grid>
  )
}

export default MarketDetail