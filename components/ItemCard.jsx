import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemImage from "./ItemImage";

const ItemCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, gameTokenContract } = blockchain;
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
      .then((res) => {
        setMyItemQuantity(res.data.count);
      });

  // 아이템 구매하기
  const buyItem = async () => {
    // 판매자(컨트랙트 배포자) address 받아오기
    const owner = await gameTokenContract.methods.getOwner().call();
    // 판매자에게 아이템값 보내기
    const response = await gameTokenContract.methods
      .transfer(owner, item.itemPrice)
      .send({ from: account });

    // 구입했으면 DB에 아이템 추가해주기
    const isBought = await axios.post(`/api/items/game-items/buy-item`, {
      account: response.from,
      itemName: item.itemName,
    });
    console.log(isBought.data.item_itemName, "구매했어");
    setMyItemQuantity(myItemQuantity + 1);
  };

  useEffect(() => {
    getMyItemQuantity();
  }, [account, auth]);

  return (
    <GridItem
      colSpan={1}
      bg="tomato"
      width="200px"
      wordBreak="break-all"
      textAlign="center"
    >
      <Box w={"200px"}>
        <ItemImage itemId={item.itemId} />
      </Box>
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
