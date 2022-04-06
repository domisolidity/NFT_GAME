import { useState } from "react";
import ChoiceNft from "./ChoiceNft";
import Modal from "./Modal";
import StakingCard from "./StakingCard";

const Staking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const getIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <Modal closeModal={getIsOpen}>
          <ChoiceNft />
        </Modal>
      )}
      <StakingCard closeModal={getIsOpen} />
    </>
  );
};

export default Staking;
