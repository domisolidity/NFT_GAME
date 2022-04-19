import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function TablesTableRow(props) {
  const { logo, player, score, date, ranking } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td pl="0px" textAlign={"center"}>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {ranking}
        </Text>
      </Td>
      <Td pl="0px" alignItems={"center"}>
        <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
      </Td>
      <Td>
        <Flex direction="column" >
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {player}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            닉네임
          </Text>
        </Flex>
      </Td>
      {/* <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {player}
          </Text>
        </Flex>
      </Td> */}
      <Td >
        <Badge
          bg={score > 20 ? "orange.400" : bgStatus}
          color={score > 20 ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {score}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem" textAlign={"center"}>
          {date}
        </Text>
      </Td>
      <Td>
        {/* <Button p="0px" bg="transparent" variant="no-hover">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            claim
          </Text>
        </Button> */}
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
