import React from 'react'
import { Box, Heading, Flex, Button ,Text} from "@chakra-ui/react";

import NftCard from '../../components/NftCard';
import Loader from '../../components/Loader';

const NftMint = (props) => {
    const {loading,remainNft,renderNft,minting} = props.toMintJSX;
    
    return (
    <Flex align="center" direction="column">
        <Text textAlign="center"> 남은 수량 : {remainNft} / 50</Text>
        <Box mt={6}>
          {loading 
          ? 
            <Box align="center" w="450" h="550">
              <Loader />
            </Box>
          : 
            <NftCard nftInfo={renderNft} loading={loading}/>
          }
        </Box>
        <Box>
          <Button 
            disabled={loading? 1:0} 
            w={200}   
            loadingText='Minting..'
            colorScheme='teal'
            variant='solid' 
            onClick={minting}>
            MINT
          </Button>
        </Box>
      </Flex>
  )
}

export default NftMint