import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Notice = () => {
  return (
    <>
      <Flex
        w="20vw"
        // border="solid 2px #007983"
        borderRadius={10}
        bg="whiteAlpha.100"
        p={5}
        direction="column"
        align="center"
      >
        <Flex>
          <Text color="#87d57e"> Info</Text>
        </Flex>
        <Text>정보 여기에</Text>
      </Flex>
    </>
  );
};

export default Notice;
