import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import ItemImage from "./ItemImage";

const InventoryCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  // 내 소유 아이템 개수
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () =>
    await axios
      .post(`/api/items/game-items/my-items-quantity`, {
        account: account,
        itemName: props.itemName,
      })
      .then((res) => {
        setMyItemQuantity(res.data.count);
      });

  useEffect(() => {
    getMyItemQuantity();
  }, [account]);

  return (
    <>
      {myItemQuantity != 0 ? (
        <Grid
          padding="0 0.5vw"
          templateColumns="repeat(3, 1fr)" //가로
          templateRows="repeat(3, 1fr)" //세로
          gap={1}
          width="20rem"
          alignItems={"center"}
          justifyItems={"center"}
          justify-content={"center"}
        >
          <GridItem bg="whiteAlpha.100" colSpan={3} rowSpan={3}>
            <Box border={"solid 1px"} width="10rem" height="10rem">
              <ItemImage itemId={props.img} />
            </Box>
          </GridItem>
          <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={1}>
            이름
          </GridItem>
          <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
            갯수
          </GridItem>
          <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={1}>
            {props.itemName}
          </GridItem>

          <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1}>
            {myItemQuantity} 개
          </GridItem>
          <GridItem
            bg="whiteAlpha.100"
            colSpan={3}
            rowSpan={2}
            justifySelf={"flex-start"}
          >
            {props.itemDescription}
          </GridItem>
        </Grid>
      ) : null}
    </>
  );
};

export default InventoryCard;
