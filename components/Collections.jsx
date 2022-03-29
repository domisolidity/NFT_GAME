import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import MyNftsCard from "../components/MyNftsCard";
import Link from "next/link";

const Collections = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const { account, nftContract } = blockchain;
  // const { myNfts } = data;
  const [myNfts, setMyNfts] = useState({
    id: null || "",
    name: null || "",
    image: null || "",
    description: null || "",
    grade: null || "",
    attributes: null || "",
  });

  const baseUri = "http://127.0.0.1:8080/ipfs";

  const getMyNfts = async () => {
    try {
      await nftContract.methods
        .getMyToken(account)
        .call({ from: account })
        .then(async (result) => {
          console.log("getMyToken", result);
          let mynfts = [];
          if (!result) return true;
          for (const info of result) {
            if (info.uri == "") continue;
            const response = await axios.get(
              `${baseUri}${info.uri.slice(6)}/${info.id}.json`
            );
            console.log(response.data);
            mynfts.push({
              id: info.id,
              grade: response.data.grade,
              attributes: response.data.attributes,
              name: response.data.name,
              image: `${baseUri}${response.data.image.slice(6)}`,
              description: response.data.description,
            });
          }
          // console.log("myNft", mynfts);
          setMyNfts(mynfts);
        });
    } catch (error) {
      console.error();
    }
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
                <Box key={index}>
                  <Link
                    href={{
                      pathname: `mypage/${mynft.id}`,
                      query: {
                        id: mynft.id,
                        grade: mynft.grade,
                        attributes: mynft.attributes,
                        name: mynft.name,
                        image: mynft.image,
                        description: mynft.description,
                      },
                    }}
                    as={`mypage/${mynft.id}`}
                  >
                    {/* id, grade, attributes, name, image, description */}
                    <a>
                      <MyNftsCard
                        img={mynft.image}
                        name={mynft.name}
                        description={mynft.description}
                      />
                    </a>
                  </Link>
                </Box>
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
