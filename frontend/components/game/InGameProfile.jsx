import { Box } from "@chakra-ui/react";
import React from "react";
import MainNftCard from "../MainNftCard";
import MissionCard from "./MissionCard";

const InGameProfile = ({ hasMission, filledValue }) => {
  return (
    <Box mt={"50px"} w={"160px"}>
      <MainNftCard />
      {hasMission && (
        <div className="mission-box">
          <MissionCard filledValue={filledValue} hasMission={hasMission} />
        </div>
      )}
    </Box>
  );
};

export default InGameProfile;
