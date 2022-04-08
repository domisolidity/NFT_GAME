import { useState, useEffect } from "react";
import Link from "next/link";
import { Flex, Button, Image, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MissionReword from "./missionReword";
import RankingReword from "./rankingReword";

const Admin = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, gameTokenContract, claim20_Contract } = blockchain;

  useEffect(() => {
    if (!account) return;
  }, [account]);

  return (
    <Flex justify="center">
      <Link href={`admin/missionReword`}>
        <a style={{ marginRight: 20 }}>
          <Button minWidth={300} h="200" p="10">
            <Flex direction="column">
              <Image src={"images/icons/chartIcon.png"} boxSize="100px" />
              <Text mt="5">
                Mission Reword <br /> Managing
              </Text>
            </Flex>
          </Button>
        </a>
      </Link>

      <Link href={`admin/rankingReword`}>
        <a>
          <Button minWidth={300} h="200" p="10">
            <Flex direction="column">
              <Image src={"images/icons/trophyIcon.png"} boxSize="100px" />
              <Text mt="5">
                Rankging Reword <br /> Managing
              </Text>
            </Flex>
          </Button>
        </a>
      </Link>
    </Flex>
  );
};

export default Admin;
