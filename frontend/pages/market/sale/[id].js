import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
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
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  List,
  ListIcon,
  ListItem,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import NftHistory from "../../../components/Mypage/NftHistory";
import SideBarScreen from "../../../components/Layout/Frame/SideBarScreen";
import { CheckCircleIcon } from "@chakra-ui/icons";

const MarketDetail_sale = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { web3, account, nftDealContract } = blockchain;
  const { id, grade, attr, name, image, description, price } = router.query;
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  const dealNft = async () => {
    try {
      console.log(id);
      console.log("가격", price);

      if (check == false) {
        alert("동의 여부에 체크해 주세요.");
        return;
      }

      setLoading(true);

      await nftDealContract.methods
        .buyNft(id, Date.now())
        .send({ from: account.toString(), value: web3.utils.toWei(price, "ether") })
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: "success",
            title: "Compelete",
            text: "구매 완료 하셨습니다.",
            footer: `<Link href="/mypage">마이페이지에서 확인</Link>`,
          });
        });
      setLoading(false);
      setSoldOut(!soldOut);
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!account) return;
    console.log("g");
  }, [account]);

  const options = [
    { id: 1, desc: "판매금액의 5% 만큼의 수수료가 발생합니다." },
    { id: 2, desc: "히스토리는 하단에서 확인 가능합니다." },
  ];

  const PackageTier = ({ title, options, price, checked = false }) => {
    const colorTextLight = checked ? "white" : "purple.600";
    const bgColorLight = checked ? "purple.400" : "gray.300";

    const colorTextDark = checked ? "white" : "purple.500";
    const bgColorDark = checked ? "purple.400" : "gray.300";

    return (
      <Stack
        p={3}
        py={3}
        justifyContent={{
          base: "flex-start",
          md: "space-around",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
        alignItems={{ md: "center" }}
      >
        <Heading size={"md"}>{title}</Heading>
        <List spacing={3} textAlign="start">
          {options.map((desc, id) => (
            <ListItem key={desc.id}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              {desc.desc}
            </ListItem>
          ))}
        </List>
        <Heading size={"xl"}>{price}</Heading>
        <Text>ETH</Text>
        <Stack>
          <Button
            size="md"
            color={useColorModeValue(colorTextLight, colorTextDark)}
            bgColor={useColorModeValue(bgColorLight, bgColorDark)}
            onClick={onOpen}
            isLoading={loading ? 1 : null}
            loadingText="Buying.."
          >
            Buy now
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Grid
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}
      pt={{ base: "120px", md: "75px" }}
    >
      <GridItem colSpan={2} bg="whiteAlpha.100" borderRadius={"15px"}>
        <Flex direction="column">
          <Box border="1px solid #302f2f" borderRadius={"15px"}>
            <Image src={image} borderRadius={"15px 15px 0 0"} />
            <Box borderRadius={10} border="1px solid #302f2f">
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
                {attr &&
                  JSON.parse(attr).map((attr, i) => {
                    return (
                      <GridItem key={i} align="center" border="2px solid #2b7997" borderRadius={15}>
                        <Text fontWeight="bold">{attr.trait_type}</Text>
                        <Text>{attr.value}</Text>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={3} bg="whiteAlpha.100" padding="5" borderRadius={"15px"} border="1px solid #302f2f">
        <Text
          borderRadius={20}
          bg={grade == "red" ? "red.700" : grade == "green" ? "green.700" : "purple.700"}
          w="10%"
          padding={1}
          align="center"
        >
          {grade}
        </Text>
        <Heading>{name}</Heading>
        <Text>
          owned by <span style={{ color: "skyblue" }}>address</span>
        </Text>

        <Box mt={20}>
          <Divider />
          {!soldOut ? (
            <PackageTier title={"NFT"} price={price} options={options} />
          ) : (
            <Box textAlign="center" py={10} px={6}>
              <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                This NFT is sold out
              </Heading>
              <Text color={"gray.500"}>Check your inventory.</Text>
            </Box>
          )}

          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Check</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  name : {name} <br />
                  price : {price} ETH
                  <Box>
                    <Checkbox onChange={() => setCheck(!check)}>구매 하는데 동의 하십니까</Checkbox>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      dealNft();
                      onClose();
                    }}
                    mr={5}
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => {
                      setCheck(false);
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>
      </GridItem>

      <GridItem colSpan={5} borderRadius={"15px"}>
        <NftHistory tokenId={id} />
      </GridItem>
    </Grid>
  );
};

export default MarketDetail_sale;

// getLayout property
MarketDetail_sale.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
