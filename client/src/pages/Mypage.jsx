import React, { useEffect, useState } from "react";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import NetworkCard from "../components/networkCard/NetworkCard";
import InventoryCard from "../components/inventoryCard/InventoryCard";
import { useDispatch, useSelector } from "react-redux";

const Mypage = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  console.log(data);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [NFTS, setNFTS] = useState([]);

  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";

  const { web3, account, nftContract, auth } = blockchain;
  const [ethBalance, setEthBalance] = useState("");

  const getEthBalance = async (account) => {
    let balance;
    await web3.eth.getBalance(account).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };

  const fetchMetaDataForNFTS = () => {
    setNFTS([]);
    data.getAllTokens.forEach((nft) => {
      fetch(nft.uri)
        .then((response) => response.json())
        .then((metaData) => {
          setNFTS((prevState) => [
            ...prevState,
            { id: nft.id, metaData: metaData },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    if (data) {
      return;
    }
    fetchMetaDataForNFTS();
  }, [data.getAllTokens]);

  useEffect(() => {
    if (!account) {
      return false;
    }
    getEthBalance(account);
  }, [account]);

  return (
    <Grid
      height="85vh"
      padding="0 4vw"
      templateRows="repeat(5, 1fr)" //세로
      templateColumns="repeat(7, 1fr)" //가로
      gap={4}
    >
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={5}>
        사이드 바 <br />
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
          {items.map((item, index) => (
            <InventoryCard
              key={index}
              img={item.img}
              type={item.type}
              amount={item.amount}
              description={item.description}
            />
          ))}
        </Flex>
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={6} rowSpan={2}>
        내 Nfts
        <Flex flexDir={"row"}>
          {nfts.map((nfts, index) => (
            <InventoryCard
              key={index}
              img={nfts.img}
              type={nfts.type}
              amount={nfts.amount}
              description={nfts.description}
            />
          ))}
        </Flex>
        <>
          {/* <Image mt={6} w={300} h={300} src={image} borderRadius={30} /> */}
          <Flex ml="5" flexDir="column">
            <Text> name </Text>
            <Text>description </Text>
          </Flex>
        </>
      </GridItem>
    </Grid>
  );
};

const items = [
  {
    img: "../../src/assets/burneth.png",
    amount: "1",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "2",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "3",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "4",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
];
const nfts = [
  {
    img: "../../src/assets/burneth.png",
    amount: "1",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "2",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "3",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
  {
    img: "../../src/assets/burneth.png",
    amount: "4",
    type: "물",
    description: "설명란입니다. 각종 효과 및 특징을 알 수 있습니다.",
  },
];

export default Mypage;
