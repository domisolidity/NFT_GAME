import React,{useEffect,useState} from "react";
import {WarningIcon } from '@chakra-ui/icons'
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {Box, Grid, GridItem, Flex, Image,Heading,Text,Input,Button ,Checkbox ,
  Thead,
  Tbody,
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,} from "@chakra-ui/react";
import {todayTimeFormal} from "../../../hooks/currentTime";
// import BidTable from "../../../components/market/auction/BidTable.jsx";
import AuctionInfo from "../../../components/market/auction/AuctionInfo.jsx";
import Countdown from "../../../components/Countdown.jsx";
// import PlaceBid from "../../../components/market/auction/PlaceBid.jsx";
import AuctionContract from "../../../contracts/artifacts/Auction.json";


const MarketDetail = () => {
  const blockchain = useSelector(state => state.blockchain);
  const { web3, account, nftContract,auctionCreatorContract } = blockchain;
  const router = useRouter();
  const {id, grade, attributes, name, image, description, remainTime } = router.query;
  const [tokenOwner, setTokenOwner] = useState();
  const [auctionContract, setAuctionContract] = useState(0);
  const [bidHistory, setBidHistory] = useState([]);
  const [check, setCheck] = useState(false);
  const [initInfo,setInitInfo] = useState();
  const [auctionState,setAuctionState] = useState("경매 진행중");
  const [maxBid, setMaxBid] = useState(0);
  const [startBid, setStartBid] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qqqq, setqqqq] = useState(false);

  // @ 입찰하기 함수
  const placeBidNft = async() =>{
    if (check == false) {
      alert("동의 여부에 체크해 주세요.") 
      return
    } else if (tokenOwner.toLowerCase() == account) {
      alert("시세조작 방지를 위해 자신이 판매하는 경매에 참여할 수 없습니다.");
      return;
    }
    const isHighestBidder = await auctionContract.methods.isHighestBidder().call({from:account})
    const inputBid = web3.utils.toWei(maxBid,'ether');
    if (isHighestBidder==false && Number(inputBid) <= Number(startBid)) {
      alert("경매 시작가보다 더 높게 지불해야 합니다.");
      return;
    } 
    await auctionContract.methods.placeBid(Date.now()).send({from:account,value:web3.utils.toWei(maxBid,"ether")}).then(res=>{
      const time = todayTimeFormal();  
      console.log(time)
      console.log([...bidHistory,res.events.PlaceBidEvent.returnValues])
      setBidHistory([...bidHistory,res.events.PlaceBidEvent.returnValues]);
      
    }).catch(console.error());
    alert("성공")
  }
  
  // @ 경매 종료의 입찰금들 회수 함수
  const claimAuction = async() =>{
    await auctionContract.methods.finalizeAuction(id).send({from:account}).then(res=>{
      console.log(res);
    })
  }
  const getTokenOwner = async() =>{
      await nftContract.methods.ownerOf(id).call({from:account}).then(res=>{
          setTokenOwner(res);
      }).catch(console.error());
  }

  const getAuctionContract = async() =>{
    console.log("여기")
      await auctionCreatorContract.methods.getAuctionAddress(id).call({from:account}).then(address=>{
        const addr = new web3.eth.Contract(AuctionContract.abi, address );  
        console.log(address)
        setAuctionContract(addr)
        addr.getPastEvents("PlaceBidEvent",{filter:{id:id},fromBlock:0, toBlock: "latest"}).then(res=>{
          let returnValuesArr = [];
          for (const history of res) {
            returnValuesArr.push(history.returnValues);
          }
          console.log(returnValuesArr)
          setBidHistory([...bidHistory,...returnValuesArr]);

        })
      }).catch(console.error)
  }

  const getAuctionInfo = async() =>{
    console.log(auctionContract)
    if(auctionContract){
        await auctionContract.methods.getInitInfo().call({from: account}).then(res=>{
            console.log(res)
            setInitInfo(res);
            setStartBid(res[1])
        }).catch(console.error())
    }
} 

const getIsEnd=(data)=>{
setqqqq(data);
}
  const endTimeAuction = () =>{
    if(remainTime < Date.now()){
      setAuctionState("경매 종료");
    }
  }


  useEffect(async()=>{
  
    endTimeAuction();
  },[qqqq])
  useEffect(async()=>{
    if (!account) return;
    await getTokenOwner();
    await getAuctionContract();
    endTimeAuction();
  },[])
  useEffect(async()=>{
    if (!account ) return;
    await getAuctionInfo();
    console.log(bidHistory);
  },[account,bidHistory])
  
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
            <Text fontSize="15" padding="3">{description}</Text>
          </Box>
          <Box borderRadius={10} bg="##1E315F" border="1px solid #302f2f" >
            <Heading size="sm" bg="#182749" padding="3">Properties</Heading>
            <Grid templateColumns="repeat(3,1fr)" padding="5" gap={1}> 
              {attributes && attributes.map((attr,i)=>{
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
        <Text borderRadius="10" p="1" align="center" w="65px" bg={grade=="red"? "red.700" : grade=="green" ? "green.700": "purple.700"}>{grade}</Text>
        <Heading>{name}</Heading>
        <Text mt="4">owned by <Text style={{color:"skyblue"}}>{tokenOwner}</Text></Text>
        <AuctionInfo auctionContract={auctionContract} info={initInfo} auctionState={auctionState} history={bidHistory[bidHistory.length-1]}/>
        <Countdown remain={remainTime} setEnd={getIsEnd} auctionContract={auctionContract}/>
        <Box mt={15}>
          {auctionState == "경매 종료" ? 
          <>
          <Flex mt={5} justify="center">
            <Button bg="green.600"  onClick={claimAuction}>클레임</Button>   
          </Flex>
          <Flex justify="center">
            {/* <WarningIcon w={6} h={6} color="orange.200" /> */}
            <Text mr="5" lineHeight="10">경매 종료시 참여했던 입찰금을 회수해주세요</Text>
          </Flex>
          </>
            :   
            <Flex justify="center">
              <Text mr="5" lineHeight="10">max bid</Text>
              <Input mr="1" w="30" type="number" placeholder="최대 허용 입찰가"  onChange={(e)=>setMaxBid(e.target.value)}/>
              <Button bg="red.600" onClick={onOpen}>입찰하기</Button>   
            </Flex>
        }
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
       
      </GridItem>
      
      <GridItem colSpan={5} bg="whiteAlpha.100" padding={5}>
         {/* history */}
         
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>입찰자</Th>
                        <Th>입찰가 현재 시세</Th>
                        <Th>입찰한 가격 합산</Th>
                        <Th>입찰 시간</Th>
                    </Tr>
                </Thead>
                {bidHistory[0] ? bidHistory.map((history,i)=>{
                  return (
                    <Tbody key={i}> 
                      <Tr>
                          <Td>{`${history.account.substr(0,7)} ...... ${history.account.substr(38,41)}`}</Td>
                          <Td>{web3.utils.fromWei(history.highestBindingBid,"ether")} eth</Td>
                          <Td>{web3.utils.fromWei(history.currentBid,"ether")} eth</Td>
                          <Td>{todayTimeFormal(Number(history.timestamp))}</Td>
                      </Tr>
                  </Tbody>
                  )
                })
                :
                <div>음슴</div>
                }
            </Table>
        </TableContainer>
      </GridItem>
    </Grid>
  );
};

export default MarketDetail;
