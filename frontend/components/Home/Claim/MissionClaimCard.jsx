import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import axios from "axios";

const MissionClaimCard = (props) => {
  const rewardAmount = props.reward;
  const updateReward = props.updateReward;
  const blockchain = useSelector((state) => state.blockchain);
  const { account, claim20_Contract } = blockchain;

  const [loading, setLoading] = useState(false);

  // const test = async () => {
  //   await gameTokenContract.methods
  //     .allowance(claim20_Contract._address, account)
  //     .call()
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  // const test1 = async () => {
  //   await gameTokenContract.methods
  //     .balanceOf(claim20_Contract._address)
  //     .call()
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  const claimReward = async () => {
    try {
      setLoading(true);
      await claim20_Contract.methods
        .claim_mission(account, rewardAmount, Date.now())
        .send({ from: account })
        .then(async (res) => {
          console.log(res);
          if (res.status) {
            await axios
              .post("/api/users/deleteMission", { account: account })
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
        m="15px auto"
      >
        <Flex>
          (아이콘 + )<Text color="#87d57e"> Mission reward</Text>
        </Flex>
        <Flex direction="column">
          <Text>클레임 가능 수량</Text>
          <Box>아이콘{rewardAmount}</Box>
        </Flex>
        <Button
          bgGradient="linear(to-r, #007983, #87D57E)"
          isLoading={loading ? 1 : null}
          loadingText="claiming.."
          onClick={claimReward}
          borderRadius={5}
          mt="5"
        >
          Claim
        </Button>
      </Flex>
    </>
  );
};

export default MissionClaimCard;
