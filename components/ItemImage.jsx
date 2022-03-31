import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Img } from "@chakra-ui/react";

const ItemImage = (props) => {
  return <Img src={`../images/item_${props.itemId}.png`} w={"100%"} h={"100%"} />;
};

export default ItemImage;
