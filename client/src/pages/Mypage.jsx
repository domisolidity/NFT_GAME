import React, { useEffect, useState } from "react";
import { Link,Route,Routes ,Outlet} from "react-router-dom";
import { Button, Flex, Grid, GridItem, Image, Text, Box } from "@chakra-ui/react";
import { useSelector,useDispatch } from "react-redux";
import { getMyNft } from "../redux/data/dataActions";
import axios from "axios";
import NetworkCard from "../components/NetworkCard";
import InventoryCard from "../components/InventoryCard";
import MyNftsCard from "../components/MyNftsCard";
import NftDetail_my from "./MyPage/NftDetail";
// import NftSell from "./MyPage/NftSell";
const Mypage = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const { web3, account, nftContract, auth } = blockchain;
  const { myNfts } = data;


  // 게임 아이템 목록
  const [gameItems, setGameItems] = useState([]);
  const [ethBalance, setEthBalance] = useState("");


  //잔액
  const getEthBalance = async (account) => {
    console.log(account)
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
    if (!account ) return false;
    console.log(account)
    getEthBalance(account);
    getGameItems();
    dispatch(getMyNft(account))
  }, [account]);
      
      
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
                  <Box key={index}>
                    <InventoryCard
                      // img={item.img}
                      itemName={item.itemName}
                      itemDescription={item.itemDescription}
                    />
                  </Box>
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
            {myNfts && myNfts[0] ? (
              <>
                {myNfts.map((mynft, index) => {
                  
                  return (    
                    <Box key={index}>
                      <Link  to={mynft.id} state={{img:mynft.image, name:mynft.name, description:mynft.description}}>  
                      <MyNftsCard
                        img={mynft.image}
                        name={mynft.name}
                        description={mynft.description}
                        />              
                    </Link>
                      {/* <Routes>
                        <Route path=":id"  element={<NftDetail_my img={mynft.image} name={mynft.name} description={mynft.description} />}/>
                      </Routes> */}
                    {/* <Outlet/> */}
                    </Box> 
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
