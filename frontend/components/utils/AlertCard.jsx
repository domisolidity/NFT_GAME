import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

const AlertCard = (props) => {
  console.log(props);
  return (
    <Alert status="error" isOpen={props.isOpen} ref={props.ref}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>알람</AlertTitle>
        <AlertDescription display="block">{props.msg}</AlertDescription>
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClose={props.onClose()}
      />
    </Alert>
  );
};

export default AlertCard;
