// import { useEffect } from "react";
import { Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../../../redux/blockchain/blockchainActions";

const WalletList = ({ onClose }) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account } = blockchain;

  const getConnectWallet = async () => {
    const coinbase = await web3.eth.getCoinbase(); //계정

    if (!coinbase) {
      console.log(coinbase);
      alert("메타마스크 로그인이 필요합니다.");
      return;
    }

    dispatch(connectWallet(web3, account));
    onClose();
  };

  const txtColor = useColorModeValue("teal.600", "teal.400");

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
