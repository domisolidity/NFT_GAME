import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import CardHeader from "../../Card/CardHeader";
import TimelineRow from "../../Tables/TimelineRow";

const LoadMap = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const data = [
    {
      // logo: FaBell,
      title: "메타마스크 로그인",
      date: "22 DEC 7:20 PM",
      color: "teal.300",
    },
    {
      // logo: FaHtml5,
      title: "홈페이지내 Connect to a wallet 버튼을 통한 자동 회원가입",
      date: "21 DEC 11:21 PM",
      color: "orange",
    },
    {
      // logo: FaShoppingCart,
      title: "플레이어 자격 획득을 위한 NFT 민팅",
      date: "21 DEC 9:28 PM",
      color: "blue.400",
    },
    {
      // logo: FaCreditCard,
      title: "게임 이용을 위한 대표 NFT 스테이킹",
      date: "20 DEC 3:52 PM",
      color: "orange.300",
    },
    {
      // logo: SiDropbox,
      title: "게임 플레이",
      date: "19 DEC 11:35 PM",
      color: "purple",
    },
    {
      // logo: AdobexdLogo,
      title: "",
      date: "18 DEC 4:41 PM",
    },
  ];
  return (
    <Card maxH="100%">
      <CardHeader p="22px 0px 35px 14px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            Load map
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            <Text fontWeight="bold" as="span" color="teal.300">
              Doremi Games
            </Text>{" "}
            이용을 위한 안내
          </Text>
        </Flex>
      </CardHeader>
      <CardBody ps="20px" pe="0px" mb="31px" position="relative">
        <Flex direction="column">
          {data.map((row, index, arr) => {
            return (
              <TimelineRow
                key={row.title}
                logo={row.logo}
                title={row.title}
                date={row.date}
                color={row.color}
                index={index}
                arrLength={arr.length}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default LoadMap;
