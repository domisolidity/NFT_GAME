import React from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

const Market = () => {
  return (
    <>
      <Box bg="whiteAlpha.100" w="100vw" h="45vh" mt="15vh">
          배너
      </Box>
      <Grid h="70vh" mt={20}>
        <GridItem bg="whiteAlpha.100"></GridItem>
        <GridItem bg="whiteAlpha.100"></GridItem>
        <GridItem bg="whiteAlpha.100"></GridItem>
        <GridItem bg="whiteAlpha.100"></GridItem>
      </Grid>
    </>
  );
};

export default Market;
