import { useState } from "react";
import { useSelector } from "react-redux";
import ClaimInfoCard from "./ClaimInfoCard";

import RewardCard from "./rewardCard";

const Claim = () => {
  //const blockchain = useSelector((state) => state.blockchain);
  //console.log("🛠 blockchain", blockchain);
  //const { gameTokenContract } = blockchain;

  //console.log("🛠 gameTokenContract.methods", gameTokenContract);
  //const [isOpen, setIsOpen] = useState(false);

  //const getIsOpen = () => {
  //  setIsOpen(!isOpen);
  //};

  return (
    <>
      <ClaimInfoCard />
      {/* <RewardCard />
      {isOpen && <Modal closeModal={getIsOpen}></Modal>} */}
    </>
  );
};

export default Claim;
