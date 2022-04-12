import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Logout = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const { hasCopied, onCopy } = useClipboard(account);

  return (
    <Flex>
      <Input value={account} isReadOnly placeholder={`${account}`} />
      <Button onClick={onCopy} ml={2} bg="#F93B8B">
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <Button onClick={props.onLoggedOut} ml={2} mr={2}>
        logout
      </Button>
    </Flex>
  );
};

export default Logout;
