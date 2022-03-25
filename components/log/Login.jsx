import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  disconnectWallet,
  reconnect,
} from "../../redux/blockchain/blockchainActions";

const Login = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const { errorMsg, auth } = blockchain;

  useEffect(() => {
    getReconnect();
    // getConnectWallet();
  }, []);

  const getConnectWallet = async () => {
    if (errorMsg == "메타마스크 로그인이 필요합니다.") {
      console.log(11);
      const popUp = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    }
    console.log("로그인")
    dispatch(connectWallet());
  };

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const getReconnect = () => {
    dispatch(reconnect());
  };
  return (
    <>
      {auth ? (
        <Button onClick={getDisConnectWallet}>Logout</Button>
      ) : (
        <Button onClick={getConnectWallet}>Login</Button>
      )}
    </>
  );
};

export default Login;
