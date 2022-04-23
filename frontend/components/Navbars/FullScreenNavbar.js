// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  TimLogo,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from "../Icons/Icons";
import SidebarResponsive from "../Sidebar/SidebarResponsive";
import PropTypes from "prop-types";

import routes from "../routes";

import { useState } from "react";
import NextLink from "next/link"
import { Separator } from "../Separator/Separator";
import WalletList from '../Navbars/ConnectWallet/WalletList'

export default function FullScreenNavbar(props) {
  const contractAddress = '컨트랙트주소'

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const { logo, logoText, ...rest } = props;

  // Chakra color mode
  let navbarIcon = useColorModeValue("gray.700", "gray.200");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";
  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  let navbarPosition = "fixed";
  let colorButton = "white";
  // if (props.secondary === true) {
  //   navbarIcon = "white";
  //   navbarBg = "none";
  //   navbarBorder = "none";
  //   navbarShadow = "initial";
  //   navbarFilter = "initial";
  //   navbarBackdrop = "none";
  //   bgButton = "white";
  //   colorButton = "gray.700";
  //   mainText = "white";
  //   navbarPosition = "absolute";
  // }
  const brand = (
    <Link
      href={`${process.env.NEXT_PUBLIC_PUBLIC_URL}`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <TimLogo w="32px" h="32px" me="10px" />
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  const links = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <NextLink href="/home">
        <Button
          fontSize="sm"
          ms="0px"
          //me="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="12px" h="12px" me="0px" />}
        >
          <Text>Home</Text>
        </Button>
      </NextLink>
      <NextLink href="/game">
        <Button
          fontSize="sm"
          ms="0px"
          //me="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={
            <RocketIcon color={navbarIcon} w="12px" h="12px" me="0px" />
          }
        >
          <Text>Game</Text>
        </Button>
      </NextLink>
    </HStack>
  );


  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}
        >
          <SidebarResponsive
            logoText={props.logoText}
            // secondary={props.secondary}
            routes={routes}
            // logo={logo}
            {...rest}
          />
        </Box>
        {links}
        {/* <Link href={`https://etherscan.io/address/${contractAddress}`}> */}
        <Button
          bg={bgButton}
          color={colorButton}
          fontSize="xs"
          onClick={onOpen}
          // variant="no-hover"
          borderRadius="35px"
          px="30px"
          display={{
            sm: "none",
            lg: "flex",
          }}
        >
          Connect to a Wallet
        </Button>
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
        {/* </Link> */}
      </Flex>
    </Flex>
  );
}

FullScreenNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
