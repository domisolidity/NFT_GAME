import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemImage from "../ItemImage";
import GameInterface from "./GameInterface";

const GameItem = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const item = props.item;
  const gameTitle = props.gameTitle;

  // 내 소유 아이템 목록
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 아이템 사용하기
  const usingItem = async () => {
    props.getItemEffect(
      await GameInterface.usingItem(account, item.itemName, gameTitle)
    );
    // 아이템 사용됐으면 수량 갱신
    setMyItemQuantity(
      await GameInterface.getMyItemQuantity(account, item.itemName)
    );
    alert("아이템이 적용되었습니다");
  };

  useEffect(async () => {
    setMyItemQuantity(
      await GameInterface.getMyItemQuantity(account, item.itemName)
    );
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
        (item.itemId > 3 && props.itemEffect) ||
        (item.itemId > 3 && !props.isPlaying)
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

export default GameItem;
