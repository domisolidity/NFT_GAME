import React from 'react'
import { Box, Flex,} from "@chakra-ui/react";

import NftCard from '../../components/NftCard';

const NftMint = () => {
        return (
        <Box mt={6}>
            <Flex justify="space-around" w="70vw">
            <NftCard />
            </Flex>
        </Box>

  )
}

export default NftMint