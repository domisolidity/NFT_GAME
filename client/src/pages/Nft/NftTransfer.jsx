import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Input,
  Image,
  Text,
  Flex,
  Button
} from "@chakra-ui/react";
import HorizontalScroll from 'react-scroll-horizontal';
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2'

const NftTransfer = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract,loading } = blockchain;
  const [ToAddr, setToAddr] = useState();
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectNum, setSelectNum] = useState(0);
  const [nft, setNft] = useState({
    id: null,
    metadata: null
  });

  // const baseUri = "https://ipfs.infura.io/ipfs";
  const baseUri = "http://127.0.0.1:8080/ipfs";

  // @ nft 선물하기
  const transferMyNft = async (toAddr) => {
    // ## toAddr 잘못되면 에러 메세지 날리기
    console.log("여기",selectNum)
    console.log(selectIndex)
    const response = await nftContract.methods
      .handOver(account.toString(), toAddr, selectNum, selectIndex)
      .send({ from: account.toString() })
      .then((result) => {
        console.log(result);
        nft.splice(selectIndex,1)
      });
      setSelectNum(0);
  };

  // @ 선물할 nft 선택
  const selectNft = async(index, selectedNft)=>{
    setSelectIndex(index);
    setSelectNum(selectedNft);
    console.log("selectNum",selectNum)
  }

   // @ my Nft 찾기
  const getMyNft = async () => {
    await nftContract.methods
      .getMyToken()
      .call({ from: account })
      .then(async(result) => {
        
        console.log("getMyNft")
        let myNfts = []; 
        for (const info of result) {
          if (info.uri == '')  continue;
          const response = await axios.get(`${baseUri}${info.uri.slice(6)}/${info.id}.json`);
          myNfts.push({
            id: info.id,
            name: response.data.name,
            image: `${baseUri}${response.data.image.slice(6)}`,
            description: response.data.description,
          })
        }
        console.log("myNft",myNfts)
        setNft(myNfts);
      });
  };

  useEffect(async () => {
    if (!account) return false;
 
    console.log(typeof nft)
    await getMyNft();
  }, [account]);

  useEffect(async () => {
    if (!account || nft == undefined) return false;
    await getMyNft();
  }, [nft.id]);

  return (
    <Grid
      justify="space-evenly"
      w="80vw"
      h={550}
      gap={10}
      mt={10}
      templateColumns="repeat(5,1fr)"
    >
      <GridItem colSpan="3" bg="whiteAlpha.400" borderRadius="30">
        myNFT
        {nft[0] ? 
          <HorizontalScroll reverseScroll = { true }>
 
            {nft.map((mynft,i)=>{
              return (
                <Flex key={i} w="20vw" mt="15" mr="20" h="20vh" direction="column">
                    <Image   src={mynft.image} borderRadius={30} />
                    <Text mt="5">{mynft.name}</Text>
                    <Text>{mynft.description}</Text>
                    <Button onClick={()=>selectNft(i,mynft.id)}>선택</Button>
                  </Flex>
                
                )
              })}

          </HorizontalScroll>
          : <Text>보유 nft가 없습니다.</Text>
        }
      </GridItem>
      <GridItem colSpan="2" bg="whiteAlpha.400" borderRadius="30">
        Transfer
        <Flex justify="space-evenly">
          <Text lineHeight={10}>보낼 주소</Text>
          <Input
            placeholder="from"
            variant="outline"
            borderRadius="30"
            w="70%"
            onChange={(e) => setToAddr(e.target.value)}
          />
          <Button onClick={() => transferMyNft(ToAddr)}>선물 보내기</Button>
        </Flex>
        <Text>{selectNum}</Text>
      </GridItem>
  
    </Grid>
  );
};

export default NftTransfer;
