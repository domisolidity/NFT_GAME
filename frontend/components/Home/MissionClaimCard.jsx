import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const MissionClaimCard = (props) => {
  const claimInfo = props.claimInfo;
  const rewardAmount = props.reward;
  const updateReward = props.updateReward;
  console.log(rewardAmount);
  const blockchain = useSelector((state) => state.blockchain);
  const { account, claim20_Contract, gameTokenContract } = blockchain;
  console.log(claim20_Contract);

  const test = async () => {
    await gameTokenContract.methods
      .allowance(claim20_Contract._address, account)
      .call()
      .then((res) => {
        console.log(res);
      });
  };
  const test1 = async () => {
    await gameTokenContract.methods
      .balanceOf(claim20_Contract._address)
      .call()
      .then((res) => {
        console.log(res);
      });
  };

  const claimReward = async () => {
    console.log(rewardAmount);
    console.log(Date.now());
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
            })
            .catch(console.error);
        }
      })
      .catch(console.error);

    await updateReward();
  };
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
                <span className="title is-color-polygon">Mission Reward</span>
              </p>
            </div>
          </div>
          <div className="lp-weekly">
            <p className="category-title">미션 보상양</p>
            <div className="is-flex-horizontal">
              <img
                src="https://www.sandbox.game/img/30_Profile/sand-small.png"
                className="coin"
              />
              <p className="result">{rewardAmount}</p>
            </div>
          </div>
        </div>
        <Button onClick={claimReward}>Claim</Button>
        <Button onClick={test}>allowance</Button>
        <Button onClick={test1}>balancOf</Button>
      </div>
      <style jsx>{`
        .showPool {
          width: 20vw;
        }
        .wrapper-purple {
          height: 206px;
          background-color: transparent;
          position: relative;
          border-width: 2px;
          margin: auto auto 51px;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: center;
          border: solid;
          border-color: #7d60a1;
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

export default MissionClaimCard;
