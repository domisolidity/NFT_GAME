// Chakra imports
import { Box, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from "../../components/Icons/Icons";
import MiniStatus from "../../components/Home/MiniStatus";

import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubMenuList from "../../components/Menu/SubMenuList";
import ProfileCard from "../../components/Home/Profile/ProfileCard";
import Inventory from "../../components/Home/Inventory";
import CurrentMainNft from "../../components/Home/CurrentMainNft";

export default function Home() {
  const iconBoxInside = useColorModeValue("white", "white");

  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, gameTokenContract } = blockchain;

  const [ethBalance, setEthBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [selectedSubMenu, setSelectedSubMenu] = useState("PROFILE");

  //잔액
  const getEthBalance = async () => {
    let balance;
    await web3.eth.getBalance(account.toString()).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };
  const getTokenBalance = async () => {
    let balance;
    await gameTokenContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((tokenBalance) => {
        console.log(tokenBalance);
        balance = web3.utils.fromWei(tokenBalance);
        setTokenBalance(balance.slice(0, 5));
      })
      .catch(console.error());
  };

  const getSelectedSubMenu = (e) => {
    setSelectedSubMenu(e.target.value);
  };

  useEffect(async () => {
    if (!account) return false;
    await getEthBalance();
    await getTokenBalance();
  }, [account]);

  useEffect(() => {
    returnMenu(selectedSubMenu);
  }, [selectedSubMenu]);

  const returnMenu = (display) => {
    switch (display) {
      case "INVENTORY":
        return <Inventory />;
      case "CLAIM":
        return <div>CLAIM</div>;
      case "STAKING":
        return <CurrentMainNft />;
      case "PROFILE":
        return <ProfileCard />;
      default:
        break;
    }
  };

  const menuList = ["INVENTORY", "CLAIM", "STAKING", "PROFILE"];

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatus
          title={"Etherium"}
          amount={ethBalance ? ethBalance : "---"}
          unit={"ETH"}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          title={"Doremi Token"}
          amount={tokenBalance ? tokenBalance : "---"}
          unit={"DGT"}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          title={"Total NFT"}
          amount={"1,000,000"}
          unit={"NFTs"}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          title={"Total Items"}
          amount={"13"}
          unit={"Items"}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Box mt={10}>
        <SubMenuList subMenu={menuList} getSelectedSubMenu={getSelectedSubMenu} />
        {returnMenu(selectedSubMenu)}
      </Box>
    </Flex>
  );
}

// getLayout property
Home.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
