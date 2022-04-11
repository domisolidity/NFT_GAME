import React from "react";
import { Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const Chainbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, networkId } = blockchain;
  console.log(networkId);
  return (
    <Input
      value={`${
        networkId == 5777
          ? "Local network"
          : networkId == 3
          ? "Ropsten network"
          : networkId == 4
          ? "Rinkeby network"
          : null
        // : networkId == 97 ? "BSC testnet"
      }`}
      isReadOnly
      placeholder={`${account}`}
    />
  );
};

export default Chainbar;
