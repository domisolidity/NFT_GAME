import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Grid, GridItem, Text, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import NetworkCard from "../../components/NetworkCard";

import MyNftsCard from "../../components/MyNftsCard";

import ProfileCard from "../../components/ProfileCard";
import Inventory from '../../components/Inventory'
const Mypage = () => {
  const blockchain = useSelector((state) => state.blockchain);
  console.log("blockchain", blockchain)
  const { web3, account, nftContract } = blockchain;
  // const { myNfts } = data;
  const [myNfts, setMyNfts] = useState({
    id: null || "",
    metadata: null || "",
    // name: null || "",
    // image: null || "",
    // description: null || ""
  })
  console.log("📌 nftContract", nftContract)
  //console.log("📌 web3", web3.eth)
  console.log("📌 myNfts", myNfts)
  const baseUri = "http://127.0.0.1:8080/ipfs";

  // 게임 아이템 목록
  const [gameItems, setGameItems] = useState([]);

  const [menu, setMenu] = useState("items");

  console.log(gameItems)



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
        console.log("myNft", myNfts);
        setMyNfts(myNfts)
      })
  }

  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`/api/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(async () => {
    if (!account) return false;
    await getGameItems();
    await getMyNfts();
  }, [account]); //account

  useEffect(() => {
    returnMenu(menu);
  }, [menu]);

  const returnMenu = (display) => {
    //가로 세로 : 6 5
    switch (display) {
      case "items":
        return (
          <Inventory />

        );
      case "nfts":
        return (
          <>
            <Box fontSize={"1.5rem"} fontWeight="bold">My Nfts</Box>
            <Flex flexDir={"row"}>
              {myNfts[0] ? (
                <>
                  {myNfts.map((mynft, index) => {
                    return (
                      <>
                        <MyNftsCard
                          key={index}
                          img={mynft.image}
                          name={mynft.name}
                          description={mynft.description}
                        />
                      </>
                    );
                  })}
                </>
              ) : (
                <Text>보유 nft가 없습니다.</Text>
              )}
            </Flex>
          </>
        );
      default:
        break;
    }
  };

  const renderItems = (e) => {
    e.preventDefault();
    setMenu("items");
  };
  const renderNfts = (e) => {
    e.preventDefault();
    setMenu("nfts");
  };


  return (
    <>
      <Grid
        height="85vh"
        padding="0 4vw"
        templateRows="repeat(5, minmax(9rem,1rem))" //세로
        templateColumns="repeat(7, minmax(9rem,1rem))" //가로
        gap={1}
      >
        <GridItem bg="whiteAlpha.100" borderRight={"solid 0.1rem"} colSpan={1} rowSpan={7}>
          <ProfileCard />
          <Flex flexDir={"column"}>
            <Button onClick={renderItems} m={3}>아이템</Button>
            <Button onClick={renderNfts} m={3}>NFT</Button>
          </Flex>
        </GridItem>

        <GridItem colSpan={2} rowSpan={1} border="1px solid white">
          <NetworkCard
          />
        </GridItem>
        {/* <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={2}>
          지갑
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={2} rowSpan={2}>
          현재등수?
        </GridItem> */}
        <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={6}>
          {returnMenu(menu)}
        </GridItem>
      </Grid>
    </>
  );
};

export default Mypage;