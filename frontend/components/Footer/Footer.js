import { Flex, Link, List, ListItem, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          {"Made by ❤️"}
        </Text>
        <Link
          color="teal.400"
          href="https://github.com/domisolidity/NFT_GAME"
          target="_blank"
        >
          {" Doremi Games"}
        </Link>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="gray.400" href="https://github.com/domisolidity/NFT_GAME">
            {"Doremifa Solidity"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
