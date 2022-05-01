import { Box, Text, useInterval } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeeklyEndTime = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract, stakingContract } = blockchain;

  const [weeklyEndTime, setWeeklyEndTime] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [countdown, setCountdown] = useState("");

  const dateConverter = (date) => {
    const temp = new Date(parseInt(date) * 1000);
    const tempMonth = ("0" + (temp.getMonth() + 1).toString()).slice(-2);
    const tempDate = ("0" + temp.getDate().toString()).slice(-2);
    const tempHours = ("0" + temp.getHours().toString()).slice(-2);
    const tempMinutes = ("0" + temp.getMinutes().toString()).slice(-2);
    const resultDate = `${tempMonth}월 ${tempDate}일  ${tempHours}:${tempMinutes}`;
    return resultDate;
  };

  useEffect(async () => {
    if (!stakingContract) return;
    const endTimestamp = parseInt(
      await stakingContract.methods.setEndTime().call()
    );
    setEndTimestamp(endTimestamp);

    const endTime = dateConverter(endTimestamp);

    setWeeklyEndTime(endTime);
  }, [stakingContract]);

  useInterval(async () => {
    const countdownStamp = endTimestamp - Math.floor(Date.now() / 1000);
    const countdownD = Math.floor(countdownStamp / 60 / 60 / 24);
    const countdownH = Math.floor(
      (countdownStamp - countdownD * 24 * 60 * 60) / 60 / 60
    );
    const countdownM = Math.floor(
      (countdownStamp - countdownD * 24 * 60 * 60 - countdownH * 60 * 60) / 60
    );
    const countdownS = Math.floor(
      countdownStamp -
        countdownD * 24 * 60 * 60 -
        countdownH * 60 * 60 -
        countdownM * 60
    );

    setCountdown(
      `${countdownD}일 ${countdownH}시간 ${countdownM}분 ${countdownS}초`
    );
  }, []);

  return (
    <Box>
      <Text>이번 주 집계 마감 : {weeklyEndTime}</Text>
      <Text>집계까지 남은 시간 : {countdown}</Text>
    </Box>
  );
};

export default WeeklyEndTime;
