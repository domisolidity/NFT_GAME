import {
  Box,
  Center,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function NoticeNft({
  grade,
  price,
  times,
  mission,
  duration,
  startNumber,
  endNumber,
}) {
  const Feature = (props) => {
    return (
      <Flex align="center">
        <Flex shrink={0}>
          <Icon
            boxSize={5}
            mt={1}
            mr={2}
            color={useColorModeValue("brand.500", "brand.300")}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </Icon>
        </Flex>
        <Box ml={4}>
          <chakra.span mt={2} color={useColorModeValue("gray.700", "gray.400")}>
            {props.children}
          </chakra.span>
        </Box>
      </Flex>
    );
  };
  return (
    <Box
      rounded={["none", "lg"]}
      shadow={["none", "md"]}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex
        direction="column"
        justify="space-between"
        p="6"
        borderBottomWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        <chakra.p
          mb={1}
          fontSize="lg"
          fontWeight="semibold"
          color={useColorModeValue(`${grade}.700`, `${grade}.400`)}
        >
          {grade}
        </chakra.p>
        <Text
          mb={2}
          fontSize="4xl"
          fontWeight={["bold", "extrabold"]}
          color={useColorModeValue("gray.900", "gray.50")}
          lineHeight="tight"
        >
          {price}
          <chakra.span
            fontSize="2xl"
            fontWeight="medium"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            ETH/개
          </chakra.span>
        </Text>
      </Flex>
      <Stack direction="column" p="6" spacing="3" flexGrow="1">
        <Feature>Daily 게임별 참여 횟수 : {times}</Feature>
        <Feature>Daily 미션 할당량 : {mission}</Feature>
        <Feature>스테이킹 기간별 보상(1일) : {duration}</Feature>
        <Feature>Nft Number Start : {startNumber}</Feature>
        <Feature>Nft Number End : {endNumber}</Feature>
      </Stack>
    </Box>
  );
}
