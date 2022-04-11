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
    await axios.post("/api/ranks/claimable", { data: account }).then((rank) => {
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
      .then((res) => {
        console.log(res);
        if (res.status) {
          alert("클레임 성공");
        }
      })
      .catch(console.error);

    await axios
      .post("/api/ranks/rewarded", { rank: claimableData })
      .then((res) => {
        console.log(res);
      });
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
        <img
          src="https://www.sandbox.game/img/29_Staking/poly-back.svg"
          className="pool-back-img"
        />
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
            <p className="category-title">
              주간 리워드
              <span className="tooltipPool">
                <img
                  src="https://www.sandbox.game/img/00_General/question-circle.png"
                  className="question-circle"
                />
                <span className="tooltiptext tooltip-weekly">
                  <span className="tooltipTitle">
                    주간 리워드
                    <br />
                  </span>
                  리워드는 매주 지급됩니다. 이 수치는 한 주 동안 배포되는 수량을
                  나타냅니다.
                  <i></i>
                </span>
              </span>
            </p>
            <div className="is-flex-horizontal">
              <img
                src="https://www.sandbox.game/img/30_Profile/sand-small.png"
                className="coin"
              />
              <p className="result">
                {rewardAmount}
                <span className="balanceTooltip">
                  300 K mSAND
                  <i></i>
                </span>
              </p>
            </div>
          </div>
          <div className="lp-earnings approved">
            <p className="category-title">
              수익금(수령가능누적수익금)
              <span className="tooltipPool">
                <img
                  src="https://www.sandbox.game/img/00_General/question-circle.png"
                  className="question-circle"
                />
                <span className="tooltiptext tooltip-earnings">
                  <span className="tooltipTitle">
                    수익금
                    <br />
                  </span>
                  수령이 가능한 누적 수익금입니다.
                  <i></i>
                </span>
              </span>
            </p>
          </div>
        </div>
        <Button onClick={claimRank}>Claim</Button>
      </div>
      <ClaimHistory history={claimHistory} />
      <style jsx>{`
        /* .showPool {
          height: auto;
          opacity: 1;
          margin-bottom: 15px;
          transition-property: all;
          transition-duration: 0.25s;
          transition-timing-function: ease;
          transition-duration: 0.5s;
        } */
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

        .pool-back-img {
          display: block;
          width: 120px;
          height: 120px;
          top: 0;
          right: 0;
          z-index: 1;
          opacity: 1;
          transition-property: all;
          transition-duration: 0.25s;
          transition-timing-function: ease;
          position: absolute;
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
        .tooltipPool {
          display: inline-block;
          position: relative;
          text-align: left;
        }
        .question-circle {
          width: 10px;
          height: 10px;
          margin: 0 5px;
        }
        .tooltiptext {
          display: none;
          padding: 10px 5px 13px 15px;
          background-color: #282e36;
          min-width: 245px;
          transform: translate(-50%, -100%);
          box-sizing: border-box;
          position: absolute;
          top: -5px;
          right: unset;
          bottom: unset;
          z-index: 5;
          border: solid;
          border-color: #555d62;
          border-radius: 8px;
          border-width: 1px;
          font-size: 11px;
          line-height: 11px;
          font-family: "Montserrat Regular";
          color: #787d83;
          text-align: left;
        }
        .tooltip-text-tvl {
          left: 60px !important;
        }
        .tooltipTitle {
          font-size: 12px;
          line-height: 22px;
          font-family: "Montserrat Medium";
          color: #fff;
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
        .balanceTooltip {
          display: none;
          padding: 10px 10px 13px;
          background-color: #282e36;
          transform: translate(-50%, -100%);
          box-sizing: border-box;
          position: absolute;
          top: -7px;
          right: unset;
          bottom: unset;
          left: 50%;
          z-index: 1;
          border: solid;
          border-color: #555d62;
          border-radius: 8px;
          border-width: 1px;
          font-size: 11px;
          line-height: 11px;
          font-family: "Montserrat Regular";
          color: #787d83;
          text-align: center;
          white-space: nowrap;
        }
        .lp-apy {
          align-items: flex-end;
          padding-right: 57px;
        }
        .tooltip-apy {
          left: -60px !important;
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
        /* .approved {
          padding-left: 35px;
        } */
        .lp-earnings {
          padding-left: 0;
          align-items: flex-end;
          padding-right: 57px;
        }
        .cta {
          min-width: 105px;
          max-width: 105px;
          min-height: 25px;
          font-size: 9px;
          line-height: 5px;
          font-family: "Montserrat Bold";
          color: #fff;
          text-align: center;
        }
        button.small,
        button.xsmall {
          border-radius: 20px;
          justify-content: center;
          align-items: center;
          background-color: #0084ff;
          grid-area: footer-second;
        }

        /* .liquidity-pools {
          width: 100%;
          max-width: 1110px;
        }
        .liquidity-categories {
          display: grid;
          height: 30px;
          width: 100%;
          max-width: 1110px;
          grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 0.5fr;
          background-color: #14171d;
          align-items: center;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        .category-title:first-of-type {
          padding-left: 80px;
        }

        .category-title {
          font-size: 12px;
          line-height: 20px;
          font-family: "Montserrat SemiBold";
          color: #a0a4a7;
          text-align: left;
        }
        .tooltipDefi {
          display: inline-block;
          position: relative;
          text-align: left;
        }
        .showPool {
          height: auto;
          opacity: 1;
          margin-bottom: 15px;
          transition-property: all;
          transition-duration: 0.25s;
          transition-timing-function: ease;
          transition-duration: 0.5s;
        }
        .wrapper {
          width: 100%;
          max-width: 1110px;
          height: 69px;
          margin-bottom: 15px;
          background-color: #22262a;
          border: solid;
          border-color: #3b4149;
          border-radius: 5px;
          border-width: 1px;
          transition-property: all;
          transition-duration: 0.25s;
          transition-timing-function: ease;
          position: relative;
        }
        .pool-back-img {
          z-index: -1;
          opacity: 0;
          position: absolute;
          transition-property: all;
          transition-duration: 0.25s;
          transition-timing-function: ease;
        }
        img {
          height: auto;
          max-height: 100%;
          max-width: 100%;
          font-style: italic;
          vertical-align: middle;
        }
        .lp-info {
          width: 100%;
          height: 69px;
          display: grid;
          grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr 0.5fr;
        }
        .lp-name {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .lp-info > div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .lp-name > img {
          width: 40px;
          height: 25px;
          margin-left: 24px;
          margin-right: 15px;
        }

        .network-name-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .network {
          font-size: 11px;
          line-height: 14px;
          font-family: "Montserrat Medium";
          color: #fff;
          text-align: left;
        }
        .title {
          letter-spacing: 0.9px;
          font-size: 18px;
          line-height: 22px;
          font-family: "Montserrat SemiBold";
          color: hsla(0, 0%, 100%, 0.9);
          text-align: left;
        }
        .is-color-polygon {
          color: #8828fd !important;
        }
        .lp-info > div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .category-title {
          display: none;
          z-index: 1;
          font-size: 10px;
          line-height: 20px;
          font-family: "Montserrat SemiBold";
          color: #a0a4a7;
          text-align: left;
        }
        .tooltipPool {
          display: inline-block;
          position: relative;
          text-align: left;
        }
        .question-circle {
          width: 10px;
          height: 10px;
          margin: 0 0 5px 5px;
        }
        .tooltiptext {
          display: none;
          padding: 10px 5px 13px 15px;
          background-color: #282e36;
          min-width: 245px;
          transform: translate(-50%, -100%);
          box-sizing: border-box;
          position: absolute;
          top: -5px;
          right: unset;
          bottom: unset;
          left: 10px;
          z-index: 5;
          border: solid;
          border-color: #555d62;
          border-radius: 8px;
          border-width: 1px;
          font-size: 11px;
          line-height: 11px;
          font-family: "Montserrat Regular";
          color: #787d83;
          text-align: left;
        }
        .tooltipTitle {
          font-size: 12px;
          line-height: 22px;
          font-family: "Montserrat Medium";
          color: #fff;
          text-align: left;
        }
        .result {
          margin-top: 3px;
          z-index: 1;
          position: relative;
          white-space: nowrap;
          font-size: 15px;
          line-height: 19px;
          font-family: "Montserrat SemiBold";
          color: #fff;
          text-align: right;
        }
        .balanceTooltip {
          display: none;
          padding: 10px 10px 13px;
          background-color: #282e36;
          transform: translate(-50%, -100%);
          box-sizing: border-box;
          position: absolute;
          top: -7px;
          right: unset;
          bottom: unset;
          left: 50%;
          z-index: 1;
          border: solid;
          border-color: #555d62;
          border-radius: 8px;
          border-width: 1px;
          font-size: 11px;
          line-height: 11px;
          font-family: "Montserrat Regular";
          color: #787d83;
          text-align: center;
        }
        .lp-info > div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .category-title {
          display: none;
          z-index: 1;
          font-size: 10px;
          line-height: 20px;
          font-family: "Montserrat SemiBold";
          color: #a0a4a7;
          text-align: left;
        }
        .tooltipPool {
          display: inline-block;
          position: relative;
          text-align: left;
        }
        .question-circle {
          width: 10px;
          height: 10px;
          margin: 0 0 5px 5px;
        }
        .tooltiptext {
          display: none;
          padding: 10px 5px 13px 15px;
          background-color: #282e36;
          min-width: 245px;
          transform: translate(-50%, -100%);
          box-sizing: border-box;
          position: absolute;
          top: -5px;
          right: unset;
          bottom: unset;
          left: 10px;
          z-index: 5;
          border: solid;
          border-color: #555d62;
          border-radius: 8px;
          border-width: 1px;
          font-size: 11px;
          line-height: 11px;
          font-family: "Montserrat Regular";
          color: #787d83;
          text-align: left;
        }
        .is-flex-horizontal {
          flex-direction: row;
        }
        .approved {
          padding-left: 35px;
        } */
      `}</style>
    </div>
  );
};

export default ClaimInfoCard;
