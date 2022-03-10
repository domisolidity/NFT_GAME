import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const NetworkCard = (props) => {
  return (
    <Box w={300} borderWidth="2px" borderRadius="lg" bg={"gray"} mr={4}>
      <Box p="6">
        <Box display="flex" alignItems="center">
          <Box color="white" fontWeight="semibold" fontSize="xl">
            {props.title}
          </Box>
        </Box>
        <Flex mt={5}>
          <Flex mr={6} alignItems="center">
            <Box>{props.icon}</Box>
            <Flex ml={4} flexDirection={"column"} alignItems={"center"}>
              <Box>10000</Box>
              <Box>{props.unit}</Box>
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Box>{props.tokenName}</Box>
            <Flex ml={4} flexDirection={"column"} alignItems={"center"}>
              <Box>10000</Box>
              <Box>{props.tokenUnit}</Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default NetworkCard;
