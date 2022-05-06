import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
  Td,
} from "@chakra-ui/react";

const RewardHistory = ({ dateConverter, stakingEvents }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const captions = [
    "Block No.",
    "Reward",
    "Start Time",
    "End Time",
    "Staked Time",
  ];

  return (
    <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".9rem" pl="0px" color="gray.400">
          {captions.map((caption, idx) => {
            return (
              <Th color="gray.400" key={idx} textAlign="center">
                {caption}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {stakingEvents.map((event, i) => {
          const tempStartTime = event.returnValues.startTime;
          const tempEndTime = event.returnValues.endTime;
          const blockNum = event.blockNumber;
          const reward = event.returnValues.reward;
          const startTime = dateConverter(tempStartTime);
          const endTime = dateConverter(tempEndTime);
          const stakedTime =
            Math.floor(
              ((parseInt(tempEndTime) - parseInt(tempStartTime)) /
                60 /
                60 /
                24) *
                100
            ) /
              100 +
            " Days";
          return (
            <Tr pl="0px" fontSize="md" color={textColor} fontWeight="bold">
              <Td textAlign="center">{blockNum}</Td>
              <Td textAlign="center">{reward}</Td>
              <Td textAlign="center">{startTime}</Td>
              <Td textAlign="center">{endTime}</Td>
              <Td textAlign="center">{stakedTime}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default RewardHistory;
