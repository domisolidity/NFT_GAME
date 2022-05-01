import React from "react";

import {
  chakra,
  Box,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Icon,
  Text,
  Heading,
} from "@chakra-ui/react";
import { BlockIcon, DiamondIcon, TetrisIcon } from "../Icons/Icons";

const GameInfo = () => {
  const Feature = (props) => {
    return (
      <Box>
        <Icon
          boxSize={10}
          color={useColorModeValue("brand.700")}
          mb={4}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </Icon>
        <chakra.h3
          mb={3}
          fontSize="30px"
          lineHeight="shorter"
          fontWeight="bold"
          color={useColorModeValue("teal.300", "teal.300")}
        >
          {props.title}
        </chakra.h3>
        <chakra.p
          lineHeight="tall"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {props.children}
        </chakra.p>
      </Box>
    );
  };
  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.700")}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
      borderRadius="15px"
      flexDirection="column"
    >
      <Heading mb={5} fontSize={{ base: "5xl", md: "5xl" }}>
        Games
      </Heading>
      <SimpleGrid
        fontSize={"xl"}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={20}
        px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="xl"
        borderRadius="15px"
      >
        <Feature title="블록쌓기" icon={<BlockIcon />}>
          정확한 타이밍에 버튼을 눌러 블록을 최대한 높게 쌓아올리는 게임
        </Feature>

        <Feature title="테트리스" icon={<TetrisIcon />}>
          이리저리 방향을 돌려가며 빈칸이 생기지 않게 블록을 끼워 맞추는 게임
        </Feature>

        <Feature title="보물찾기" icon={<DiamondIcon />}>
          어디에 들었는지 알 수 없는 보물상자들을 최대한 적게 열어 보물을 찾는
          게임
        </Feature>
      </SimpleGrid>
    </Flex>
  );
};

export default GameInfo;
