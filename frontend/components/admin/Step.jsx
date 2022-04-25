import {useState, useEffect } from "react";
import axios from "axios"
import { Box, Flex,Text} from "@chakra-ui/react";

const Step = () => {
    
  return (
      <Flex>
        <Box>
            <Box w={50} h={50} borderRadius="50%" bg="blue.600" alignItems="center" textAlign="center">1</Box>
            <Text>랭킹 정보 불러오기</Text>
        </Box>
        <Box w="200" h="10" bg="blue.400"></Box>
        <Box>
            <Box w={50} h={50} borderRadius="50%" bg="blue.600" alignItems="center" textAlign="center">2</Box>
            <Text>계정 선택</Text>
        </Box>
        <Box>
            <Box w={50} h={50} borderRadius="50%" bg="blue.600" alignItems="center" textAlign="center">3</Box>
            <Text>클레임 허용</Text>
        </Box>
        <Box/> 
      </Flex>
  )
}

export default Step