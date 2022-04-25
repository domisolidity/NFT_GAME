import { useState, useEffect } from "react";
import Link from "next/link";
import { Heading, Flex, Button, Image, Text, Box, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";

const Admin = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, gameTokenContract, stakingContract } = blockchain;

  const [inputAmount, setInputAmount] = useState("");
  const [stakingContractAmount, setStakingContractAmount] = useState("");
  const [ownerAmount, setOwnerAmount] = useState("");

  useEffect(async () => {
    if (!gameTokenContract) return;
    await getStakingContractAmount();
    await getOwnerAmount();
  }, [gameTokenContract]);

  const getStakingContractAmount = async () => {
    const receivedAmount = await gameTokenContract.methods.balanceOf(stakingContract._address).call();
    setStakingContractAmount(receivedAmount);
  };
  const getOwnerAmount = async () => {
    const receivedAmount = await gameTokenContract.methods.balanceOf(account).call();
    setOwnerAmount(receivedAmount);
  };

  const tokenCharge = async () => {
    if (parseInt(inputAmount) > parseInt(ownerAmount)) {
      alert("소유하신 토큰이 모자랍니다");
      return;
    }
    const response = await gameTokenContract.methods
      .transfer(stakingContract._address, inputAmount)
      .send({ from: account });
    if (!response.status) return;
    await getStakingContractAmount();
    await getOwnerAmount();
    alert(`컨트랙트에 토큰 ${inputAmount}개를 전달하였습니다`);
  };

  return (
    <Box pt={{ base: "120px", md: "75px" }}>
      <Heading align="center">
        <span> Managing Reward System </span>
      </Heading>
      <Flex justify="center" mt="5%">
        <Link href={`/admin/missionReword`}>
          <a>
            <Button minWidth={300} h="200" p="5" marginRight={"20px"}>
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
            <Button minWidth={300} h="200" p="5" marginRight={"20px"}>
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

        <Button cursor={"default"} minWidth={300} h="200" p="5" marginRight={"20px"}>
          <Flex direction="column">
            <Text>스테이킹 컨트랙트에 토큰 보내기</Text>
            <Text>Owner Amount : {ownerAmount}</Text>
            <Text>Staking Contract Amount : {stakingContractAmount}</Text>
            <Input
              onChange={(e) => {
                setInputAmount(e.target.value);
              }}
            />
            <Button onClick={tokenCharge}>Send</Button>
          </Flex>
        </Button>
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


// getLayout property
Admin.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};


