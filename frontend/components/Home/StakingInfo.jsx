import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { IoAnalyticsSharp } from "react-icons/io5";
import { TimLogo } from "../Icons/Icons";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const StakingInfo = () => {
  return (
    <Container maxW={"4xl"} py={12}>
      <SimpleGrid columns={{ base: 1 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Staking Policy
          </Text>
          <Heading fontSize={"5xl"}>Staking policy of Doremi Games</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            도레미게임즈 이용을 위한 스테이킹 & 리워드 정책을 소개합니다.
          </Text>
          <Stack
            spacing={3}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Staking"}
            />
            <Text ml={19}>
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
              게임 플레이를 위한 메인 NFT를 스테이킹 탭에서 진행합니다.
            </Text>
            <Text ml={19}>
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
              메인 NFT 스테이킹 기간은 매 주 월~일(7일 간) 유지됩니다.
            </Text>
            <Text ml={19}>
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
              매 주 토요일 오전 9:00 에 메인 NFT는 초기화 됩니다.
            </Text>
            <Text ml={19}>
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
              주 중에는 메인 NFT 변경이 불가합니다.
            </Text>

            <Feature
              icon={<TimLogo color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Reward"}
            />
            <Text ml={19}>
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
              메인 NFT를 설정하시면 일일 퀘스트가 주어지며, 일일퀘스트 달성시
              리워드로 REMI 토큰을 부여 받습니다.
            </Text>
            <Text ml={19}>
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
              NFT 등급 당 일일 퀘스트 갯수가 차등 부여 됩니다.
            </Text>
            <Text ml={19}>
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
              매 주 , 각 게임의 1~3위 플레이어에게는 REMI 토큰이 차등 지급
              됩니다.
            </Text>
            <Text ml={19}>
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
              주간 집계가 종료되면, 클레임 탭에서 보상 받으 실 수 있습니다.
            </Text>
            <Text ml={19}>
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
              REMI 은 마켓에서 게임을 위한 아이템 구매시 사용 가능합니다.
            </Text>

            {/* <Feature
              icon={<TimLogo color={"purple.500"} w={5} h={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"REMI"}
            /> */}
          </Stack>
        </Stack>
        {/* <Flex>{returnMenu(selectedSubMenu)}</Flex> */}
      </SimpleGrid>
    </Container>
  );
};

export default StakingInfo;
