import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Grid, GridItem, Flex, Image, Button,Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios  from "axios";
import moment from "moment";
const Market_nft_auction = () => {
    const blockchain = useSelector((state) => state.blockchain);
    const { web3, account,auctionCreatorContract } = blockchain;
    
    const [auctionListLength, setAuctionListLength] = useState(0);
    const [auctionNft, setAuctionNft] = useState({
      data:null,
      tokenId:null
    });

    const baseUrl = "http://127.0.0.1:8080/ipfs/";


    const getAuctionNft = async() =>{
      const t1= moment();
      console.log(t1)
      console.log(moment('2022-04-15 09:00','YYYY-MM-DD HH:mm'));
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
                attributes:metadata.data.attributes,
                image:`${baseUrl}${metadata.data.image.slice(6)}`,
                tokenId: result[i].tokenId,
                remainTime: result[i].endBlockNum- currentBlockNum// [1) remainTime*15*1000, (2) 시간 형식 변환]
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
                <Box w="300px" h="500" bg="blackAlpha.300" key={i} border="2px solid #2E8F8B" _hover={{boxShadow:'dark-lg' }}>
                      <Image src={nft.image} w="320" h="290" padding="5"/>
                      <Flex h="15%" justify="space-between">
                        <Box>
                         {nft.name}
                        </Box>
                        <Box borderRadius="30">{nft.grade}</Box> 
                      </Flex>
                      <Text align="left">
                      {nft.remainTime}
                      </Text>
                      <Text>
                      {/* {nft.price} ETH */}
                      </Text>
                      <Box h="10%" mt="30">
                        <Link href={{
                          pathname:`market/${nft.tokenId}`,
                          query: {
                            id: nft.tokenId,
                            grade: nft.grade,
                            attributes: nft.attributes,
                            name: nft.name,
                            image: nft.image,
                            description: nft.description,
                            price: nft.price
                          }
                        }} as={`market/${nft.tokenId}`}>
                          <Button bg="blue.400" >
                              Buy now
                          </Button>
                        </Link>
                      </Box>
                  </Box>
                  )
                })} 
          </Grid>
        </GridItem>
    );
}

export default Market_nft_auction