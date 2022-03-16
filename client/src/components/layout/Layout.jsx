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
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import "./layout.css";
import App from "../../App";
import TopNav from "./topnav/TopNav";
import Theme from "../../components/layout/Theme";
import Logo from "../../components/layout/Logo";
import Logout from "../log/Logout";
import Register from "../register/Register.jsx";

const Layout = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const authState = useSelector((state) => state.auth);
  // console.log(authState);
  console.log(blockchain);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { account, errorMsg, web3, auth } = blockchain;

  useEffect(() => {
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
    getReconnect();
    getConnectWallet();
  }, []);

  const getConnectWallet = async () => {
    if (errorMsg == "메타마스크 로그인이 필요합니다.") {
      console.log(11);
      const popUp = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    }
    dispatch(connectWallet());
  };

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const getReconnect = () => {
    dispatch(reconnect());
  };

  return (
    <Flex className="layout">
      {/* {isOpen ? (
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
      ) : null} */}
      <Flex
        className="layout__header"
        justify="space-around"
        position="fixed"
        top={0}
      >
        <Box>
          <Logo />
        </Box>
        <Box>
          <InputGroup size="md">
            <Input
              placeholder="search"
              _placeholder={{ opacity: 1, color: "gray.500" }}
            />
            <InputRightElement>
              <Button variant="ghost">
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <TopNav />
        </Box>
        <Flex direction="row">
          {auth ? (
            <Logout onLoggedOut={getDisConnectWallet} />
          ) : (
            <>
              <Button onClick={getConnectWallet}>로그인</Button>
            </>
          )}
          <Box>
            <Theme />
          </Box>
        </Flex>
      </Flex>
      <Box className="layout__content">
        {/* <Register /> */}
        <App />
      </Box>
    </Flex>
  );
};

export default Layout;
