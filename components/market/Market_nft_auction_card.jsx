import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import Countdown from "../Countdown.jsx";
import _ from "lodash";

const Market_nft_auction_card = ({ nft }) => {
  const asdf = (data) => {};

  return (
    <Box
      w="300px"
      h="500"
      bg="blackAlpha.300"
      border="2px solid #287976b7"
      _hover={{ boxShadow: "dark-lg" }}
    >
      <Image src={nft.image} w="320" h="290" padding="5" />
      <Flex justify="space-between" marginBottom="5vh" p="0px 25px">
        <Box>{nft.name}</Box>
        <Box
          borderRadius="10"
          p="1"
          bg={
            nft.grade == "red"
              ? "red.700"
              : nft.grade == "green"
              ? "green.700"
              : "purple.700"
          }
        >
          {nft.grade}
        </Box>
      </Flex>
      <Text align="left">
        <Countdown remain={nft.remainTime} setEnd={asdf} />
      </Text>
      <Text>{/* {nft.price} ETH */}</Text>
      <Box h="10%" mt="30">
        <Link
          href={{
            pathname: `market/auction/${nft.tokenId}`,
            query: {
              id: nft.tokenId,
              grade: nft.grade,
              attributes: nft.attributes,
              name: nft.name,
              image: nft.image,
              description: nft.description,
              remainTime: nft.remainTime,
            },
          }}
          as={`market/auction/${nft.tokenId}`}
        >
          <a>
            <Button bg="#287976b7">Place Bid</Button>
          </a>
        </Link>
      </Box>
    </Box>
  );
};

export default Market_nft_auction_card;
