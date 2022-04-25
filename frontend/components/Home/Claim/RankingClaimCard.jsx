import { useState } from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const RankingClaimCard = (props) => {
  const claimInfo = props.claimInfo;
  const rewardAmount = props.reward;
  const updateReward = props.updateReward;
  const blockchain = useSelector((state) => state.blockchain);
  const { account, claim20_Contract } = blockchain;

  const [loading, setLoading] = useState(false);

  // 랭킹 클레임
  const claimRank = async () => {
    try {
      console.log("클레임");
      if (claimInfo.length == 0) {
        alert("보상 받을 리워드가 없습니다.");
        return;
      }
      for (let i = 0; i < claimInfo.length; i++) {
        if (
          claimInfo[i].isApproved == false ||
          claimInfo[i].isRewarded == true
        ) {
          alert("이미 보상 받았거나 아직 승인 받지 않았습니다.");
        }
      }

      console.log(claimInfo);
      setLoading(true);
      await claim20_Contract.methods
        .claim_rank(claimInfo, Date.now())
        .send({ from: account })
        .then(async (res) => {
          console.log(res);
          if (res.status) {
            alert("클레임 성공");
            await axios
              .post("/api/users/rewarded", { rank: claimInfo })
              .then((res) => {
                console.log(res);
              });
          }
          setLoading(false);
        });
      await updateReward();
    } catch (error) {
      console.error(error);
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
      >
        <Flex>
          (아이콘 + )<Text color="#87d57e"> Ranking reward</Text>
        </Flex>
        <Flex direction="column">
          <Text>클레임 가능 수량</Text>
          <Box>아이콘{rewardAmount}</Box>
        </Flex>
        <Button
          bgGradient="linear(to-r, #007983, #87D57E)"
          isLoading={loading ? 1 : null}
          loadingText="claiming.."
          onClick={claimRank}
          borderRadius={5}
          mt="5"
        >
          Claim
        </Button>
      </Flex>
    </>
  );
};

export default RankingClaimCard;
