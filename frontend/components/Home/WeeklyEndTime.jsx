import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeeklyEndTime = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract, stakingContract } = blockchain;

  const [weeklyEndTime, setWeeklyEndTime] = useState("");

  const dateConverter = (date) => {
    const temp = new Date(parseInt(date) * 1000);
    const tempMonth = temp.getMonth() + 1;
    const tempDate = temp.getDate();
    const tempHours = temp.getHours();
    const tempMinutes = temp.getMinutes();
    const tempSeconds = temp.getSeconds();
    const resultDate = `${tempMonth}/${tempDate} ${tempHours}:${tempMinutes}:${tempSeconds}`;
    return resultDate;
  };

  useEffect(async () => {
    const endTimestamp = parseInt(
      await stakingContract.methods.setEndTime().call()
    );
    const endTime = dateConverter(endTimestamp);

    setWeeklyEndTime(endTime);
  }, [weeklyEndTime]);
  return <Box>이번 주 집계 마감 : {weeklyEndTime}</Box>;
};

export default WeeklyEndTime;
