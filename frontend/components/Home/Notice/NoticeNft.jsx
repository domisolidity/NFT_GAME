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
import Clock from "../../utils/Clock";

export default function NoticeNft() {
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
    <Flex w="full" alignItems="center" justifyContent="center" mt={5}>
      <Box
        py="64px"
        px="10"
        bg={useColorModeValue("gray.100", "gray.700")}
        borderRadius="15px"
      >
        <Box w="full" px={[10, , 4]} mx="auto" textAlign="center">
          <Text mb={2} fontSize="5xl" fontWeight="bold" lineHeight="tight">
            Tier
          </Text>
          <chakra.p
            fontSize={["lg", , "xl"]}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            About benefits
          </chakra.p>
        </Box>
        <Center fontSize={"30px"} mt={5}>
          <Clock />
        </Center>
        <Box maxW="7xl" py="10" mx="auto">
          <SimpleGrid columns={[1, , , 3]} gap={[16, 8]}>
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
                  color={useColorModeValue("red.700", "red.400")}
                >
                  Red
                </chakra.p>
                <Text
                  mb={2}
                  fontSize="4xl"
                  fontWeight={["bold", "extrabold"]}
                  color={useColorModeValue("gray.900", "gray.50")}
                  lineHeight="tight"
                >
                  0.001
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
                <Feature>Daily 게임별 참여 횟수 : 5</Feature>
                <Feature>Daily 미션 할당량 : 1</Feature>
                <Feature>스테이킹 기간별 보상(1일) : 1</Feature>
                <Feature>Nft Number Start : 1</Feature>
                <Feature>Nft Number End : 60</Feature>
              </Stack>
            </Box>

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
                  color={useColorModeValue("green.700", "green.400")}
                >
                  Green
                </chakra.p>
                <Text
                  mb={2}
                  fontSize="4xl"
                  fontWeight={["bold", "extrabold"]}
                  color={useColorModeValue("gray.900", "gray.50")}
                  lineHeight="tight"
                >
                  0.003
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
                <Feature>Daily 게임별 참여 횟수 : 10</Feature>
                <Feature>Daily 미션 할당량 : 2</Feature>
                <Feature>스테이킹 기간별 보상(1일) : 2</Feature>
                <Feature>Nft Number Start : 61</Feature>
                <Feature>Nft Number End : 90</Feature>
              </Stack>
            </Box>

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
                  color={useColorModeValue("purple.700", "purple.400")}
                >
                  Purple
                </chakra.p>
                <Text
                  mb={2}
                  fontSize="4xl"
                  fontWeight={["bold", "extrabold"]}
                  color={useColorModeValue("gray.900", "gray.50")}
                  lineHeight="tight"
                >
                  0.005
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
                <Feature>Daily 게임별 참여 횟수 : 15</Feature>
                <Feature>Daily 미션 할당량 : 3</Feature>
                <Feature>스테이킹 기간별 보상(1일) : 3</Feature>
                <Feature>Nft Number Start : 91</Feature>
                <Feature>Nft Number End : 100</Feature>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
}
