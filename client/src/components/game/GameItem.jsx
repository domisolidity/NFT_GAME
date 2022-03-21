import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemImage from "../ItemImage";
import GameInterface from "./GameInterface";

const GameItem = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const {
    item,
    gameTitle,
    getItemEffect,
    itemEffect,
    isPlaying,
    updateChance,
  } = props;
  // const gameTitle = props.gameTitle;

  // 내 소유 아이템 목록
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 아이템 사용하기
  const usingItem = async () => {
    if (myItemQuantity == 0) return;
    // 아이템 효과
    const recivedItemEffect = await GameInterface.getItemEffect(
      account,
      item.itemName,
      gameTitle
    );
    if (recivedItemEffect) {
      // 아이템 사용
      await GameInterface.usingItem(account, item.itemName);
      // 사용 후 갱신된 수량
      const recivedQuantity = await GameInterface.getMyItemQuantity(
        account,
        item.itemName
      );
      if (recivedItemEffect == 1) {
        const updatedChance = await GameInterface.getMyChance(
          account,
          gameTitle
        );
        updateChance(updatedChance);
      } else {
        getItemEffect(recivedItemEffect);
      }

      setMyItemQuantity(recivedQuantity);
      alert("아이템이 적용되었습니다");
    } else {
      alert("아이템 사용에 실패하였습니다");
    }
  };

  useEffect(async () => {
    const recivedQuantity = await GameInterface.getMyItemQuantity(
      account,
      item.itemName
    );
    setMyItemQuantity(recivedQuantity);
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
        (item.itemId > 3 && itemEffect != 1) ||
        (item.itemId > 3 && !isPlaying)
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
