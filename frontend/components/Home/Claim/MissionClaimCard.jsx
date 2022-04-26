import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import { TimLogo } from "../../Icons/Icons";

const MissionClaimCard = (props) => {
  const rewardAmount = props.reward;
  const updateReward = props.updateReward;
  const blockchain = useSelector((state) => state.blockchain);
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  const { account, claim20_Contract } = blockchain;

  const [loading, setLoading] = useState(false);

  const claimReward = async () => {
    try {
      if (rewardAmount == 0) {
        alert("보상 받을 리워드가 없습니다.");
        return;
      }
      setLoading(true);
      await claim20_Contract.methods
        .claim_mission(account, rewardAmount, Date.now())
        .send({ from: account })
        .then(async (res) => {
          console.log(res);
          if (res.status) {
            await axios
              .post(`${NEXT_PUBLIC_SERVER_URL}/users/deleteMission`, {
                account: account,
              })
              .then((res) => {
                console.log(res);
              });
          }
          setLoading(false);
        });
      await updateReward();
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <Flex
        w="20vw"
        border="solid 2px #007983"
        borderRadius={10}
        p={5}
        direction="column"
        align="center"
        mb={4}
      >
        <Flex fontSize={"25px"} mb={"10px"}>
          🎮
          <Text ml={2} color="#87d57e">
            Mission reward
          </Text>
        </Flex>
        <Text>클레임 가능 수량</Text>
        <Flex direction="row" align="center" justify="center">
          <Flex align="center" justify="center">
            <TimLogo fontSize="20px" />
            <Text fontSize="30px" m={"0 16px"} color="#87d57e">
              {rewardAmount}
            </Text>
            <Text fontSize="16px">DGT</Text>
          </Flex>
        </Flex>
        <Button
          bgGradient="linear(to-r, #007983, #87D57E)"
          isLoading={loading ? 1 : null}
          loadingText="claiming.."
          onClick={claimReward}
          borderRadius={"15px"}
        >
          Claim
        </Button>
      </Flex>
    </>
  );
};

export default MissionClaimCard;
