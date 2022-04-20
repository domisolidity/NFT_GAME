import React, { useState, useEffect } from "react";
import { Grid, Button } from "@chakra-ui/react";

import Market_nft from "../../components/Market_nft";
import Market_item from "../../components/Market_item";
import Market_nft_auction from "../../components/market/Market_nft_auction";
import { useSelector } from "react-redux";

const Market = () => {
  const [menu, setMenu] = useState("items");

  useEffect(() => {
    returnMenu(menu);
  }, [menu]);
  const returnMenu = (display) => {
    switch (display) {
      case "items":
        return <Market_item />;
      case "nfts":
        return <Market_nft />;
      case "auction":
        return <Market_nft_auction />;
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
  const renderAuction = (e) => {
    e.preventDefault();
    setMenu("auction");
  };

  return (
    <>
      <Button onClick={renderItems} m={4}>
        ITEM
      </Button>
      <Button onClick={renderNfts} m={4}>
        NFT
      </Button>
      <Button onClick={renderAuction} m={4}>
        AUCTION
      </Button>
      <Grid
        mt="2%"
        h="85%"
        padding="0"
        templateRows="repeat(6, 1fr)" //세로
        templateColumns="repeat(6, 1fr)" //가로
        align="center"
        gap={1}
      >
        {returnMenu(menu)}
      </Grid>
    </>
  );
};

export default Market;
