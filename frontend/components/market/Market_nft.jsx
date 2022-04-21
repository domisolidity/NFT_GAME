import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  GridItem,
  Checkbox,
  Flex,
  Image,
  Button,
  Text,
  useColorModeValue,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
// import FilterNft from "./market/nft/FilterNft";

const Market_nft = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftDealContract } = blockchain;

  const [saleLength, setSaleLength] = useState(0);
  const [saleNft, setSaleNft] = useState({
    data: null,
    tokenId: null,
  });
  const [checkedGrade, setCheckedGrade] = useState();
  const [checkedTrigger, setCheckedTrigger] = useState({
    red: true,
    green: true,
    purple: true,
  });
  const [checkedTrigger_price, setCheckedTrigger_price] = useState({
    one: true,
    two: true,
    three: true,
    four: true,
    five: true,
  });

  const baseUrl = "http://127.0.0.1:8080/ipfs/";

  useEffect(() => {
    // if (checkedGrade == 1) return;
    console.log(checkedGrade);
    console.log(checkedTrigger);
  }, [checkedTrigger]);

  useEffect(async () => {
    try {
      if (!account) return;

      console.log("이벤트촐력할곳");

      await nftDealContract.methods
        .getOnSaleNftArray()
        .call({ from: account })
        .then(async (result) => {
          console.log(result);
          setSaleLength(result.length);
          const salenft = [];
          for (let i = 0; i < result.length; i++) {
            const price = await nftDealContract.methods
              .getNftTokenPrice(result[i])
              .call({ from: account });
            console.log("가격", web3.utils.fromWei(price, "ether"));
            await axios
              .get(
                `${baseUrl}${process.env.NEXT_PUBLIC_METADATA_HASH}/${result[i]}.json`
              )
              .then((metadata) => {
                salenft.push({
                  name: metadata.data.name,
                  description: metadata.data.description,
                  grade: metadata.data.grade,
                  attributes: metadata.data.attributes,
                  image: `${baseUrl}${metadata.data.image.slice(6)}`,
                  tokenId: result[i],
                  price: web3.utils.fromWei(price, "ether"),
                });
              });
          }
          setSaleNft(salenft);
        });
    } catch (error) {}
  }, [account]);

  const txtColor = useColorModeValue("gray.600", "white");
  const txt2ndColor = useColorModeValue("white", "white");
  const redColor = useColorModeValue("red.600", "red.700");
  const greenColor = useColorModeValue("green.600", "green.700");
  const purpleColor = useColorModeValue("purple.600", "purple.700");

  return (
    <>
      <Center py={6}>
        <Flex align="center">
          <SimpleGrid columns={{ md: 1, xl: 2 }}>
            <Flex ml="1.5vw" direction="row">
              <Text
                fontSize="20"
                align="left"
                p="5"
                fontWeight="extrabold"
                color={txtColor}
                m={"0 20px"}
              >
                grade
              </Text>
              <Checkbox
                colorScheme="teal"
                defaultChecked
                value="red"
                onChange={() => {
                  setCheckedTrigger({
                    red: !checkedTrigger.red,
                    green: checkedTrigger.green,
                    purple: checkedTrigger.purple,
                  });
                }}
              >
                <Text
                  p="5px 15px"
                  bg={redColor}
                  borderRadius="10"
                  mr={6}
                  color={txt2ndColor}
                >
                  red
                </Text>
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                mt="1"
                defaultChecked
                onChange={() => {
                  setCheckedTrigger({
                    red: checkedTrigger.red,
                    green: !checkedTrigger.green,
                    purple: checkedTrigger.purple,
                  });
                }}
              >
                <Text
                  p="5px 15px"
                  bg={greenColor}
                  borderRadius="10"
                  mr={6}
                  color={txt2ndColor}
                >
                  green
                </Text>
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                mt="1"
                defaultChecked
                onChange={() => {
                  setCheckedTrigger({
                    red: checkedTrigger.red,
                    green: checkedTrigger.green,
                    purple: !checkedTrigger.purple,
                  });
                }}
              >
                <Text
                  p="5px 15px"
                  bg={purpleColor}
                  borderRadius="10"
                  mr={6}
                  color={txt2ndColor}
                >
                  purple
                </Text>
              </Checkbox>
            </Flex>
            <Flex ml="1.5vw" direction="row" w={"700px"}>
              <Text
                fontSize="20"
                align="left"
                p="5"
                fontWeight="extrabold"
                color={txtColor}
                m={"0 20px"}
              >
                price(eth)
              </Text>
              <Checkbox
                colorScheme="teal"
                fontWeight="bold"
                color={txtColor}
                mr={5}
                defaultChecked
                onChange={() => {
                  setCheckedTrigger_price({
                    one: !checkedTrigger_price.one,
                    two: checkedTrigger_price.two,
                    three: checkedTrigger_price.three,
                    four: checkedTrigger_price.four,
                    five: checkedTrigger_price.five,
                  });
                }}
              >
                ~ 0.5
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                fontWeight="bold"
                color={txtColor}
                mr={5}
                defaultChecked
                onChange={() => {
                  setCheckedTrigger_price({
                    one: checkedTrigger_price.one,
                    two: !checkedTrigger_price.two,
                    three: checkedTrigger_price.three,
                    four: checkedTrigger_price.four,
                    five: checkedTrigger_price.five,
                  });
                }}
              >
                0.5 ~ 1.0
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                fontWeight="bold"
                color={txtColor}
                mr={5}
                defaultChecked
                onChange={() => {
                  setCheckedTrigger_price({
                    one: checkedTrigger_price.one,
                    two: checkedTrigger_price.two,
                    three: !checkedTrigger_price.three,
                    four: checkedTrigger_price.four,
                    five: checkedTrigger_price.five,
                  });
                }}
              >
                1.0 ~ 2.0
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                fontWeight="bold"
                color={txtColor}
                mr={5}
                defaultChecked
                onChange={() => {
                  setCheckedTrigger_price({
                    one: checkedTrigger_price.one,
                    two: checkedTrigger_price.two,
                    three: checkedTrigger_price.three,
                    four: !checkedTrigger_price.four,
                    five: checkedTrigger_price.five,
                  });
                }}
              >
                2.0 ~ 4.0
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                fontWeight="bold"
                color={txtColor}
                mr={5}
                defaultChecked
                onChange={() => {
                  setCheckedTrigger_price({
                    one: checkedTrigger_price.one,
                    two: checkedTrigger_price.two,
                    three: checkedTrigger_price.three,
                    four: checkedTrigger_price.four,
                    five: !checkedTrigger_price.five,
                  });
                }}
              >
                4.0 ~
              </Checkbox>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Center>

      <SimpleGrid columns={{ sm: 1, md: 4, xl: 4 }} spacing="24px">
        <Text align="left">{saleLength} Nfts</Text>
        {saleNft[0] &&
          saleNft
            .filter((nft) => {
              if (
                (checkedTrigger.red === true ? nft.grade == "red" : false) ||
                (checkedTrigger.green === true
                  ? nft.grade == "green"
                  : false) ||
                (checkedTrigger.purple === true ? nft.grade == "purple" : false)
              )
                return true;

              // return nft.grade == "red" || nft.grade == "green";
            })
            .filter((nft) => {
              if (
                (checkedTrigger_price.one === true ? nft.price < 0.5 : false) ||
                (checkedTrigger_price.two === true
                  ? nft.price >= 0.5 && nft.price < 1.0
                  : false) ||
                (checkedTrigger_price.three === true
                  ? nft.price >= 1.0 && nft.price < 2.0
                  : false) ||
                (checkedTrigger_price.four === true
                  ? nft.price >= 2.0 && nft.price < 4.0
                  : false) ||
                (checkedTrigger_price.five === true ? nft.price >= 4.0 : false)
              )
                return true;
            })
            .map((nft, i) => {
              return (
                <Box
                  w="300px"
                  h="460"
                  bg="blackAlpha.300"
                  key={i}
                  border="2px solid #2E8F8B"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Image src={nft.image} w="320" h="290" padding="5" />
                  <Flex p="0px 20px 0px 20px" mb="8%" justify="space-between">
                    <Box>{nft.name}</Box>
                    <Box
                      w="26%"
                      borderRadius={20}
                      bg={
                        nft.grade == "red"
                          ? "red.700"
                          : nft.grade == "green"
                          ? "green.700"
                          : "purple.700"
                      }
                      padding={1}
                      align="center"
                    >
                      {nft.grade}
                    </Box>
                  </Flex>
                  <Text fontSize="20px">{nft.price} ETH</Text>
                  <Box h="10%" mt="25">
                    <Link
                      href={{
                        pathname: `market/${nft.tokenId}`,
                        query: {
                          id: nft.tokenId,
                          grade: nft.grade,
                          attr: JSON.stringify(nft.attributes),
                          name: nft.name,
                          image: nft.image,
                          description: nft.description,
                          price: nft.price,
                        },
                      }}
                      as={`market/${nft.tokenId}`}
                    >
                      <a>
                        <Button bg="#247471">Buy now</Button>
                      </a>
                    </Link>
                  </Box>
                </Box>
              );
            })}
      </SimpleGrid>
    </>
  );
};

export default Market_nft;
