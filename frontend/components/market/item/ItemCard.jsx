import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Tooltip,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const itemCard = ({ item, as, slideIn }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, gameTokenContract } = blockchain;

  // 내 소유 아이템 목록
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () =>
    await axios
      .post(`/api/items/game-items/my-items-quantity`, {
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
    const isBought = await axios.post(`/api/items/game-items/buy-item`, {
      account: response.from,
      itemName: item.itemName,
    });
    console.log(isBought.data.item_itemName, "구매했어");
    setMyItemQuantity(myItemQuantity + 1);
  };

  useEffect(() => {
    getMyItemQuantity();
  }, [account, auth]);
  return (
    <Center py={6} as={as} animation={slideIn} opacity="0">
      <Box
        role={"group"}
        p={6}
        maxW={"270px"}
        w={"full"}
        // bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={230}
            objectFit={"cover"}
            src={`/images/itemIcons/itemIcon${item.itemId}.png`}
          />
        </Box>
        <Stack align={"center"}>
          <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
            {item.itemName}
            <Tooltip hasArrow label={item.itemDescription} bg="whiteAlpha.900">
              <QuestionOutlineIcon ml={2} />
            </Tooltip>
          </Heading>
          <Stack direction={"row"} justify="center" align={"baseline"}>
            <Text fontWeight={800} fontSize={"30px"}>
              {item.itemPrice}
            </Text>
            <Text fontWeight={600} color={"teal.300"}>
              DGT
            </Text>
          </Stack>
          {/* <Text color={"gray.500"} fontSize={"sm"}>
            {item.description}개 보유 중
          </Text> */}
          <Button
            fontSize={"md"}
            bg={"teal.400"}
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
      </Box>
    </Center>
  );
};

export default itemCard;
