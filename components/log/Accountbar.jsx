import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Accountbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const { hasCopied, onCopy } = useClipboard(account);
  return (
    <Flex>
      <Input value={account} isReadOnly placeholder={`${account}`} />
      <Button onClick={onCopy} ml={2} mr={2}>
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </Flex>
  );
};

export default Accountbar;
