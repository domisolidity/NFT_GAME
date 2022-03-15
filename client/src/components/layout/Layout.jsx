import React, { useEffect, useState } from "react";

import "./layout.css";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions.js";
import App from "../../App";
import TopNav from "./topnav/TopNav";
import Login from "../log/Login";
import { Box, Input, Flex,InputRightElement,InputGroup, Button } from "@chakra-ui/react";
import {SearchIcon } from "@chakra-ui/icons";
import Theme from "../../components/layout/Theme";
import Logo from "../../components/layout/Logo";
import Logout from "../log/Logout";


const Layout = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain);

  const { account, errorMsg, web3 } = blockchain;

  const LS_KEY = "login-with-metamask:auth";
  const [state, setState] = useState({});

  const walletConnect = (e) => {
    e.preventDefault();
    if (errorMsg != "") {
      alert(errorMsg);
      return;
    }
    // dispatch(connect());
    console.log(web3);
  };

  useEffect(() => {
    // dispatch(connect());
  }, [dispatch]);

  useEffect(() => {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setState({ auth });
  }, []);

  const handleLoggedIn = (auth) => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    setState({ auth });
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setState({ auth: undefined });
  };

  const { auth } = state;

  return (
    <Flex className="layout" justify="center" direction="column">
      <Flex className="layout__header" justify="space-around" position="fixed" top={0} >
        <Box ><Logo /></Box>
        <Box>
          <InputGroup size='md'>
            <Input
              placeholder='search'
              _placeholder={{ opacity: 1, color: 'gray.500' }}
              />
            <InputRightElement >
              <Button variant="ghost">
                <SearchIcon/>
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box><TopNav /></Box>
        <Flex direction="row">
          {auth ? (
            // <Profile auth={auth} onLoggedOut={handleLoggedOut} />
            <Logout onLoggedOut={handleLoggedOut} />
            ) : (
              
              <Login onLoggedIn={handleLoggedIn} />
              
              )}
          <Box>
            <Theme/>
          </Box>
        </Flex>
      </Flex>
        <Box className="layout__content">
          {account ? (
            <>{account}</>
          ) : (
            <>
              {/* <Button onClick={walletConnect}>메타마스크 연결</Button> */}
              {blockchain.errorMsg != "" ? (
                <Box>{alert(blockchain.errorMsg)}</Box>
              ) : // <Alert status="warning">
              //   <AlertIcon />
              //   {blockchain.errorMsg}
              //   <CloseButton position="absolute" right="8px" top="8px" />
              // </Alert>
              null}
            </>
          )}
        </Box>
          <App />


    </Flex>
  );
};

export default Layout;
