import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RepeatIcon } from "@chakra-ui/icons";
import { todayTimeFormal } from "../../hooks/currentTime";

const NftHistory = (props) => {
  const blockchain = useSelector((data) => data.blockchain);
  const { account, nftContract } = blockchain;

  const [nftHistory, setNftHistory] = useState();

  // const nftHistory = props.history;
  const tokenId = props.tokenId;
  // const getNftHistory = props.updateHistory;

  //=================================================
  const getNftHistory = async () => {
    await nftContract
      .getPastEvents("NftHistory", {
        filter: { tokenId: tokenId },
        fromBlock: 0,
        toBlock: "latest",
      })
      .then((res) => {
        console.log(res);
        let returnValuesArr = [];
        for (const history of res) {
          returnValuesArr.push({
            value: history.returnValues,
            tx: history.transactionHash,
          });
        }
        setNftHistory(returnValuesArr);
      });
  };

  //=================================================

  const updateHistory = () => {
    getNftHistory();
  };

  useEffect(async () => {
    if (!account) return;
    console.log(nftHistory);
    await getNftHistory();
  }, [account]);

  return (
    <Box m="0 auto" w="80%">
      <Box p="3" mb="5" bg="#182749">
        <Text fontSize="20">
          Nft History{" "}
          <span style={{ marginLeft: 10 }}>
            <Button variant="ghost" onClick={updateHistory}>
              <RepeatIcon />
            </Button>
          </span>
        </Text>
      </Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr bg="#1827493e">
              <Th>Type</Th>
              <Th>from</Th>
              <Th>to</Th>
              <Th>time</Th>
              <Th>detail</Th>
            </Tr>
          </Thead>
          {nftHistory
            ? nftHistory.map((history, i) => {
                return (
                  <Tbody key={i}>
                    <Tr>
                      {/* <Td>{`${history.account.substr(0,7)} ...... ${history.account.substr(38,41)}`}</Td> */}
                      <Td>{history.value.historyType}</Td>
                      <Td>
                        {`${history.value.from.substr(
                          0,
                          5
                        )} ... ${history.value.from.substr(38, 41)}`}
                      </Td>
                      <Td>
                        {`${history.value.to.substr(
                          0,
                          5
                        )} ... ${history.value.to.substr(38, 41)}`}
                      </Td>

                      <Td>{todayTimeFormal(Number(history.value.time))}</Td>
                      <Td>
                        <Link
                          href={`https://rinkeby.etherscan.io/tx/${history.tx}`}
                        >
                          <a style={{ color: "#8eb8e0" }}>view etherscan</a>
                        </Link>
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })
            : null}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NftHistory;
