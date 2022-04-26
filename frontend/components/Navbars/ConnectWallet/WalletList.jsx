// import { useEffect } from "react";
import { Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  reconnect,
} from "../../../redux/blockchain/blockchainActions";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect } from "react";
// import { metamaskLogin } from "../redux/actions/metamaskActions";

const WalletList = ({ onClose }) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const { account, auth, nftContract } = blockchain;

  const getConnectWallet = () => {
    dispatch(connectWallet());
    onClose();
  };

  const txtColor = useColorModeValue("teal.600", "teal.600");

  return (
    <Flex flexDirection={"column"}>
      <Button
        borderRadius={"22px"}
        h={"44px"}
        p={"0 22px"}
        color={txtColor}
        onClick={getConnectWallet}
        m={1}
      >
        Metamask
        <Image src={"/metamask.png"} h={"28px"} w={"28px"} ml={4} />
      </Button>
    </Flex>
  );
};

export default WalletList;
