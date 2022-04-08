import { useEffect, useState } from "react";

import ChoiceNft from "./ChoiceNft";
import Modal from "./Modal";
import StakingCard from "./StakingCard";

const Staking = ({ hasMainNft, getCurrentMainNft }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <Modal closeModal={getIsOpen}>
          <ChoiceNft
            closeModal={getIsOpen}
            getCurrentMainNft={getCurrentMainNft}
          />
        </Modal>
      )}
      <StakingCard closeModal={getIsOpen} hasMainNft={hasMainNft} />
    </>
  );
};

export default Staking;
