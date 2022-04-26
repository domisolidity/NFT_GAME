import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Grid,
  GridItem,
  Text,
  Box,
  Flex,
  Checkbox,
  Center,
  SimpleGrid,
  useColorModeValue,
  keyframes,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import Market_nft_auction_card from "./Market_nft_auction_card.jsx";
import { Separator } from "../../Separator/Separator.js";

const Market_nft_auction = ({ as }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, auctionCreatorContract } = blockchain;

  const [auctionListLength, setAuctionListLength] = useState(0);
  const [auctionNft, setAuctionNft] = useState({
    data: null,
    tokenId: null,
  });
  const [checkedTrigger, setCheckedTrigger] = useState({
    running: true,
    ended: true,
  });
  const [qqqq, setqqqq] = useState(false);

  const baseUrl = "http://127.0.0.1:8080/ipfs/";

  const getAuctionNft = async () => {
    const currentBlockNum = await auctionCreatorContract.methods
      .getCurrentBlock()
      .call({ from: account });
    console.log("currentBlockNum", currentBlockNum);
    console.log(auctionCreatorContract);
    await auctionCreatorContract.methods
      .getAuctioningNft()
      .call({ from: account })
      .then(async (result) => {
        console.log(result);
        setAuctionListLength(result.length);

        const onAuctionNft = [];
        for (let i = 0; i < result.length; i++) {
          await axios
            .get(
              `${baseUrl}${process.env.NEXT_PUBLIC_METADATA_HASH}/${result[i].tokenId}.json`
            )
            .then(async (metadata) => {
              console.log(result[i].endTime);
              onAuctionNft.push({
                name: metadata.data.name,
                description: metadata.data.description,
                grade: metadata.data.grade,
                attributes: _.cloneDeep(metadata.data.attributes),
                image: `${baseUrl}${metadata.data.image.slice(6)}`,
                tokenId: result[i].tokenId,
                remainTime: result[i].endTime * 1000,
              });
            });
        }
        setAuctionNft(onAuctionNft);
      });
  };

  useEffect(async () => {
    if (!account) return;
    getAuctionNft();
    console.log("이벤트촐력할곳");
  }, [account]);

  const txtColor = useColorModeValue("gray.600", "white");
  const txt2ndColor = useColorModeValue("white", "white");

  const contentsKeyframes = keyframes`
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
  `;
  const slideIn = [];
  for (let i = 0; i < auctionListLength.length; i++) {
    let delay = 0.07;
    slideIn.push(`${contentsKeyframes} 0.1s linear ${delay * i}s forwards`);
  }

  return (
    <>
      <Center py={6}>
        <Flex align="center" w={"100%"} justify="center">
          <Flex ml="1.5vw" direction="row">
            <Text
              fontSize="20"
              align="left"
              p="5"
              fontWeight="extrabold"
              color={txtColor}
              m={"0 20px"}
            >
              Type
            </Text>
            <Checkbox
              // colorScheme="teal"
              defaultChecked
              onChange={() => {
                setCheckedTrigger({
                  running: !checkedTrigger.running,
                  ended: checkedTrigger.ended,
                });
              }}
            >
              <Text
                p="5px 15px"
                // bg={redColor}
                borderRadius="10"
                mr={6}
                color={txt2ndColor}
              >
                경매중
              </Text>
            </Checkbox>
            <Checkbox
              // colorScheme="teal"
              mt="1"
              defaultChecked
              onChange={() => {
                setCheckedTrigger({
                  running: checkedTrigger.running,
                  ended: !checkedTrigger.ended,
                });
              }}
            >
              <Text
                p="5px 15px"
                // bg={greenColor}
                borderRadius="10"
                mr={6}
                color={txt2ndColor}
              >
                경매 종료
              </Text>
            </Checkbox>
          </Flex>
        </Flex>
      </Center>
      <Separator />
      <Flex align="center" justify="right">
        Total
        <Box m={"0 10px"} color="teal.300" fontSize="20px">
          {auctionListLength}
        </Box>
        Auctions
      </Flex>

      <GridItem colSpan={5} rowSpan={5}>
        <Grid templateColumns="repeat(4, 1fr)" ml="5" gap={10} padding="5">
          {auctionNft[0] &&
            auctionNft
              .filter((nft) => {
                if (
                  (checkedTrigger.running == true
                    ? nft.remainTime > Date.now()
                    : false) ||
                  (checkedTrigger.ended == true
                    ? nft.remainTime < Date.now()
                    : false)
                )
                  return true;
              })
              .map((nft, i) => {
                return (
                  <Market_nft_auction_card
                    nft={nft}
                    key={i}
                    as={as}
                    slideIn={slideIn[i]}
                  />
                );
              })}
        </Grid>
      </GridItem>
    </>
  );
};

export default Market_nft_auction;
