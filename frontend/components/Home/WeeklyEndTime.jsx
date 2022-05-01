import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeeklyEndTime = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract, stakingContract } = blockchain;

  const [weeklyEndTime, setWeeklyEndTime] = useState("");

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
    const endTime = dateConverter(endTimestamp);

    setWeeklyEndTime(endTime);
  }, [stakingContract]);

  return <Box>이번 주 집계 마감 : {weeklyEndTime}</Box>;
};

export default WeeklyEndTime;
