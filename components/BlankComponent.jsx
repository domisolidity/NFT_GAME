import React from "react";
import { Box, Text } from "@chakra-ui/react";

const BlankComponent = ({ receivedText }) => {
  return (
    <Box textAlign="center" width="100%" height="100%" margin="auto">
      <Text>{receivedText}</Text>
    </Box>
  );
};

export default BlankComponent;
