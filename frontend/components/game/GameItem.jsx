import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemImage from "../ItemImage";
import GameInterface from "./GameInterface";

const GameItem = ({
  item,
  gameTitle,
  getItemEffect,
  resultBonus,
  extraPoints,
  isPlaying,
  updateChance,
}) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

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
    console.log(recivedItemEffect);
    if (recivedItemEffect) {
      // 아이템 사용
      await GameInterface.usingItem(account, item.itemName);
      // 사용 후 갱신된 수량
      const recivedQuantity = await GameInterface.getMyItemQuantity(
        account,
        item.itemName
      );
      // 사용 아이템이 횟수추가면 횟수추가하고 횟수업데이트
      if (recivedItemEffect.lifeBonus) {
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
      display={item.itemId == 7 && gameTitle != "테트리스" ? "none" : "block"}
      position={"relative"}
      disabled={
        // 아이템 사용 제한 추가
        // (가진 수량이 0개면, 아이템번호 4~7번은 게임중이 아니면,)
        // (4~7번 아이템은 한 게임당 두번이상 사용 불가)
        myItemQuantity == 0 ||
        (item.itemId >= 4 && !isPlaying) ||
        (item.itemId >= 4 && item.itemId <= 6 && resultBonus) ||
        (item.itemId == 7 && extraPoints)
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
