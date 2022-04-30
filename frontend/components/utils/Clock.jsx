import { Box } from "@chakra-ui/react";
import { useState } from "react";

const Clock = () => {
  const [timer, setTimer] = useState("00:00:00");

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  };

  startTimer();

  return (
    <>
      <Box>현재시간 : {timer}</Box>
    </>
  );
};

export default Clock;
