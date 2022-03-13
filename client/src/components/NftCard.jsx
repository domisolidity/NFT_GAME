import React from "react";
import { Box, Flex, Text, Image ,Heading} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NftCard = (props) => {
  const {name,image,description } = props.nftInfo;
  const {loading} = props.loading
  return (
    // 있으면 전체내용 없으면 카드만
    <Box w={450} h={550} bg={"whiteAlpha.400"} borderRadius={30} >
      <Flex flexFlow="column" >
          {image ?
          <Box >
            <Image mt={6} w={400} h={400} src={image} borderRadius={30}/>
          </Box>
          : 
          <Heading> 게임 참가 인증 NFT</Heading>
          }
          {image
          ? 
          <Box ml="5">
            <Text>  {name}  </Text>
            <Text>{description} </Text>
          </Box>
          : 
          <Flex justifyContent="space-around" w="200">
            <Text fontSize="2xl" fontWeight="600">  Price  </Text>
            <Text fontSize="xl" fontWeight="700">1 ETH </Text>
          </Flex>
          }
      </Flex>
    </Box>
  );
};

export default NftCard;