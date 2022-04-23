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
import Inventory from "../../components/Home/Inventory/Inventory";
import Notice from "../../components/Home/Notice/Notice";
import Staking from "../../components/Home/Staking/Staking";
import ClaimInfoCard from "../../components/Home/ClaimInfoCard";

export default function Home() {
  const iconBoxInside = useColorModeValue("white", "white");

  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract, gameTokenContract } = blockchain;

  const [ethBalance, setEthBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [selectedSubMenu, setSelectedSubMenu] = useState("NOTICE");
  const [updateTrigger, setUpdateTrigger] = useState();
  const [remainNfts, setRemainNfts] = useState([]);

  //잔액
  const getEthBalance = async () => {
    let balance;
    await web3.eth.getBalance(account.toString()).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };
  const getTokenBalance = async () => {
    await gameTokenContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((tokenBalance) => {
        console.log(tokenBalance);
        setTokenBalance(tokenBalance);
      })
      .catch(console.error());
  };

  const getSelectedSubMenu = (e) => {
    setSelectedSubMenu(e.target.value);
  };
  const updateToken = () => {
    setUpdateTrigger(!updateTrigger);
  };

  useEffect(async () => {
    if (!account) return false;
    await getEthBalance();
    await getTokenBalance();
    await getNftBalance();
  }, [account, updateTrigger]);

  const getNftBalance = async () => {
    const recievedRemainNfts = await nftContract.methods.remainNfts().call();
    if (!recievedRemainNfts) return;
    setRemainNfts(parseInt(recievedRemainNfts[0]) + parseInt(recievedRemainNfts[1]) + parseInt(recievedRemainNfts[2]));
  };

  useEffect(() => {
    returnMenu(selectedSubMenu);
  }, [selectedSubMenu]);

  const returnMenu = (display) => {
    switch (display) {
      case "NOTICE":
        return <Notice />;
      case "INVENTORY":
        return <Inventory />;
      case "CLAIM":
        return <ClaimInfoCard onUpdate={updateToken} />;
      case "STAKING":
        return <Staking />;
      case "PROFILE":
        return <ProfileCard />;
      default:
        break;
    }
  };

  const menuList = ["NOTICE", "INVENTORY", "CLAIM", "STAKING", "PROFILE"];

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
          amount={remainNfts ? remainNfts : "---"}
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
