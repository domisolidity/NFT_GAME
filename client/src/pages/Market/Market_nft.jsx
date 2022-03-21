import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, GridItem, Flex, Image, Button,Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios  from "axios";

const Market_nft = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account,nftDealContract } = blockchain;
  
  const [saleLength, setSaleLength] = useState(0);
  const [saleNft, setSaleNft] = useState({
    data:null,
    tokenId:null
  });



  const baseUrl = "http://127.0.0.1:8080/ipfs/"
  
  useEffect(async() => {
    try {
      if (!account ) return;
      
      console.log("이벤트촐력할곳")

      
      await nftDealContract.methods.getOnSaleNftArray().call({from:account}).then( async (result)=>{
        console.log(result)
        setSaleLength(result.length)
        const salenft = [];
        for (let i = 0; i < result.length; i++) {

          const price = await nftDealContract.methods.getNftTokenPrice(result[i]).call({from:account})
          console.log("가격",web3.utils.fromWei(price,"ether"))
          await axios.get(`${baseUrl}${process.env.REACT_APP_METADATA_HASH}/${result[i]}.json`).then(metadata=>{
            salenft.push({
              data: metadata.data,
              image:`${baseUrl}${metadata.data.image.slice(6)}`,
              tokenId: result[i],
              price:web3.utils.fromWei(price,"ether")
            })
          })
        }
        setSaleNft(salenft)
      })
      
    } catch (error) {
    }  
  }, [account])
  

  return (
    <>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5}>
        왼쪽바 <br />  메뉴(아이템/nft)  / 필터       
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={5} rowSpan={5}>
          <Text align="left">{saleLength} Nfts</Text>
        <Grid templateColumns="repeat(4, 1fr)" ml="5" gap={10} padding="5">
          {saleNft[0] && saleNft.map((nft,i)=>{
            return (
              <Box w="300px" h="500" bg="blackAlpha.300" key={i} border="2px solid #2E8F8B" _hover={{boxShadow:'dark-lg' }}>
                    <Image src={nft.image} w="320" h="290" padding="5"/>
                    <Flex h="15%" justify="space-between">
                      <Box>
                       {nft.data.name}
                      </Box>
                      <Box borderRadius="30">{nft.data.grade}</Box> 
                    </Flex>
                    <Text align="left">
                    {nft.data.price}
                    </Text>
                    <Text>
                    {nft.price} ETH
                    </Text>
                    <Box h="10%" mt="30">
                      <Link to={nft.tokenId} state={{nftInfo:saleNft[i]}}>
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
    </>
  );
};

export default Market_nft;
