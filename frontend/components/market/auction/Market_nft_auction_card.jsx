import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Countdown from "../../utils/Countdown";

const Market_nft_auction_card = ({ nft }) => {
  const txtColor = useColorModeValue("gray.600", "white");
  const txt2ndColor = useColorModeValue("white", "white");

  return (
    <Box
      // key={i}
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      _hover={{ boxShadow: "dark-lg" }}
    >
      <Image src={nft.image} min="320" h="290" padding="5" />
      <Flex
        p="0px 20px 0px 20px"
        mb="8%"
        align="center"
        justify="space-between"
      >
        <Box color={txtColor}>{nft.name}</Box>
        <Box
          color={txt2ndColor}
          w="26%"
          borderRadius={"10px"}
          bg={
            nft.grade == "red"
              ? "red.700"
              : nft.grade == "green"
              ? "green.700"
              : "purple.700"
          }
          padding={1}
          align="center"
        >
          {nft.grade}
        </Box>
      </Flex>
      <Stack align={"center"} m={5}>
        <Countdown remain={nft.remainTime} />

        <Box h="10%" mt="25">
          <Link
            href={{
              pathname: `market/auction/${nft.tokenId}`,
              query: {
                id: nft.tokenId,
                grade: nft.grade,
                attributes: JSON.stringify(nft.attributes),
                name: nft.name,
                image: nft.image,
                description: nft.description,
                remainTime: nft.remainTime,
              },
            }}
            as={`market/auction/${nft.tokenId}`}
          >
            <a>
              <Button
                mt={10}
                fontSize={"md"}
                bg={"blue.400"}
                color={txt2ndColor}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "teal.500",
                }}
                _focus={{
                  bg: "teal.500",
                }}
              >
                Place Bid
              </Button>
            </a>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default Market_nft_auction_card;
