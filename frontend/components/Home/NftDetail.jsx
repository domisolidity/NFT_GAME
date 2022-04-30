import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Image,
  Button,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";

const NftDetail_my = () => {
  const { state } = useLocation();
  const { id, grade, attributes, name, image, description } = state.nftInfo;
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract, nftDealContract } = blockchain;

  const [isApproved, setIsApproved] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [price, setPrice] = useState();

  // 판매 승인
  const approveSell = async (bool) => {
    try {
      console.log(!bool);
      console.log(nftDealContract._address);
      await nftContract.methods
        .setApprovalForAll(nftDealContract._address, !bool)
        .send({ from: account })
        .then((result) => {
          if (result) {
            console.log(result);
            isApprovedCheck();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 판매 등록
  const submitSell = async () => {
    try {
      if (onSale) {
        alert("이미 판매중입니다.");
      }
      if (!isApproved) {
        alert("판매 승인을 먼저 받아주세요");
        return false;
      } else if (!price) {
        alert("가격을 입력해주세요");
        return false;
      }
      await nftDealContract.methods
        .sellNft(id, web3.utils.toWei(price, "ether"))
        .send({ from: account })
        .then((result) => {
          console.log(result);
          onSaleCheck();
        });
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  // 판매 취소
  const cancelSell = async () => {
    try {
      //취소하는 동작 넣기
      // setOnSaleTrigger(false)
    } catch (error) {
      console.log(error);
    }
  };
  // 허용여부 확인
  const isApprovedCheck = async () => {
    await nftContract.methods
      .isApprovedForAll(account, nftDealContract._address)
      .call()
      .then((result) => {
        setIsApproved(result);
      });
  };

  // 판매여부 확인
  const onSaleCheck = async () => {
    try {
      await nftDealContract.methods
        .onSale(id)
        .call({ from: account })
        .then((result) => {
          console.log(result);
          setOnSale(result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) return false;
    console.log("허용여부확인");
    isApprovedCheck();
    onSaleCheck();
  }, [account]);

  return (
    <>
      <Grid
        w="70vw"
        margin="0 auto"
        templateColumns="repeat(5,1fr)"
        templateRows="repeat(1,1fr)"
        gap={2}
      >
        <GridItem colSpan={2} bg="whiteAlpha.100">
          <Flex direction="column">
            <Image src={image} borderRadius={10} />
            <Box borderRadius={10} border="1px solid #302f2f" mt="2">
              <Heading size="sm" bg="#182749" padding="3">
                Description
              </Heading>
              <Text fontSize="15" padding="3">
                {description}
              </Text>
            </Box>
            <Box borderRadius={10} bg="##1E315F" border="1px solid #302f2f">
              <Heading size="sm" bg="#182749" padding="3">
                Properties
              </Heading>
              <Grid templateColumns="repeat(3,1fr)" padding="5" gap={1}>
                {attributes[0] &&
                  attributes.map((attr, i) => {
                    return (
                      <GridItem
                        key={i}
                        align="center"
                        border="2px solid #2b7997"
                        borderRadius={15}
                      >
                        <Text fontWeight="bold">{attr.trait_type}</Text>
                        <Text>{attr.value}</Text>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} bg="whiteAlpha.100" padding="5">
          <Text
            borderRadius={20}
            bg={
              grade == "red"
                ? "red.700"
                : grade == "green"
                ? "green.700"
                : "purple.700"
            }
            w="10%"
            padding={1}
            align="center"
          >
            {grade}
          </Text>
          <Heading>{name}</Heading>
          <Text>
            owned by <span style={{ color: "skyblue" }}>you</span>
          </Text>
          <Box mt={20}>
            <Heading size="lg" display="inline">
              Sell
              {onSale ? (
                <Text fontSize="15" display="inline-block" bg="#e28a37">
                  판매중
                </Text>
              ) : isApproved ? (
                <Text fontSize="15" display="inline-block" bg="#2d7a47">
                  판매 가능
                </Text>
              ) : (
                <Text fontSize="15" display="inline-block" bg="#9e2d2d">
                  판매 승인 필요
                </Text>
              )}
            </Heading>
            <Text>Type</Text>
            <Flex justify="space-around">
              <Button>Fixed Price</Button>
              <Button>Timed Action</Button>
            </Flex>
          </Box>
          price <Input onChange={(e) => setPrice(e.target.value)} />
          <Box>
            <Text>duration</Text>
            <Input />
            {onSale ? (
              <Flex justify="center">
                <Button onClick={cancelSell}> Cansel Sell</Button>
              </Flex>
            ) : (
              <Flex justify="center">
                <Button onClick={() => approveSell(isApproved)}>
                  {isApproved ? (
                    <span>Cancel Approved Sell</span>
                  ) : (
                    <span>Approved Sell</span>
                  )}
                </Button>
                <Button onClick={submitSell}> Sell</Button>
              </Flex>
            )}
          </Box>
          <Box mt={20}>
            <Heading size="lg">Present</Heading>
            to Address <Input />
            <Button>Present</Button>
          </Box>
        </GridItem>

        <GridItem colSpan={5} bg="whiteAlpha.100" padding={5}>
          <Heading>history</Heading>
          <Text>12</Text>
          <Text>12</Text>
          <Text>12</Text>
          <Text>12</Text>
          <Text>12</Text>
          <Text>12</Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default NftDetail_my;
