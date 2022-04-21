import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Grid, GridItem, Text, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import InventoryCard from "./InventoryCard";

const Inventory = () => {
  const blockchain = useSelector((state) => state.blockchain);
  console.log("blockchain", blockchain);
  const { account, nftContract } = blockchain;

  console.log("📌 nftContract", nftContract);

  // 게임 아이템 목록
  const [gameItems, setGameItems] = useState([]);

  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`/api/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(async () => {
    if (!account) return false;

    await getGameItems();
  }, [account]); //account

  return (
    <>
      {/* <Box fontSize={"1.5rem"} fontWeight="bold">
        Items
      </Box> */}
      <Flex flexDir={"row"}>
        {gameItems[0] &&
          gameItems.map((item, index) => {
            return (
              <InventoryCard
                key={index}
                img={item.itemId}
                itemName={item.itemName}
                itemDescription={item.itemDescription}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Inventory;
