import { Button, useColorModeValue } from "@chakra-ui/react";

const ConnectWallet = ({ onOpen }) => {
  const txtColor = useColorModeValue("#f47820 ", "orange.500");

  return (
    <Button
      borderRadius={"22px"}
      h={"44px"}
      p={"0 22px"}
      color={txtColor}
      onClick={onOpen}
      fontSize={"14px"}
      boxShadow={"0 2px 10px rgb(0 0 0 / 15%)"}
    >
      Connect To A Wallet
    </Button>
  );
};

export default ConnectWallet;
