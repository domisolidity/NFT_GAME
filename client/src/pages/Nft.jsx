import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button ,Text} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import axios from "axios";
import NftMint from "./Nft/NftMint";
import NftTransfer from "./Nft/NftTransfer";
const Nft = () => {

  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract} = blockchain;
  const [loading,setLoading] = useState(false);
  const [MintOrTransfer,setMintOrTransfer] = useState(false);
  const [remainNft,setRemainNft] = useState();
  const [nft,setNft] = useState({
    id: null,
    uri: null,
    metadata: null,
  })
  const [renderNft,setRenderNft] = useState({
    name: null,
    image: null,
    description:null
  })
  
  const baseUri = "https://ipfs.infura.io/ipfs";
  
  // @ 민팅 함수
  const minting = async() =>{
    try {
      await nftContract.methods.create(account.toString() , process.env.REACT_APP_METADATA).send({from:account.toString()}).then((result)=>{
        setLoading(true);
        if (result) {
          
        }  
        getMyNft()
        console.log(nft.metadata)
      })

      
    } catch (error) {
      console.log("-에러 내용- \n",error);
      setLoading(false)
    }
  }
  
  // @ my Nft 찾기 (민팅함수 하위)
  const getMyNft=async()=>{
    await nftContract.methods.getMyToken().call({from:account.toString()}).then(result=>{
      setNft({
        id:result.id,
        uri:result.uri,
        metadata:`${baseUri}${result.uri.slice(6)}/${result.id}.json`
      })
    })
  }
  
  // @ my Nft 찾기(detail) (getMyNft 정보 참조해서 사용하는 함수)
  const getMyNftDetail = async() => { 
    await axios.get(`${nft.metadata}`).then(metadatafile=>{
      setRenderNft({
        name: metadatafile.data.name,
        image: `${baseUri}${metadatafile.data.image.slice(6)}`,
        description: metadatafile.data.description
      })
      setLoading(false)
    })
  }


  // @ 남은 Nft 수량
  const remainedNft = async() =>{
    try {
      await nftContract.methods.remainedNft().call({from:account.toString()}).then(result=>{
        console.log(result)
        setRemainNft(result);
      })
    } catch (error) { 
      console.log("-에러 내용- \n",error);
    }
  }

  useEffect(()=>{
    if (!account) {
      return false
    }
    remainedNft();
  },[account])
  
  useEffect(async() => {
    if (nft.metadata) {
      await getMyNftDetail();
      await remainedNft();
    }
  }, [nft.metadata])
  
  const onMint = (e) => {
    e.preventDefault();
    setMintOrTransfer(false);
  }
  
  const onTransfer = (e) => {
    e.preventDefault();
    setMintOrTransfer(true);
  }

  const toMintJSX = {loading,remainNft,renderNft,minting}
  const toTransferJSX = { account, nftContract}
  return (
    <Box align="center" pb={20}>
      <Box w="100%" h="300" bg="yellow">
        {console.log("Nft.jsx 렌더")}
        NFT 페이지
      </Box>
      <Box w="400px">
        <Heading as='h2' size='2xl'>NFT</Heading>
        <Flex justifyContent="space-evenly" borderRadius="30" bg="whiteAlpha.400" mt={10}>
          <Button onClick={onMint} variant="ghost" isActive={MintOrTransfer ? 0 : 1}>NFT 구매</Button>
          <Button onClick={onTransfer} variant="ghost" isActive={MintOrTransfer ? 1 : 0}>NFT 선물</Button>
        </Flex>
      </Box>
      {MintOrTransfer ?  
      <NftTransfer toTransferJSX={toTransferJSX}/>
      :
      <NftMint toMintJSX={toMintJSX}/>
      }
    </Box>
  );
};

export default Nft;
