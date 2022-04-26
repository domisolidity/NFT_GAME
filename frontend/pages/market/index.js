import React, { useState, useEffect } from "react";
import { Grid, Button, Flex, Box, Text, useBreakpointValue, useColorModeValue, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Market_nft from "../../components/market/nft/Market_nft";
import Market_item from "../../components/market/item/Market_item";
import Market_nft_auction from "../../components/market/auction/Market_nft_auction";
import { useSelector } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import SubMenuList from "../../components/Menu/SubMenuList";

const Market = () => {
  const [selectedSubMenu, setSelectedSubMenu] = useState("ITEM");

  const txtColor = useColorModeValue("gray.600", "white")

  const titleKeyframes = keyframes`
  0% { opacity: 0; transform: translateX(-100px); }
  100% { opacity: 1; transform: translateX(0); }
  `;
  const subMenuKeyframes = keyframes`
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
  `;
  const slideInTitle = `${titleKeyframes} 0.5s ease-out 0s forwards`;
  const slideInSubMenu = `${subMenuKeyframes} 0.3s linear 0.2s forwards`;

  const getSelectedSubMenu = (e) => {
    setSelectedSubMenu(e.target.value);
  };

  useEffect(() => {
    returnMenu(selectedSubMenu);
  }, [selectedSubMenu]);


  const returnMenu = (display) => {
    switch (display) {
      case "ITEM":
        return <Market_item as={motion.div} />;
      case "NFT":
        return <Market_nft as={motion.div} />;
      case "AUCTION":
        return <Market_nft_auction as={motion.div} />;
      default:
        break;
    }
  };

  const menuList = ["ITEM", "NFT", "AUCTION"]

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }} align="center">
      <Box
        opacity={'0'}
        as={motion.div}
        animation={slideInTitle}
      >
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
          Explore Market 🛒
        </Text>
      </Box>
      <Box mt={10} w='100%'>
        <SubMenuList
          as={motion.div}
          slideInSubMenu={slideInSubMenu}
          subMenu={menuList}
          getSelectedSubMenu={getSelectedSubMenu}
        />
        {returnMenu(selectedSubMenu)}
      </Box>
    </Flex >
  );
};

export default Market;

// getLayout property
Market.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
