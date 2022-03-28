import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import MyNftsCard from "../components/MyNftsCard";

const Collections = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const { account, nftContract } = blockchain;
  // const { myNfts } = data;
  const [myNfts, setMyNfts] = useState({
    id: null || "",
    metadata: null || "",
    // name: null || "",
    // image: null || "",
    // description: null || ""
  });

  const baseUri = "http://127.0.0.1:8080/ipfs";

  const getMyNfts = async () => {
    await nftContract.methods
      .getMyToken(account.toString())
      .call({ from: account.toString() })
      .then(async (result) => {
        console.log("getMyNft");
        let myNfts = [];
        for (const info of result) {
          if (info.uri == "") continue;
          const response = await axios.get(
            `${baseUri}${info.uri.slice(6)}/${info.id}.json`
          );
          myNfts.push({
            id: info.id,
            name: response.data.name,
            image: `${baseUri}${response.data.image.slice(6)}`,
            description: response.data.description,
          });
        }
        setMyNfts(myNfts);
      });
  };

  useEffect(async () => {
    if (!account) return false;
    await getMyNfts();
  }, [account]);

  return (
    <>
      <Box fontSize={"1.5rem"} fontWeight="bold">
        My Nfts
      </Box>
      <Flex flexDir={"row"}>
        {myNfts[0] ? (
          <>
            {myNfts.map((mynft, index) => {
              return (
                <MyNftsCard
                  key={index}
                  img={mynft.image}
                  name={mynft.name}
                  description={mynft.description}
                />
              );
            })}
          </>
        ) : (
          <Text>보유 nft가 없습니다.</Text>
        )}
      </Flex>
    </>
  );
};

export default Collections;
