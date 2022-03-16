import React from "react";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import EthereumCoin from "../../../src/assets/EthereumCoin.png";
import GameCoin from "../../../src/assets/GameCoin3.png";

const NetworkCard = (props) => {
  return (
    <Grid
      // padding="0 4vw"
      templateColumns="repeat(4, 1fr)" //가로
      templateRows="repeat(3, 1fr)" //세로
      gap={2}
    >
      <GridItem bg="whiteAlpha.100" colSpan={4} rowSpan={1}>
        이더리움 네트워크
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={2}>
        <Image src={EthereumCoin} />
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        {props.ethBalance}
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={2}>
        <Image src={GameCoin} />
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        토큰 양
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        ETH
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        SOL
      </GridItem>
    </Grid>
  );
};

export default NetworkCard;
