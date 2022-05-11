import { Avatar, Badge, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const { player, score, date, ranking, profile } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td textAlign="center" pl="0px">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {ranking}
        </Text>
      </Td>
      <Td textAlign="center">
        <Avatar src={profile && profile} w="50px" borderRadius="50%" />
      </Td>

      <Td textAlign="center">
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {player}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="center">
        <Badge fontSize="16px" p="3px 10px" borderRadius="8px">
          {score}
        </Badge>
      </Td>
      <Td textAlign="center">
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
