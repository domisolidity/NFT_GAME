/*eslint-disable*/
// chakra imports
import { Box, Button, Flex, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import { TimLogo } from "../Icons/Icons";
import { Separator } from "../Separator/Separator";
import { SidebarBottom } from "./SidebarBottom";
import React, { useState } from "react";
// import {
//   NavLink,
//   useLocation
// } from "react-router-dom";
import { useRouter } from "next/router";
import NextLink from "next/link";

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, routes }) => {
  console.log({ logoText, routes });

  // to check for active links and opened collapses
  // let location = useLocation();

  // this is for the rest of the collapses
  const [state, setState] = useState({});

  const router = useRouter();
  console.log(router);

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
      if (prop.redirect) {
        return null;
      }

      // if (prop.name && prop.subName) {
      //   return (
      //     <div key={prop.name}>
      //       {createLinks(prop.subName)}
      //     </div>
      //   )
      // }

      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        // <NextLink href={`${prop.layout + prop.path}`} key={prop.name} passHref>
        <NextLink href={`${prop.path}`} key={prop.name} passHref>
          <Link>
            {activeRoute(prop.path) === "active" ? (
              <Button
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
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={"25px"} mb="12px">
        <NextLink href={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/`} passHref>
          <Link
            target="_blank"
            display="flex"
            lineHeight="100%"
            mb="30px"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            fontSize="11px"
          >
            <TimLogo w="20px" h="20px" me="10px" />
            <Text fontSize="sm" mt="3px">
              {logoText}
            </Text>
          </Link>
        </NextLink>
        <Separator />
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
      <SidebarBottom />
    </>
  );
};

export default SidebarContent;
