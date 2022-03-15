import React from "react";
import { Box, Image } from "@chakra-ui/react";
import Logoimg from "../../assets/logo/DoremiGames.png";

const Logo = () => {
  return (
    <Box w={200}>
      <Image src={Logoimg} alt="company logo" w={200} />
    </Box>
  );
};

export default Logo;
