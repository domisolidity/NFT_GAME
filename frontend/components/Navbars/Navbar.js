// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NavbarLinks from "./NavbarLinks";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import WalletList from "./ConnectWallet/WalletList";


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Separator } from "../Separator/Separator";
import Accountbar from "./Accountbar/Accountbar";
import { useDispatch, useSelector } from "react-redux";
import AccountModal from "./Accountbar/AccountModal";
import { authenticate, connectWallet, reconnect, tttt } from "../../redux/blockchain/blockchainActions";

export default function Navbar(props) {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();

  const { auth, account } = blockchain;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    dispatch(reconnect())

  }, []);



  const {
    variant,
    children,
    fixed,
    brandText,
    ...rest
  } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.200");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(21px)";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.fixed === true)
    if (scrolled === true) {
      navbarPosition = "fixed";
      navbarShadow = useColorModeValue(
        "0px 7px 23px rgba(0, 0, 0, 0.05)",
        "none"
      );
      navbarBg = useColorModeValue(
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
      );
      navbarBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
      navbarFilter = useColorModeValue(
        "none",
        "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
      );
    }

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const ConnectWalletBtn = () => {
    return (
      <>
        <ConnectWallet onOpen={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connect To A Wallet</ModalHeader>
            <Separator />
            <ModalCloseButton />
            <ModalBody>
              <WalletList onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
  const AccountbarBtn = () => {
    return (
      <>
        <Accountbar onOpen={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Account</ModalHeader>
            <Separator />
            <ModalCloseButton />
            <ModalBody>
              <AccountModal onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={"30px"}
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <NavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            fixed={props.fixed}
          />
        </Box>
        {/* Connnect to a wallet btn */}
        {!auth ? ConnectWalletBtn() : AccountbarBtn()}
      </Flex>
    </Flex>
  );
}

Navbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
