import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

const itemCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, gameTokenContract } = blockchain;
  const item = props.item;
  const { NEXT_PUBLIC_SERVER_URL } = process.env;

  // 내 소유 아이템 목록
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () =>
    await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/items/game-items/my-items-quantity`, {
        account: account,
        itemName: item.itemName,
      })
      .then((res) => {
        setMyItemQuantity(res.data.count);
      });

  // 아이템 구매하기
  const buyItem = async () => {
    // 판매자(컨트랙트 배포자) address 받아오기
    const owner = await gameTokenContract.methods.getOwner().call();
    // 판매자에게 아이템값 보내기
    const response = await gameTokenContract.methods
      .transfer(owner, item.itemPrice)
      .send({ from: account });

    // 구입했으면 DB에 아이템 추가해주기
    const isBought = await axios.post(
      `${NEXT_PUBLIC_SERVER_URL}/items/game-items/buy-item`,
      {
        account: response.from,
        itemName: item.itemName,
      }
    );
    console.log(isBought.data.item_itemName, "구매했어");
    setMyItemQuantity(myItemQuantity + 1);
  };

  useEffect(() => {
    getMyItemQuantity();
  }, [account, auth]);
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="whiteAlpha.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={`/images/itemIcons/itemIcon${item.itemId}.png`}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"} m={4}>
            {item.itemName}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {myItemQuantity}개 보유 중
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {item.itemDescription}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              onClick={buyItem}
            >
              구매
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default itemCard;
