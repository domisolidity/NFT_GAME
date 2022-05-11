// Chakra imports
import { Box, Flex, SimpleGrid, useColorModeValue, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, TeamLog, WalletIcon } from "../../components/Icons/Icons";
import MiniStatus from "../../components/Mypage/MiniStatus";

import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubMenuList from "../../components/Menu/SubMenuList";
import ProfileCard from "../../components/Mypage/Profile/ProfileCard";
import Inventory from "../../components/Mypage/Inventory/Inventory";
import Staking from "../../components/Mypage/Staking/Staking";
import ClaimInfoCard from "../../components/Mypage/Claim/Claim";

export default function Mypage() {
  const iconBoxInside = useColorModeValue("white", "white");

  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, auth, nftContract, gameTokenContract, networkId } = blockchain;

  const [ethBalance, setEthBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [selectedSubMenu, setSelectedSubMenu] = useState("INVENTORY");
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
      // case "NOTICE":
      //   return <Notice as={motion.div} slideIn={slideIn[5]} />;
      case "INVENTORY":
        return <Inventory as={motion.div} slideIn={slideIn[5]} />;
      case "CLAIM":
        return <ClaimInfoCard as={motion.div} slideIn={slideIn[5]} onUpdate={updateToken} />;
      case "STAKING":
        return <Staking as={motion.div} slideIn={slideIn[5]} />;
      case "PROFILE":
        return <ProfileCard as={motion.div} slideIn={slideIn[5]} />;
      default:
        break;
    }
  };

  const menuList = ["INVENTORY", "CLAIM", "STAKING", "PROFILE"];

  const slideInKeyframes = keyframes`
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
  `;
  const slideInSubKeyframes = keyframes`
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
  `;
  const slideIn = [
    `${slideInKeyframes} 0.3s linear 0s forwards`,
    `${slideInKeyframes} 0.3s linear 0.2s forwards`,
    `${slideInKeyframes} 0.3s linear 0.4s forwards`,
    `${slideInKeyframes} 0.3s linear 0.6s forwards`,
    `${slideInSubKeyframes} 0.3s linear 0.8s forwards`,
    `${slideInSubKeyframes} 0.3s linear 0s forwards`,
  ];

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatus
          as={motion.div}
          slideIn={slideIn[0]}
          title={"Etherium"}
          amount={ethBalance ? ethBalance : "---"}
          unit={"ETH"}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          as={motion.div}
          slideIn={slideIn[1]}
          title={"Doremi Token"}
          amount={tokenBalance ? tokenBalance : "---"}
          unit={"REMI"}
          icon={<TeamLog h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          as={motion.div}
          slideIn={slideIn[2]}
          title={"Remained NFT"}
          amount={remainNfts ? remainNfts : "---"}
          unit={"NFTs"}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatus
          as={motion.div}
          slideIn={slideIn[2]}
          title={"Chain"}
          amount={`${
            networkId == 5777 ? "Local" : networkId == 3 ? "Ropsten" : networkId == 4 ? "Rinkeby" : null
            // : networkId == 97 ? "BSC testnet"
          }`}
          unit={"Network"}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Box mt={10} as={motion.div} animation={slideIn[4]} opacity="0">
        <SubMenuList subMenu={menuList} getSelectedSubMenu={getSelectedSubMenu} />
        {returnMenu(selectedSubMenu)}
      </Box>
    </Flex>
  );
}

// getLayout property
Mypage.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
