import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import ClaimHistory from "./mypage/ClaimHistory";

const ClaimInfoCard = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, claim20_Contract } = blockchain;

  const [rewardAmount, setRewardAmount] = useState(0);
  const [claimableData, setClaimableData] = useState([]);
  const [claimHistory, setClaimHistory] = useState();

  // 보상 수량 조회
  const getRewardAmount = async () => {
    await axios.post("/api/users/claimable", { data: account }).then((rank) => {
      console.log(rank);
      let rewardData = [];
      let totalRewardAmount = 0;
      for (let i = 0; i < rank.data.length; i++) {
        console.log(rank.data.ranking);
        if (rank.data[i].ranking == 1) {
          totalRewardAmount += 100;
        } else if (rank.data[i].ranking == 2) {
          totalRewardAmount += 50;
        } else if (rank.data[i].ranking == 3) {
          totalRewardAmount += 30;
        }
        rewardData.push(Object.values(rank.data[i]));
      }

      console.log(totalRewardAmount);
      console.log(rank.data);
      setRewardAmount(totalRewardAmount);
      setClaimableData(rewardData);
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

  // 랭킹 클레임
  const claimRank = async () => {
    console.log("클레임");
    console.log(claimableData);

    for (let i = 0; i < claimableData.length; i++) {
      if (
        claimableData[i].isApproved == false ||
        claimableData[i].isRewarded == true
      ) {
        alert("이미 보상 받았거나 아직 승인 받지 않았습니다.");
      }
    }

    console.log(claimableData);
    await claim20_Contract.methods
      .claim_rank(claimableData, Date.now())
      .send({ from: account })
      .then(async (res) => {
        console.log(res);
        if (res.status) {
          alert("클레임 성공");
          await axios
            .post("/api/users/rewarded", { rank: claimableData })
            .then((res) => {
              console.log(res);
            });
        }
      })
      .catch(console.error);
  };

  useEffect(async () => {
    if (!account) return;
    await getRewardAmount();
    await getClaimHistory();
    console.log(account);
    return () => setRewardAmount(0);
  }, [account]);
  // useEffect(async () => {
  //   if (!account || !claimHistory) return;
  //   console.log(claimHistory[0].value.rewardType);
  // }, [account, claimHistory]);

  return (
    <div className="showPool">
      <div className="wrapper-purple">
        <div className="lp-info">
          <div className="lp-name">
            <img
              src="https://www.sandbox.game/img/29_Staking/sand-ether.png"
              className=""
            />
            <div className="network-name-wrapper">
              <p className="network">BSC</p>
              <p className="title">
                <span className="title is-color-polygon">Reward</span>-DTG
              </p>
            </div>
          </div>
          <div className="lp-weekly">
            <p className="category-title">주간 리워드</p>
            <div className="is-flex-horizontal">
              <img
                src="https://www.sandbox.game/img/30_Profile/sand-small.png"
                className="coin"
              />
              <p className="result">{rewardAmount}</p>
            </div>
          </div>
        </div>
        <Button onClick={claimRank}>Claim</Button>
      </div>
      <ClaimHistory history={claimHistory} />
      <style jsx>{`
        .wrapper-purple {
          height: 206px;
          width: 50%;
          background-color: transparent;
          position: relative;
          border-width: 2px;
          margin: auto auto 51px;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: center;
          border: solid;
          border-color: #8828fd;
          border-radius: 5px;
          border-width: 2px;
        }
        .lp-info {
          width: 100%;
          height: 195px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "head head"
            "middle-first middle-second"
            "footer-first footer-second";
          justify-content: center;
          align-items: center;
        }
        .lp-name {
          justify-content: flex-start !important;
          grid-area: head;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .lp-info > div {
          padding-left: 59px;
          /* align-items: flex-start;
          justify-content: center;
          width: 100%; */
        }
        .lp-name > img {
          margin-left: 0;
          width: 40px;
          height: 25px;
          margin-right: 15px;
        }

        .network-name-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .network {
          display: none;
          font-size: 11px;
          line-height: 14px;
          font-family: "Montserrat Medium";
          color: #fff;
          text-align: left;
        }
        .title {
          letter-spacing: 0.9px;
          font-size: 15px;
          line-height: 22px;
          font-family: "Montserrat SemiBold";
          color: hsla(0, 0%, 100%, 0.9);
          text-align: left;
        }
        .is-color-polygon {
          color: #8828fd !important;
        }
        .category-title {
          display: block;
          z-index: 1;
          font-size: 10px;
          line-height: 20px;
          font-family: "Montserrat SemiBold";
          color: #a0a4a7;
          text-align: left;
        }

        .result {
          white-space: nowrap;
          font-size: 12px;
          white-space: nowrap;
          font-size: 12px;
          margin-top: 3px;
          z-index: 1;
          position: relative;
          line-height: 19px;
          font-family: "Montserrat SemiBold";
          color: #fff;
          /* text-align: right; */
        }

        .is-flex-horizontal {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: stretch;
        }
        .coin {
          width: 18px;
          height: 18px;
          margin: 2px 6px 2px 0;
        }
      `}</style>
    </div>
  );
};

export default ClaimInfoCard;
