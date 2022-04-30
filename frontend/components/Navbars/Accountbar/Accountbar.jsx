import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Accountbar = ({ onOpen }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  useEffect(() => {
    if (!account) return;
  }, [account]);

  const txtColor = useColorModeValue("#f47820 ", "orange.500");

  return (
    <Flex>
      <Button
        borderRadius={"22px"}
        h={"44px"}
        p={"0 22px"}
        color={txtColor}
        onClick={onOpen}
        fontSize={"14px"}
        boxShadow={"0 2px 10px rgb(0 0 0 / 15%)"}
      >
        {account ? account.slice(0, 6) + "..." + account.slice(-4) : null}
      </Button>
    </Flex>
  );
};

export default Accountbar;
