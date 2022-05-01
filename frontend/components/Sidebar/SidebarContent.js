/*eslint-disable*/
// chakra imports
import { Box, Button, Flex, Link, Stack, Text, useColorModeValue, keyframes } from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import { TeamLog } from "../Icons/Icons";
import { Separator } from "../Separator/Separator";
import { SidebarBottom } from "./SidebarBottom";
import React from "react";
import { motion } from "framer-motion";
// import {
//   NavLink,
//   useLocation
// } from "react-router-dom";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useSelector } from "react-redux";

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, routes }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const { NEXT_PUBLIC_OWNER } = process.env;
  const isAdmin = account == NEXT_PUBLIC_OWNER;
  // to check for active links and opened collapses
  // let location = useLocation();

  // this is for the rest of the collapses

  const slideInKeyframes = keyframes`
  0% { opacity: 0; transform: translateX(-70px); }
  100% { opacity: 1; transform: translateY(0); }
  `;
  const slideIn = [];
  for (let i = 0; i < routes.length + 3; i++) {
    slideIn.push(`${slideInKeyframes} 0.3s linear ${i * 0.15}s forwards`);
  }

  const router = useRouter();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return router.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      const createButton = (prop) => {
        return (
          <NextLink href={`${prop.path}`} key={prop.name} passHref>
            <Link key={key}>
              {activeRoute(prop.path) === "active" ? (
                <Button
                  opacity="0"
                  as={motion.div}
                  animation={slideIn[key + 2]}
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg={activeBg}
                  mb={{
                    xl: "12px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="12px"
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox bg="teal.300" color="white" h="30px" w="30px" me="12px">
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={activeColor} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Button
                  opacity="0"
                  as={motion.div}
                  animation={slideIn[key + 2]}
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "12px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="12px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover={{ background: activeBg }}
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox bg={inactiveBg} color="teal.300" h="30px" w="30px" me="12px">
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={inactiveColor} my="auto" fontSize="sm">
                      {prop.name}
                    </Text>
                  </Flex>
                </Button>
              )}
            </Link>
          </NextLink>
        );
      };
      const renderButton = <>{createButton(prop)}</>;
      return (
        <>
          {prop.name == "My Page" && !auth
            ? null
            : prop.name == "Admin"
            ? auth && isAdmin
              ? renderButton
              : null
            : renderButton}
        </>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={"25px"} mb="12px">
        <NextLink href={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/`} passHref>
          <Link
            as={motion.div}
            animation={slideIn[0]}
            display="flex"
            lineHeight="100%"
            mb="30px"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            fontSize="11px"
          >
            <TeamLog w="20px" h="20px" me="10px" />
            <Text fontSize="sm" mt="3px">
              {logoText}
            </Text>
          </Link>
        </NextLink>
        <Separator opacity="0" as={motion.div} animation={slideIn[1]} />
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
      <SidebarBottom as={motion.div} slideIn={slideIn[2 + routes.length]} />
    </>
  );
};

export default SidebarContent;
