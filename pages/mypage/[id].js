import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import AuctionContract from "../../contracts/artifacts/Auction.json"
import { useRouter } from "next/router";
import { addAuctionList } from "../../redux/data/dataActions";
import {Box,Grid,GridItem,Flex,Image,Button,Heading,Text,Input,} from "@chakra-ui/react";

const NftDetail_my = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const { auctionList,kdkd } = data
    const blockchain = useSelector((state) => state.blockchain);
    const { web3, account, nftContract, nftDealContract, auctionCreatorContract } = blockchain;
    const router = useRouter();
    console.log(router)
    const {id, grade, attributes, name, image, description } = router.query;
    console.log(router.query)
    
    const [isApproved, setIsApproved] = useState(false);
    const [price, setPrice] = useState();
    const [onsale, setOnSale] = useState(false);
    const [onAuctioning, setOnAuctioning] = useState(false);
    const [saleType, setSaleType] = useState(false);
    const [startingBid, setStartingBid] = useState();
    const [expirationDate, setExpirationDate] = useState();

    
    // 경매 생성 함수
    const createAuction = async() =>{
    if (onAuctioning) {
      alert("이미 경매 판매중입니다.");
    }
    if (!isApproved) {
      alert("판매 승인을 먼저 받아주세요");
      return false;
    } else if (!startingBid || !expirationDate) {
      alert("가격 또는 종료일자를 입력해주세요");
      return false;
    }
    console.log("startingBid",startingBid)
    console.log("expirationDate",expirationDate)

    const expirationTime = new Date(expirationDate).getTime();
    const currentTime = Date.now();
    // (종료시간 - 현재시간) / ms단위 / 블록생성주기 
    const _covertToBlockTime = Math.ceil((expirationTime - currentTime)/1000/15);
    console.log(_covertToBlockTime); 

    const _startingBid = web3.utils.toWei(startingBid,'ether');

    await auctionCreatorContract.methods.createAuction(id,nftContract._address,_startingBid,_covertToBlockTime).send({from:account}).then((res)=>{
      console.log("res",res)
      dispatch(addAuctionList(id, grade, attributes, name, image, description))
    })

  }

  // auctionContract 생성 확인 및 경매중 설정
  const getAuctionContract = async() =>{
    console.log("auctionList",auctionList)
    console.log("kdkd",kdkd)
    await auctionCreatorContract.methods.getAuctionList(account,id).call({from:account}).then(async(address)=>{
      const auctionContract = new web3.eth.Contract(AuctionContract.abi, address);
      console.log(auctionContract);
      // await auctionContract.methods.isAuctionCheck(id).call({from:account}).then(res=>{
      //     console.log(res)
      //     setOnAuctioning(res)
      // })
    })
  }

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
      if (onsale) {
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

  const convertToBlockNumber = (e) =>{
    setExpirationDate(e.target.value);
  }

  useEffect(() => {
    if (!account) return false;
    // console.log("허용여부확인");
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
            <Box>

            </Box>
            <Heading size="lg" display="inline">
              Sell
              {onsale ? (
                <Text fontSize="15" display="inline-block" bg="#e28a37" borderRadius="20" ml="2" p="1">
                  판매중
                </Text>
              ) : isApproved ? (
                <Text fontSize="15" display="inline-block" bg="#2d7a47" borderRadius="20" ml="2" p="1">
                  판매 가능
                </Text>
              ) : (
                <Text fontSize="15" display="inline-block" bg="#9e2d2d" borderRadius="20" ml="2" p="1">
                  판매 승인 필요
                </Text>
              )}
            </Heading>
            <Text mt="5">Type</Text>
            <Flex justify="space-around">
              <Button onClick={()=>setSaleType(false)} p="10">Fixed Price</Button>
              <Button onClick={()=>setSaleType(true)} p="10">Timed Action</Button>
            </Flex>
          </Box>
          {!saleType ? 
           <Box>
              price <Input onChange={(e) => setPrice(e.target.value)} />
           </Box>
          :
          <Box mt="5">
            <Flex justify="space-between">
              <Text>Starting Bid</Text> 
              <Box>Eth <Input w="60" onChange={e=>setStartingBid(e.target.value)}/></Box> 
            </Flex >
            <Flex justify="space-between">
              <Text>Expiration Date</Text>
              <Input w="60" type="datetime-local" onChange={convertToBlockNumber}/>   
            </Flex>
          </Box>
        }
          <Box mt="5">
            {onsale ? (
              <Flex justify="center">
                <Button onClick={cancelSell}> Cansel Sell</Button>
              </Flex>
            ) : (
              <Flex justify="center">
                <Button onClick={() => approveSell(isApproved)} colorScheme="linkedin">
                  {isApproved ? (
                    <span>Cancel Approved Sell</span>
                  ) : (
                    <span>Approved Sell</span>
                  )}
                </Button>
                <Button ml="5" onClick={submitSell} colorScheme="linkedin"> Sell</Button>
                <Button ml="5" onClick={createAuction} colorScheme="linkedin"> createAuction</Button>
                <Button ml="5" onClick={getAuctionContract} colorScheme="linkedin"> getAuctionAddress</Button>
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
