import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticate,
  connect,
  connectWallet,
  disconnectWallet,
  reconnect,
} from "../../redux/blockchain/blockchainActions";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

import "./layout.css";
import App from "../../App";
import TopNav from "./topnav/TopNav";
import Login from "../log/Login";
import Theme from "../../components/layout/Theme";
import Logo from "../../components/layout/Logo";
import Logout from "../log/Logout";
import Register from "../register/Register.jsx";

import jwtDecode from "jwt-decode";
import AlertCard from "../AlertCard";

const Layout = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  console.log(blockchain);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { account, errorMsg, web3, auth } = blockchain;

  const getNetworkId = async () => {
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    return networkId;
  };

  // const walletConnect = (e) => {
  //   e.preventDefault();
  //   if (errorMsg != "") {
  //     alert(errorMsg);
  //     return;
  //   }
  //   dispatch(connect());
  //   console.log(web3);
  // };

  useEffect(async () => {
    if (account) {
      // && (await getNetworkId()) == 1337) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    //dispatch(connectWallet());
    //dispatch(connectWallet());
    //dispatch(disconnectWallet());
  }, [account]);

  useEffect(() => {
    // dispatch(authenticate());
    getReconnect();
  }, []);

  // useEffect(() => {
  //   // Access token is stored in localstorage
  //   const ls = window.localStorage.getItem(LS_KEY);
  //   const auth = ls && JSON.parse(ls);
  //   setState({ auth });
  // }, []);

  const getConnectWallet = () => {
    dispatch(connectWallet());
  };

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const getReconnect = () => {
    dispatch(reconnect());
  };

  // const handleLoggedIn = (auth) => {
  //   localStorage.setItem(LS_KEY, JSON.stringify(auth));
  //   setState({ auth });
  // };

  // const handleLoggedOut = () => {
  //   localStorage.removeItem(LS_KEY);
  //   setState({ auth: undefined });
  // };

  //const { auth } = state;

  return (
    <Box className="layout">
      {isOpen ? (
        <Alert status="error">
          <AlertIcon />
          <Box flex="1">
            <AlertDescription display="block">
              {blockchain.errorMsg}
            </AlertDescription>
          </Box>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
        </Alert>
      ) : null}

      <Flex className="layout__header">
        <Logo />
        <TopNav />
        <Flex className="layout__header-right">
          {auth ? (
            // <Profile auth={auth} onLoggedOut={handleLoggedOut} />/
            // <Logout onLoggedOut={handleLoggedOut} />
            <Logout onLoggedOut={getDisConnectWallet} />
          ) : (
            <>
              <Button onClick={getConnectWallet}>로그인</Button>
              {/* <Login onLoggedIn={handleLoggedIn} /> */}
            </>
          )}

          {/* <ConnectWallet /> */}
          <Theme />
        </Flex>
      </Flex>
      <Box className="layout__content">
        {blockchain.errorMsg != "" ? (
          <Box>{console.log(blockchain.errorMsg)}</Box>
        ) : null}
        {/* {account ? (
          <>{account}</>
        ) : (
          <>
            <Button onClick={walletConnect}>메타마스크 연결</Button>
            {blockchain.errorMsg != "" ? (
              <Box>{alert(blockchain.errorMsg)}</Box>
            ) : // <Alert status="warning">
            //   <AlertIcon />
            //   {blockchain.errorMsg}
            //   <CloseButton position="absolute" right="8px" top="8px" />
            // </Alert>
            null}
          </>
        )} */}

        {/* <Register /> */}
        <App />
      </Box>
    </Box>
  );
};

export default Layout;
