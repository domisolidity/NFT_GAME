import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Box>
      <Image src={logo} alt="company logo" boxSize="6rem" />
    </Box>
  );
};

export default Logo;
