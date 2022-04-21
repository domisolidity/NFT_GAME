// import { useEffect } from "react";
import { Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../../../redux/blockchain/blockchainActions";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect } from "react";
// import { metamaskLogin } from "../redux/actions/metamaskActions";

const WalletList = ({ onClose }) => {
  const dispatch = useDispatch();
  // const userLog = useSelector((state) => state.userLog);
  // const metamask = useSelector((state) => state.metamask);

  // const { auth } = userLog;
  // const { account } = metamask;

  const getConnectWallet = () => {
    dispatch(connectWallet());
    onClose();
  };

  let onboarding = new MetaMaskOnboarding();

  // let web3 = new Web3(window.ethereum);

  // useEffect(() => {
  //   if (!account) return;
  //   console.log(account);
  //   console.log(metamask);
  // }, [account]);

  // const isMetaMaskConnected = () => account && account.length > 0;
  // console.log(isMetaMaskConnected());

  // const getMetamaskWallet = async () => {
  //   if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     //dispatch(alertMsg("메타마스크가 설치되어 있지 않습니다.)); //=> 알림창
  //     alert("메타마스크가 설치되어 있지 않습니다. 설치 페이지로 이동합니다.");
  //     onboarding.startOnboarding(); // => 다운로드 페이지 새창열기
  //     onOpen();
  //   } else if (account && auth) {
  //     if (onboarding) {
  //       onboarding.stopOnboarding();
  //     }

  //     onOpen();
  //   } else {
  //     //메타마스크 로그인 시작
  //     console.log(111);
  //     // dispatch(metamaskLogin());
  //   }
  // };

  const txtColor = useColorModeValue("#f47820 ", "orange.500");

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
      <Button
        borderRadius={"22px"}
        h={"44px"}
        p={"0 22px"}
        color={txtColor}
        m={1}
      >
        Binance Chain Wallet
        <Image src={"/bsc.png"} h={"28px"} w={"28px"} ml={4} />
      </Button>
    </Flex>
  );
};

export default WalletList;
