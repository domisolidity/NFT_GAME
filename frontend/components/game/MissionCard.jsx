import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const MissionCard = ({ hasMission, filledValue }) => {
  return (
    <>
      {hasMission && (
        <Flex direction={"column"} textAlign="center">
          <Box>밋숀</Box>
          <Box>{hasMission.DailyMission.missionDetails}</Box>
          <Box>
            {hasMission.attainment
              ? "완료하셨읍니다"
              : `${filledValue}/${hasMission.DailyMission.targetValue}`}
          </Box>
        </Flex>
      )}
    </>
  );
};

export default MissionCard;
