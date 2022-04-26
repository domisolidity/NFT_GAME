import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ callback, isPlaying }) => (
  <StyledStartButton>
    <button disabled={isPlaying} onClick={callback}>
      Start Game
    </button>
  </StyledStartButton>
);

export default StartButton;
