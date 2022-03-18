import React from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";

import Top from "./Main/Top";
import Middle from "./Main/Middle";
import Bottom from "./Main/Bottom";
import Footer from "./Main/Footer";
const Main = () => {
  return (
    <Flex justify="center" wrap="wrap" direction="column" align="center">
      <Top />
      <Middle />
      <Bottom />
      <Footer />
    </Flex>
  );
};

export default Main;
