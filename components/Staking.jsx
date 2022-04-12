import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";

import ChoiceNft from "./ChoiceNft";
import Modal from "./Modal";

import StakingCard from "./StakingCard";

const Staking = ({ hasMainNft, getCurrentMainNft }) => {
  const { toggle, visible } = useModal();

  return (
    <>
      <Modal toggle={toggle} visible={visible}>
        <ChoiceNft toggle={toggle} getCurrentMainNft={getCurrentMainNft} />
      </Modal>

      <StakingCard toggle={toggle} hasMainNft={hasMainNft} />
    </>
  );
};

export default Staking;
