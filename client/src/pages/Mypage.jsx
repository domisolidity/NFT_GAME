import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { Flex, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import NetworkCard from "../components/NetworkCard";
import InventoryCard from "../components/InventoryCard";
import MyNftsCard from "../components/MyNftsCard";
import NftDetail_my from "./MyPage/NftDetail";


const Mypage = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract, auth } = blockchain;
  // const { myNfts } = data;
  const [myNfts, setMyNfts] = useState({
    id:null,
    name:null,
    image:null,
    description:null
  })

  const baseUri = "http://127.0.0.1:8080/ipfs";

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

  const getMyNfts = async() =>{
    await nftContract.methods.getMyToken(account).call({from:account}).then(async(result)=>{
      console.log("getMyToken",result)
      let mynfts = [];

      for (const info of result) {
        if(info.uri == "") continue;
        const response = await axios.get( `${baseUri}${info.uri.slice(6)}/${info.id}.json`)
        console.log(response.data)
        mynfts.push({
          id: info.id,
          grade: response.data.grade,
          attributes: response.data.attributes,
          name: response.data.name,
          image: `${baseUri}${response.data.image.slice(6)}`,
          description: response.data.description,
        })
      }
      console.log("myNft", mynfts);
      setMyNfts(mynfts)
    })
  }

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
    getMyNfts();
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
                      <Link  to={mynft.id} state={{nftInfo:myNfts[index]}}>  
                        <MyNftsCard
                          img={mynft.image}
                          name={mynft.name}
                          description={mynft.description}
                          />              
                      </Link>
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
