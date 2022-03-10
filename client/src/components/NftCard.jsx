import React from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NftCard = ({ grade, price }) => {

    const currentLocation = window.location.pathname;
  return (
    <Box
      w={280}
      h={400}
      alignItems="center"
      textAlign="center"
      backgroundColor={"blue.300"}
    >
      {/* Image */}
      <Text textAlign="center">nftcard</Text>
      <Box>
        <Text textAlign="center">grade : {grade}</Text>
        <Text textAlign="center">price : {price}</Text>
      </Box>
    </Box>
  );
};

export default NftCard;