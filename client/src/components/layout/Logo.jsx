import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import img from "../../assets/logo/DoremiGames.png"


const Logo = () => {
  return (
    <Box w={200}>
      <Image src={img} alt="company logo" w={200} />
    </Box>
  );
};

export default Logo;
