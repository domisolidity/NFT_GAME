import React, { useEffect, useState } from "react";
// import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import ItemImage from "../../ItemImage";
import Link from "next/link";

import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  // Link,
} from "@chakra-ui/react";
import NotFound from "../../utils/NotFound";

const InventoryCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { NEXT_PUBLIC_SERVER_URL } = process.env;

  const txtColor = useColorModeValue("gray.600", "gray.300");

  // 내 소유 아이템 개수
  const [myItemQuantity, setMyItemQuantity] = useState("");

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () => {
    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/items/game-items/my-items-quantity`, {
        account: account,
        itemName: props.itemName,
      })
      .then((res) => {
        setMyItemQuantity(res.data.count);
      });
  };

  useEffect(async () => {
    if (!(account && auth)) return;
    await getMyItemQuantity();
  }, [account, auth]);

  useEffect(() => {
    if (myItemQuantity) return;
    props.getQuantity(myItemQuantity);
  }, [myItemQuantity]);

  return (
    <>
      {myItemQuantity != 0 ? (
        <Flex p={5} alignItems="center" justifyContent="center">
          <Box
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            mx="auto"
            minW={"220px"}
          >
            <Box w={"200px"} h={"200px"} m={"0 auto"}>
              <ItemImage itemId={props.img} />
            </Box>
            <Box textAlign="center">
              <chakra.span fontSize="sm" color={txtColor}>
                {myItemQuantity}개 보유 중
              </chakra.span>
              <Box
                display="block"
                fontSize="2xl"
                color={txtColor}
                fontWeight="bold"
                mb={2}
              >
                {props.itemName}
              </Box>
            </Box>
          </Box>
        </Flex>
      ) : null}
    </>
  );
};

export default InventoryCard;
