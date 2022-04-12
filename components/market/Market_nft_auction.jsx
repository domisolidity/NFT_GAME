import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Grid, GridItem, Flex, Image, Button,Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios  from "axios";
import Countdown from "../Countdown.jsx"
import _ from "lodash";
import Market_nft_auction_card from "./Market_nft_auction_card.jsx";


const Market_nft_auction = () => {
    const blockchain = useSelector((state) => state.blockchain);
    const { web3, account,auctionCreatorContract } = blockchain;
    
    const [auctionListLength, setAuctionListLength] = useState(0);
    const [auctionNft, setAuctionNft] = useState({
      data:null,
      tokenId:null
    });
    
    const [qqqq,setqqqq] = useState(false);

    const baseUrl = "http://127.0.0.1:8080/ipfs/";



    const getAuctionNft = async() =>{

        const currentBlockNum = await auctionCreatorContract.methods.getCurrentBlock().call({from:account})
        console.log("currentBlockNum",currentBlockNum);
        
        await auctionCreatorContract.methods.getAuctioningNft().call({from:account}).then( async (result)=>{
          console.log(result)
          setAuctionListLength(result.length)

          const onAuctionNft = [];
          for (let i = 0; i < result.length; i++) {
            await axios.get(`${baseUrl}${process.env.NEXT_PUBLIC_METADATA_HASH}/${result[i].tokenId}.json`).then(metadata=>{
              onAuctionNft.push({
                name: metadata.data.name,
                description: metadata.data.description,
                grade:metadata.data.grade,
                attributes: _.cloneDeep(metadata.data.attributes),
                image:`${baseUrl}${metadata.data.image.slice(6)}`,
                tokenId: result[i].tokenId,
                remainTime: result[i].endTime// [1) remainTime*15*1000, (2) 시간 형식 변환]
              })
            })
          }
          setAuctionNft(onAuctionNft)
        })

    }
  
  


    
    
    useEffect(async() => {
        if (!account ) return;
        getAuctionNft()
        console.log("이벤트촐력할곳")
    }, [account])

    
  
    return (
        <GridItem bg="whiteAlpha.100" colSpan={5} rowSpan={5}>
            <Text align="left">{auctionListLength} Nfts</Text>
          <Grid templateColumns="repeat(4, 1fr)" ml="5" gap={10} padding="5">
            {auctionNft[0] && auctionNft.map((nft,i)=>{
              return (
                <Market_nft_auction_card nft={nft} key={i}/>
                
                  )
                })} 
          </Grid>
        </GridItem>
    );
}

export default Market_nft_auction