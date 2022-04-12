import { useState, useEffect } from "react";
import Link from "next/link";
import { Heading, Flex, Button, Image, Text, Box } from "@chakra-ui/react";
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
    <Box mt="5%">
      <Heading align="center">
        <span> Managing Reward System </span>
      </Heading>
      <Flex justify="center" mt="5%">
        <Link href={`/admin/missionReword`}>
          <a style={{ marginRight: 20 }}>
            <Button minWidth={300} h="200" p="10">
              <Flex direction="column">
                <Image margin="0 auto" src={"images/icons/noteIcon.png"} boxSize="100px" />
                <Text mt="5">
                  미션 보상 관리
                  {/* Mission Reword <br /> Managing */}
                </Text>
              </Flex>
            </Button>
          </a>
        </Link>

        <Link href={`/admin/rankingReword`}>
          <a>
            <Button minWidth={300} h="200" p="10">
              <Flex direction="column">
                <Image margin="0 auto" src={"images/icons/trophyIcon.png"} boxSize="100px" />
                <Text mt="5">
                  랭킹 보상 관리
                  {/* Rankging Reword <br /> Managing */}
                </Text>
              </Flex>
            </Button>
          </a>
        </Link>
      </Flex>
      <style jsx>{`
        span {
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }
      `}</style>
    </Box>
  );
};

export default Admin;
