import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
import Tier from "../../components/nft/Tier";
import NftTransfer from "../../components/NftTransfer";
import NftMint from "../../components/NftMint";
import { useSelector, useDispatch } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
const Nft = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

  const [MintOrTransfer, setMintOrTransfer] = useState(false);
  const [myNftAmount, setMyNftAmount] = useState(0);

  useEffect(async () => {
    if (!account) return;
    await nftContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((res) => {
        setMyNftAmount(res);
      });
  }, [account]);
  return (

    <Box align="center" pb={20} pt={{ base: "120px", md: "75px" }}>
      <Tier />
      <Box w="400px" mb={70}>
        <Text mt="150" fontSize="25" w="200px">
          <span>NFT 구매</span>
        </Text>
        <Text>
          <span className="small">{myNftAmount} / 3</span> <br />
          (민팅 Nft 수량)
        </Text>
      </Box>

      <NftMint myNftAmount={myNftAmount} />
      <style jsx>{`
        span {
          font-size: 35px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }

        .small {
          font-size: 20px;
        }
      `}</style>
    </Box>
  );
};

export default Nft;

// getLayout property
Nft.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
