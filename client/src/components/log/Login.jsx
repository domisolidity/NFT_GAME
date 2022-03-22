import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  disconnectWallet,
  reconnect,
  connect,
} from "../../redux/blockchain/blockchainActions";

const Login = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  console.log(blockchain);

  const { errorMsg, auth, account } = blockchain;
  useEffect(() => {
    console.log(errorMsg);
  }, [errorMsg]);
  useEffect(() => {
    if (!errorMsg) return;
    alert(errorMsg);
  }, [account, auth, errorMsg]);

  useEffect(() => {
    dispatch(connect());
    //getConnectWallet();
  }, []);

  const getConnectWallet = async () => {
    // if (errorMsg == "메타마스크 로그인이 필요합니다.") {
    //   console.log(11);
    //   const popUp = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });
    // }
    dispatch(connectWallet());
  };

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const getReconnect = () => {
    dispatch(connect());
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
