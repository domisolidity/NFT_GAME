import React, { useEffect, useState } from "react";
import { Flex, Grid, GridItem, Text, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NetworkCard from "../../components/NetworkCard";
import ProfileCard from "../../components/ProfileCard";
import Inventory from '../../components/Inventory'
import Collections from "../../components/Collections";

const Mypage = () => {
  const [menu, setMenu] = useState("items");

  useEffect(() => {
    returnMenu(menu);
  }, [menu]);

  const returnMenu = (display) => {
    switch (display) {
      case "items":
        return <Inventory />
      case "nfts":
        return <Collections />
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
        templateRows="repeat(5, minmax(10rem,1rem))" //세로
        templateColumns="repeat(7, minmax(11rem,1rem))" //가로
        gap={1}
      >
        <GridItem bg="whiteAlpha.100" borderRight={"solid 0.1rem"} colSpan={1} rowSpan={7}>
          <ProfileCard />
          <Flex flexDir={"column"}>
            <Button onClick={renderItems} m={3}>아이템</Button>
            <Button onClick={renderNfts} m={3}>NFT</Button>
          </Flex>
        </GridItem>

        <GridItem colSpan={2} rowSpan={1}>
          <NetworkCard />
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