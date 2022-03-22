import React from "react";
import { Grid, GridItem, Image, Text } from "@chakra-ui/react";

const InventoryCard = (props) => {
  return (
    <Grid
      padding="0 1vw"
      templateColumns="repeat(2, 1fr)" //가로
      templateRows="repeat(6, 1fr)" //세로
      gap={2}
      width="10vw"
      key={props.key}
    >
      <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={3}>
        <Image src={props.img} />
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        <Text>이름</Text>
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
        {props.name}
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={2}>
        {props.description}
      </GridItem>
    </Grid>
  );
};

export default InventoryCard;
