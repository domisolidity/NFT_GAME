import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ItemCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const item = props.item;

  // 내 소유 아이템 목록
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () =>
    await axios
      .post(`/api/items/game-items/my-items-quantity`, {
        account: account,
        itemName: item.itemName,
      })
      .then((res) => setMyItemQuantity(res.data.count));

  // 아이템 구매하기
  const buyItem = async () => {
    // await 웹3 샬라샬라//////////////////////////////////////////
    // 구입했으면
    await axios
      .post(`/api/items/game-items/buy-item`, {
        account: account,
        itemName: item.itemName,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    // getMyItemQuantity();
  }, [account]);

  return (
    <GridItem
      colSpan={1}
      bg="tomato"
      width="200px"
      wordBreak="break-all"
      textAlign="center"
    >
      <Box height={"200px"}>아이테 미미지</Box>
      <Box>{item.itemName}</Box>
      <Box>{myItemQuantity}개 보유 중</Box>
      <Box>{item.itemPrice} $</Box>
      <Box>{item.itemDescription}</Box>
      <Button onClick={buyItem} colorScheme={"blue"}>
        구매
      </Button>
    </GridItem>
  );
};

export default ItemCard;
