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
import Collections from "../Collections";
import { Separator } from "../../Separator/Separator";
import NotFound from "../../utils/NotFound";

const ItemList = ({ gameItems }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const [hasQuantity, setHasQuantity] = useState([]);

  const getQuantity = (quantity) => {
    setHasQuantity([...hasQuantity, quantity]);
  };
  useEffect(() => {
    if (!(account && auth)) return;
    setHasQuantity([]);
  }, [account, auth]);

  return (
    <>
      {hasQuantity.length <= gameItems.length ? (
        gameItems.map((item, index) => {
          return (
            <InventoryCard
              key={index}
              img={item.itemId}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              getQuantity={getQuantity}
            />
          );
        })
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ItemList;
