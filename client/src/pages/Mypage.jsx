import React, { useEffect, useState } from "react";
import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import NetworkCard from "../components/NetworkCard";
import InventoryCard from "../components/InventoryCard";
import { useSelector } from "react-redux";
import axios from "axios";
import MyNftsCard from "../components/MyNftsCard";

const Mypage = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const baseUri = "https://ipfs.infura.io/ipfs";
  const Uri = "http://127.0.0.1:8080/ipfs";

  // 게임 아이템 목록
  const [gameItems, setGameItems] = useState([]);

  const { web3, account, nftContract, auth } = blockchain;
  const [ethBalance, setEthBalance] = useState("");
  const [nft, setNft] = useState({
    id: null,
    metadata: null,
  });

  //잔액
  const getEthBalance = async (account) => {
    let balance;
    await web3.eth.getBalance(account).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };

  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`/api/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(() => {
    if (!account) {
      return false;
    }
    getEthBalance(account);
    getGameItems();
  }, [account]);

  ///////////////////////

  // 내 nft 가져오기
  const getMyNft = async () => {
    await nftContract.methods
      .getMyToken()
      .call({ from: account })
      .then(async (result) => {
        console.log("getMyNft");
        let myNfts = [];
        for (const info of result) {
          if (info.uri == "") continue;
          const response = await axios.get(
            `${Uri}${info.uri.slice(6)}/${info.id}.json`
          );
          myNfts.push({
            id: info.id,
            name: response.data.name,
            image: response.data.image,
            // image: `${Uri}${response.data.image.slice(6)}`,
            description: response.data.description,
          });
          console.log(response);
        }
        console.log("myNft", myNfts);
        setNft(myNfts);
      });
  };

  useEffect(async () => {
    if (!account) {
      return false;
    }
    console.log(typeof nft);
    console.log("불러오기");
    await getMyNft();
  }, [account]);

  useEffect(async () => {
    if (!account || nft == undefined) return false;
    console.log("불러오기2");
    await getMyNft();
  }, [nft.id]);

  return (
    <>
      <Grid
        height="85vh"
        padding="0 4vw"
        templateRows="repeat(5, 1fr)" //세로
        templateColumns="repeat(7, 1fr)" //가로
        gap={4}
      >
        <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5}>
          사이드바 <br />
          [카테고리 EX] <br />
          메인:(네트워크 연결+지갑+인벤토리) <br />
          nft:(판매중 Nft + 찜한 Nft) <br />
          정보 수정 등등
        </GridItem>

        <GridItem bg="whiteAlpha.100" colSpan={2}>
          네트워크
          <NetworkCard
            ethBalance={ethBalance}
            auth={auth}
            getEthBalance={getEthBalance}
          />
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={2}>
          지갑
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={2}>
          현재등수?
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={2}>
          내 인벤토리
          <Flex flexDir={"row"}>
            {gameItems[0] &&
              gameItems.map((item, index) => {
                return (
                  <InventoryCard
                    key={index}
                    // img={item.img}
                    itemName={item.itemName}
                    itemDescription={item.itemDescription}
                  />
                );
              })}
          </Flex>
          {/* <Flex flexDir={"row"}>
            {gameItems[0] ? (
              <>
                {gameItems.map((item, index) => {
                  return (
                    <>
                      <InventoryCard
                        key={index}
                        // img={item.img}
                        itemName={item.itemName}
                        itemDescription={item.itemDescription}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <Text>보유 아이템이 없습니다.</Text>
            )}
          </Flex> */}
        </GridItem>
        <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={2}>
          내 Nfts
          <Flex flexDir={"row"}>
            {nft[0] ? (
              <>
                {nft.map((mynft, index) => {
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
        </GridItem>
      </Grid>
    </>
  );
};

export default Mypage;
