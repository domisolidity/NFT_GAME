import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import ClaimHistory from "./ClaimHistory";
import MissionClaimCard from "./MissionClaimCard";
import RankingClaimCard from "./RankingClaimCard";
import Notice from "../Notice/Notice";

const Claim = ({ onUpdate, as, slideIn }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, claim20_Contract } = blockchain;
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  const [rewardAmount_rank, setRewardAmount_rank] = useState(0);
  const [rewardAmount_mission, setRewardAmount_mission] = useState(0);
  const [claimableRank, setClaimableRank] = useState([]);
  const [claimableMission, setClaimableMission] = useState([]);
  const [claimHistory, setClaimHistory] = useState();

  // 보상 수량 조회
  const getRewardAmount = async () => {
    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/users/claimable-rank`, { data: account })
      .then((rank) => {
        console.log(rank);
        let rewardData = [];
        let rankRewardAmount = 0;
        for (let i = 0; i < rank.data.length; i++) {
          console.log(rank.data.ranking);
          if (rank.data[i].ranking == 1) {
            rankRewardAmount += 50;
          } else if (rank.data[i].ranking == 2) {
            rankRewardAmount += 30;
          } else if (rank.data[i].ranking == 3) {
            rankRewardAmount += 10;
          }
          rewardData.push(Object.values(rank.data[i]));
        }
        setRewardAmount_rank(rankRewardAmount);
        setClaimableRank(rewardData);
      });

    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/users/claimable-mission`, {
        data: account,
      })
      .then((mission) => {
        console.log(mission);
        let missionRewardData = [];
        for (let i = 0; i < mission.data.length; i++) {
          missionRewardData.push(Object.values(mission.data[i]));
        }

        setRewardAmount_mission(mission.data.length);
        setClaimableMission(missionRewardData);
        onUpdate();
      });
  };

  // 클레임 히스토리 조회
  const getClaimHistory = async () => {
    await claim20_Contract
      .getPastEvents("ClaimEvent", {
        filter: { account: account },
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((res) => {
        console.log(res);
        let returnValuesArr = [];
        for (const history of res) {
          returnValuesArr.push({
            value: history.returnValues,
            tx: history.transactionHash,
          });
        }
        setClaimHistory(returnValuesArr);
      })
      .catch(console.error);
  };

  useEffect(async () => {
    if (!account) return;
    await getRewardAmount();
    await getClaimHistory();
    console.log(account);
    console.log(claim20_Contract);
    return () => {
      setRewardAmount_mission(0);
      setRewardAmount_rank(0);
    };
  }, [account]);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={5} mt={5}>
        <GridItem colSpan={1}>
          <RankingClaimCard
            claimInfo={claimableRank}
            reward={rewardAmount_rank}
            updateReward={getRewardAmount}
          />
          <MissionClaimCard
            claimInfo={claimableMission}
            reward={rewardAmount_mission}
            updateReward={getRewardAmount}
          />
        </GridItem>
        <GridItem bg="whiteAlpha.200" borderRadius="15px" colSpan={3} mb={3}>
          <ClaimHistory
            history={claimHistory}
            updateHistory={getClaimHistory}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default Claim;
