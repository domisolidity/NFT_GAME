import React,{useState} from "react";
import { useSelector } from "react-redux";
import { useParams,useLocation } from "react-router-dom";
import {
  Box, Grid, GridItem, Flex, Image, Button,Heading,Text,Input,Checkbox,
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


const MarketDetail = () => {
  const blockchain = useSelector(state => state.blockchain);
  const { web3, account, nftContract, nftDealContract} = blockchain;
  const params = useParams()
  const {state} = useLocation();
  const { data, image, tokenId,price } = state.nftInfo;
  console.log("속성",state.nftInfo)
  console.log("속성",data.attributes)

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [agree, setAgree] = useState(false);


  const dealNft = async()=>{
    try {
      console.log(tokenId)
      console.log("가격",price)
      await nftDealContract.methods.buyNft(tokenId).send({from:account, value:web3.utils.toWei(price, "ether")}).then(result=>{
        console.log(result)
        Swal.fire({
          icon: "success",
          title: "Compelete",
          text: "구매 완료 하셨습니다.",
          footer: `<Link href="/mypage">마이페이지에서 확인</Link>`,
        });
        // setAgree(false)
      })
      onClose();
      onOpen();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Grid
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}

    >
           <GridItem colSpan={2}  bg="whiteAlpha.100" >
        <Flex direction="column">
          <Image src={image} borderRadius={10}/>
          <Box borderRadius={10} border="1px solid #302f2f"  mt="2">
            <Heading size="sm" bg="#182749" padding="3">Description</Heading>
            <Text fontSize="15" padding="3">{data.description}</Text>
          </Box>
          <Box borderRadius={10} bg="##1E315F" border="1px solid #302f2f" >
            <Heading size="sm" bg="#182749" padding="3">Properties</Heading>
            <Grid templateColumns="repeat(3,1fr)" padding="5" gap={1}> 
              {data.attributes[0] && data.attributes.map((attr,i)=>{
                return (
                  <GridItem key={i} align="center" border="2px solid #2b7997" borderRadius={15}>
                    <Text fontWeight="bold">{attr.trait_type}</Text>
                    <Text>{attr.value}</Text>
                  </GridItem>
                )
              })}
            </Grid>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}  bg="whiteAlpha.100" padding="5">
        <Text>{data.grade}</Text>
        <Heading>{data.name}</Heading>
        <Text>owned by <span style={{color:"skyblue"}}>address</span></Text>

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
                  name : {data.name} <br />
                  price : {price} ETH
                  <Box>
                    <Checkbox onClick={dealNft}>구매 하는데 동의 하십니까</Checkbox>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={dealNft} >Confirm</Button>
                  <Button colorScheme='blue' mr={3} onClick={onClose} >
                    Close
                  </Button>
                  {/* {agree ? } */}
                </ModalFooter>

              </ModalContent>
            </ModalOverlay>

          </Modal>
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
  );
};

export default MarketDetail;
