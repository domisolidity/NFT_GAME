import React, { useState, useEffect } from "react";
import { Grid, Button, Flex, Box, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

import Market_nft from "../../components/Market_nft";
import Market_item from "../../components/Market_item";
import Market_nft_auction from "../../components/market/Market_nft_auction";
import { useSelector } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import SubMenuList from "../../components/Menu/SubMenuList";

const Market = () => {
  const [selectedSubMenu, setSelectedSubMenu] = useState("ITEM");

  const txtColor = useColorModeValue("gray.600", "white")

  const getSelectedSubMenu = (e) => {
    setSelectedSubMenu(e.target.value);
  };

  useEffect(() => {
    returnMenu(selectedSubMenu);
  }, [selectedSubMenu]);


  const returnMenu = (display) => {
    switch (display) {
      case "ITEM":
        return <Market_item />;
      case "NFT":
        return <Market_nft />;
      case "AUCTION":
        return <Market_nft_auction />;
      default:
        break;
    }
  };

  const menuList = ["ITEM", "NFT", "AUCTION"]

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }} align="center">
      <Box>
        <Text
          fontSize={"5rem"}
          as={'span'}
          position={'relative'}
          color={txtColor}
          _after={{
            content: "''",
            width: 'full',
            height: useBreakpointValue({ base: '20%', md: '30%' }),
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: 'teal.400',
            zIndex: -1,
          }}
        >
          Explore Market
        </Text>
      </Box>
      <SubMenuList subMenu={menuList} getSelectedSubMenu={getSelectedSubMenu} />
      {returnMenu(selectedSubMenu)}
    </Flex >
  );
};

export default Market;

// getLayout property
Market.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
