import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemImage from "../../ItemImage";

const InventoryBox = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const item = props.item;
  const gameTitle = props.gameTitle;

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

  // 아이템 사용하기
  const usingItem = async () => {
    await axios
      .post(`/api/items/game-items/using-item`, {
        account: account,
        itemName: item.itemName,
        gameTitle: gameTitle,
      })
      .then((res) => {
        props.getItemEffect(res.data);
        // 아이템 사용됐으면 수량 갱신
        getMyItemQuantity();
        alert("아이템이 적용되었습니다");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyItemQuantity();
  }, [account]);

  return (
    <Button
      onClick={usingItem}
      colorScheme={"blue"}
      width={"70px"}
      height={"70px"}
      margin={"10px 5px 0px"}
      padding={"0"}
      display={"block"}
      position={"relative"}
      disabled={
        myItemQuantity == 0 ||
        (item.itemId > 3 && props.gameEnded) ||
        (item.itemId > 3 && props.itemEffect)
      }
    >
      <ItemImage itemId={item.itemId} />
      <Box position={"absolute"} right={"2px"} top={"0"}>
        {myItemQuantity}
      </Box>
      {/* <Box>{item.itemName}</Box>
        <Box>{item.itemDescription}</Box> */}
    </Button>
  );
};

export default InventoryBox;
