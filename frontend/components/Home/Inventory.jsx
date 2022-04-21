import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Box,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import InventoryCard from "./InventoryCard";
import Collections from "./Collections";
import { Separator } from "../Separator/Separator";

const Inventory = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

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

  const txtColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SimpleGrid>
        <Text
          fontSize={"1.5rem"}
          fontWeight="bold"
          color={txtColor}
          textAlign="center"
          m={5}
        >
          Items
        </Text>
        <Separator />
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
      </SimpleGrid>
      <Text
        fontSize={"1.5rem"}
        fontWeight="bold"
        textAlign="center"
        color={txtColor}
        m={5}
      >
        Nfts
      </Text>
      <Separator />

      <Collections />
    </>
  );
};

export default Inventory;
