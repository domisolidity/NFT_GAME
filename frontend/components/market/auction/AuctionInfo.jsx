import { useEffect, useState } from "react";
import { Box, Table, Tr, Td, Th, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AuctionInfo = (props) => {
  console.log(props);
  const auctionContract = props.auctionContract;
  const bidHistory = props.history;
  const initInfo = props.info;
  const auctionState = props.auctionState;
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account } = blockchain;
  const [myBidAmount, setMyBidAmount] = useState(0);

  const getMyBidAmount = async () => {
    await auctionContract.methods
      .getBidAmount()
      .call({ from: account })
      .then((res) => {
        setMyBidAmount(res);
      });
  };
  useEffect(() => {
    if (!account || !auctionContract) return;
  }, [account, auctionContract]);

  useEffect(async () => {
    if (!account || !auctionContract) return;
    await getMyBidAmount();
    console.log(bidHistory);
  }, [bidHistory]);

  return (
    <Box mt="10">
      <Text>Information</Text>
      <Table>
        <Tr>
          <Th>진행 상태</Th>

          <Td>{auctionState} </Td>
        </Tr>
        <Tr>
          <Th>입찰 시작가</Th>
          {initInfo && console.log(initInfo[1])}
          <Td>{initInfo && web3.utils.fromWei(initInfo[1], "ether")} ETH</Td>
        </Tr>
        <Tr>
          <Th>입찰가 증가 단위</Th>
          <Td>{initInfo && web3.utils.fromWei(initInfo[2], "ether")} ETH</Td>
        </Tr>
        <Tr>
          <Th>현재 최고 입찰자</Th>
          <Td>
            {bidHistory ? (
              `${bidHistory.highestBidder.substr(
                0,
                7
              )} ...... ${bidHistory.highestBidder.substr(38, 41)}`
            ) : (
              <span> - </span>
            )}
          </Td>
        </Tr>
        <Tr>
          <Th>현재 입찰가</Th>
          <Td>
            {bidHistory ? (
              web3.utils.fromWei(bidHistory.highestBindingBid, "ether")
            ) : (
              <span> - </span>
            )}{" "}
            ETH
          </Td>
        </Tr>
        <Tr>
          <Th fontWeight="extrabold">경매에 참여한 내 ETH</Th>
          <Td fontWeight="extrabold">
            {myBidAmount ? (
              web3.utils.fromWei(myBidAmount, "ether")
            ) : (
              <span> - </span>
            )}{" "}
            ETH
          </Td>
        </Tr>
      </Table>
    </Box>
  );
};

export default AuctionInfo;
