import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import NftHistory from "../../../components/Home/NftHistory";
import SideBarScreen from "../../../components/Layout/Frame/SideBarScreen";

const MarketDetail_sale = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { web3, account, nftDealContract } = blockchain;
  const { id, grade, attr, name, image, description, price } = router.query;

  const dealNft = async () => {
    try {
      console.log(id);
      console.log("가격", price);
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
      onClose();
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) return;
    console.log("g");
  }, [account]);

  return (
    <Grid
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}
      pt={{ base: "120px", md: "75px" }}
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
        </Flex>
      </GridItem>
      <GridItem colSpan={3} bg="whiteAlpha.100" padding="5">
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
          <Heading>Price</Heading>
          <Text>{price}</Text>
          <Button onClick={onOpen}>Buy now</Button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Check</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  name : {name} <br />
                  price : {price} ETH
                  <Box>
                    <Checkbox onClick={dealNft}>구매 하는데 동의 하십니까</Checkbox>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={dealNft}>Confirm</Button>
                  <Button
                    // colorScheme="blue"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>
      </GridItem>

      <GridItem colSpan={5} bg="whiteAlpha.100" padding={5}>
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
