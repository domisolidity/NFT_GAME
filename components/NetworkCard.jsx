import React, { useEffect, useState } from "react";
import { Grid, GridItem, Image } from "@chakra-ui/react";
//import EthereumCoin from "/EthereumCoin.png";
// import GameCoin from "/GameCoin3.png";
import { useSelector } from "react-redux";
const NetworkCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  console.log("blockchain", blockchain);
  const { web3, account } = blockchain;

  const [ethBalance, setEthBalance] = useState();

  //잔액
  const getEthBalance = async () => {
    let balance;
    await web3.eth.getBalance(account.toString()).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };

  useEffect(async () => {
    if (!account) return false;
    await getEthBalance();
  }, [account]); //account

  return (
    <Grid
      // padding="0 4vw"
      templateColumns="repeat(4, minmax(3rem,4rem) )" //가로
      templateRows="repeat(3,minmax(3rem,3rem))" //세로
      fontSize={"1.5rem"}
      fontWeight={"bold"}
      alignItems={"center"}
      justifyItems={"center"}
    >
      <GridItem bg="whiteAlpha.100" colSpan={4} rowSpan={1} m={"0.5rem 0"}>
        ethereum network
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={2}>
        <img src="/EthereumCoin.png" />
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1} fontSize={"1.2rem"}>
        {ethBalance}
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={2}>
        <img src="/GameCoin3.png" />
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1} fontSize={"1.2rem"}>
        77.34
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1} fontSize={"1.2rem"}>
        ETH
      </GridItem>
      <GridItem bg="whiteAlpha.100" colSpan={1} rowSpan={1} fontSize={"1.2rem"}>
        SOL
      </GridItem>
    </Grid>
  );
};

export default NetworkCard;
