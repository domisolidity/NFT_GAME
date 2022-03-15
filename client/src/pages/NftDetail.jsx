import React from "react";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NftCard from "../components/NftCard";
import nftImg from "../images/123.jpg";
import { create } from "ipfs-http-client";
import imageToBase64 from "image-to-base64";

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

const NftDetail = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

  const name = "doremifaSolidity-purple";
  const description = "IPFS minted nft woooooo.";
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";

  const mintingProcess = async (e) => {
    e.preventDefault();
    await createMetaDataAndMint(name, description, getImageData());
  };

  const getImageData = () => {
    const img = new Buffer.from(nftImg);
    console.log(img);
    return img;
  };

  const createMetaDataAndMint = async (_name, _des, _imgBuffer) => {
    // setLoading(true);
    // setStatus("Uploading to IPFS");
    try {
      const addedImage = await ipfsClient.add(_imgBuffer);
      const metaDataObj = {
        name: _name,
        description: _des,
        image: ipfsBaseUrl + addedImage.path,
      };
      const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
      console.log(ipfsBaseUrl + addedMetaData.path);
      mint(ipfsBaseUrl + addedMetaData.path);
    } catch (err) {
      console.log(err);
      // setLoading(false);
      // setStatus("Error");
    }
  };

  const mint = (_uri) => {
    console.log(nftContract);
    nftContract.methods
      .mint(account, _uri)
      .send({ from: account })
      .once("error", (err) => {
        console.log(err);
        // setLoading(false);
        // setStatus("Error");
      })
      .then((receipt) => {
        console.log(receipt);
        // setLoading(false);
        // dispatch(fetchData(account));
        // setStatus("Successfully minting your NFT");
      });
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={5}>
      <GridItem colSpan={2} bg="tomato" h="500px">
        <NftCard />
        <Button onClick={mintingProcess}>민팅</Button>
      </GridItem>
      <GridItem colSpan={4} bg="tomato" h={"100%"}>
        <Box h={1200}></Box>
        <Box h={1200}>b</Box>
      </GridItem>
    </Grid>
  );
};

export default NftDetail;
