import {WarningIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { Box,  Flex, Button,Text,Input,Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,} from "@chakra-ui/react";
import { useSelector } from "react-redux";


const PlaceBid = (props) => {
    console.log(props.deliveryValue)
    const {name,auctionContract} = props.deliveryValue;
    const blockchain = useSelector(state => state.blockchain);
    const { web3, account} = blockchain;

    const [check, setCheck] = useState(false);
    const [maxBid, setMaxBid] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();



    const placeBidNft = async() =>{
        if (check == false) {
            alert("동의 여부에 체크해 주세요.") 
            return
        };
        await auctionContract.methods.placeBid().send({from:account,value:web3.utils.toWei(maxBid,"ether")}).then(res=>{
            console.log(res)
        }).catch(console.error());
        alert("성공")
    }





  return (
    <Box mt={20}>
        <Flex justify="center">
          <Text mr="5" lineHeight="10">max bid</Text>
          <Input mr="1" w="30" type="number" placeholder="최대 허용 입찰가"  onChange={(e)=>setMaxBid(e.target.value)}/>
          <Button bg="red.600" onClick={onOpen}>place bid</Button>   
        </Flex>
        <Flex justify="center">
          <Text mr="5" lineHeight="10"><WarningIcon w={8} h={8} color="red.500" />ㄴㄴ</Text>
          <Button bg="red.600" >클레임</Button>   
        </Flex>
          {/* 모달창 */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Check</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  name : {name} <br />
                  최대 허용 입찰가 : {maxBid} ETH
                  <Box> 
                    <Checkbox onChange={()=>setCheck(!check)}>구매 하는데 동의 하십니까</Checkbox>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={placeBidNft} >Confirm</Button>
                  <Button colorScheme='blue' mr={3} onClick={()=>{
                      setCheck(false)
                      onClose()}}>
                    Close
                  </Button>
                  {/* {agree ? } */}
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>
  )
}

export default PlaceBid