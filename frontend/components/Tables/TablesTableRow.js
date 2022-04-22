import { Avatar, Badge, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const { logo, player, score, date, ranking } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td textAlign="center" pl="0px">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {ranking}
        </Text>
      </Td>
      <Td>
        <Avatar src={logo} w="50px" borderRadius="12px" />
      </Td>

      <Td textAlign="center">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {player}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="center">
        <Badge
          // bg={status === "Online" ? "green.400" : bgStatus}
          // color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {score}
        </Badge>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
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
