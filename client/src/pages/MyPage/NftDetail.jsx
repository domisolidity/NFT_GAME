import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { Link,useParams,useLocation } from 'react-router-dom';
import { Box, Grid, GridItem, Flex, Image, Button,Heading,Text,Input } from "@chakra-ui/react";
const NftDetail_my = (props) => {
  // const currentPath = window.location.pathname;
  // const nftId = window.location.pathname.slice(8)
  const blockchain = useSelector(state=> state.blockchain);
  const { web3, account, nftContract, nftDealContract}  = blockchain;
  const {state} = useLocation();
  const tokenId = useParams();
  const {img, name, description} = state;
  const [isApproved,setIsApproved] = useState(false);
  const [price,setPrice] = useState();

//테스트용 isApprovedForAll
const test = async()=>{
  await nftContract.methods.isApprovedForAll(account,nftDealContract._address).call().then(result=>{
    console.log(result)
    if(result.state){
      console.log(result.state)
      console.log(result)
    }
  })
  
}
//테스트용) 판매목록 반환 함수
  const saleNft = async()=>{
    await nftDealContract.methods.getOnSaleNftArrayLength().call({from:account}).then(result=>{
      console.log(result)
      if(result.state){
        console.log(result.state)
        console.log(result)
      }
    })
  }

  const approveSell = async(bool) =>{
    try {
      setIsApproved(!isApproved)
      console.log(bool)
      console.log(nftDealContract._address)
        await nftContract.methods.setApprovalForAll(nftDealContract._address,bool).send({from:account}).then(result=>{
          if (result) {
            console.log(result)
            setIsApproved(!isApproved)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const submitSell = async() => {
    try {
      console.log(tokenId)
        await nftDealContract.methods.sellNft(tokenId.id,web3.utils.toWei(price, "ether")).send({from:account}).then(result=>{
          console.log(result)
          if (result.state) {
            console.log(result)
          }
        })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Grid
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}
      
    >
      <GridItem colSpan={2}  bg="whiteAlpha.100" >
        <Flex direction="column">
          <Image src={img} borderRadius={10}/>
          <Box borderRadius={10} border="1px solid #302f2f"  mt="2">
            <Heading size="sm" bg="#182749" padding="3">Description</Heading>
            <Text fontSize="15" padding="3">{description}</Text>
          </Box>
          <Box borderRadius={10} bg="##1E315F" border="1px solid #302f2f" >
            <Heading size="sm" bg="#182749" padding="3">Properties</Heading>
            <Grid templateColumns="repeat(3,1fr)" padding="3"> 
                <GridItem>속성1</GridItem>
                <GridItem>속성2</GridItem>
                <GridItem>속성1</GridItem>
                <GridItem>속성1</GridItem>
            </Grid>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}  bg="whiteAlpha.100" padding="5">
        <Text>grade</Text>
        <Heading>{name}</Heading>
        <Text>owned by <span style={{color:"skyblue"}}>you</span></Text>

    
        <Box mt={20}>
            <Heading size="lg" display="inline">Sell 
              {isApproved ? 
                <Text fontSize="15" display="inline-block" bg="green">판매 승인 완료</Text>
              :
                <Text fontSize="15" display="inline-block" bg="red">판매 승인 필요</Text>
              }
            </Heading>
            <Text>Type</Text>
            <Flex justify="space-around">
              <Button>Fixed Price</Button>
              <Button>Timed Action</Button>
            </Flex>
            </Box>
            price <Input onChange={(e)=>setPrice(e.target.value)}/>
            <Box>
            <Text>duration</Text>
            <Input/>
            <Flex justify="center">
              <Button onClick={()=>approveSell(isApproved)}>Approved Sell</Button>
              <Button onClick={submitSell}> Sell</Button>
              <Button onClick={test}>test)허용됐는지 확인</Button>
              <Button onClick={saleNft}>test)판매등록된 nft목록</Button>

            </Flex>
        </Box>

        <Box mt={20}>
          <Heading size="lg">Present</Heading>
          to Address <Input/>
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

      {/* <GridItem colSpan={5} rowSpan={1} bg="whiteAlpha.100" padding={5}>
      </GridItem> */}
    </Grid>
    </>
  )
}

export default NftDetail_my