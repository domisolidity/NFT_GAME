import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const NotFound = ({ items }) => {
  return (
    <Flex justify="center" align="center" direction="column" m={10}>
      <Image width={"100px"} height={"100px"} src={"/empty.png"} />
      <Text mt={6} color="gray.500">
        보유 중 인 {`${items}`} 이(가) 없습니다.
      </Text>
    </Flex>
  );
};

export default NotFound;
