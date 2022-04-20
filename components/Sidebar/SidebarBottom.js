import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";

import IconBox from "../Icons/IconBox";
import React from "react";

export function SidebarBottom(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"

      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="170px"
      w="100%"
    >
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="teal.300" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        대표 NFT
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        설명란?
      </Text>
    </Flex>
  );
}
