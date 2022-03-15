import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Input,
  Image,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const NftTransfer = (props) => {
  const { account, nftContract } = props.toTransferJSX;
  const [ToAddr, setToAddr] = useState();
  const [nft, setNft] = useState({
    id: null,
    uri: null,
    metadata: null,
  });
  const [renderNft, setRenderNft] = useState({
    name: null,
    image: null,
    description: null,
  });

  const baseUri = "https://ipfs.infura.io/ipfs";

  // @ nft 선물하기
  const transferMyNft = async (toAddr) => {
    // ## toAddr 잘못되면 에러 메세지 날리기
    await nftContract.methods
      .safeTransferFrom(account.toString(), toAddr, nft.id)
      .send({ from: account.toString() })
      .then((result) => {
        console.log(result);
      });
  };

  // @ my Nft 찾기(detail) (getMyNft 정보 참조해서 사용하는 함수)
  const getMyNftDetail = async () => {
    try {
      await axios.get(`${nft.metadata}`).then((metadatafile) => {
        setRenderNft({
          name: metadatafile.data.name,
          image: `${baseUri}${metadatafile.data.image.slice(6)}`,
          description: metadatafile.data.description,
        });
        console.log(metadatafile);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(async () => {
  //   if (!account) {
  //     return false;
  //   }
  //   console.log("불러오기");
  //   await getMyNft();
  // }, [account]);

  useEffect(async () => {
    if (!account) {
      return false;
    }
    console.log("불러오기2");
    await getMyNftDetail();
  }, [nft.metadata]);

  return (
    <Grid
      justify="space-evenly"
      w={1000}
      h={550}
      gap={10}
      mt={10}
      templateColumns="repeat(5,1fr)"
    >
      <GridItem colSpan="2" bg="whiteAlpha.400" borderRadius="30">
        {/* w="450" h="550" */}myNFT
        {renderNft.name ? (
          <Image w="90%" h="65%" src={renderNft.image} borderRadius={30} />
        ) : (
          <Text>보유 nft가 없습니다.</Text>
        )}
      </GridItem>
      <GridItem colSpan="3" bg="whiteAlpha.400" borderRadius="30">
        Transfer
        <Flex justify="space-evenly">
          <Text lineHeight={10}>보낼 주소</Text>
          <Input
            placeholder="from"
            variant="outline"
            borderRadius="30"
            w="70%"
            onChange={(e) => setToAddr(e.target.value)}
          />
        </Flex>
        <Button onClick={() => transferMyNft(ToAddr)}>선물 보내기</Button>
      </GridItem>
    </Grid>
  );
};

export default NftTransfer;
