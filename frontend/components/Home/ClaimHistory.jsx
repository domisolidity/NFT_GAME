import { useEffect } from "react";
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

const ClaimHistory = (props) => {
  const blockchain = useSelector((data) => data.blockchain);
  const { account } = blockchain;

  const claimHistory = props.history;
  const getClaimHistory = props.updateHistory;

  const updateHistory = () => {
    getClaimHistory();
  };

  useEffect(async () => {
    if (!account || !claimHistory) return;
    console.log(claimHistory);
    console.log(claimHistory == []);
  }, [account, claimHistory]);

  return (
    <Box m="0 auto">
      <Box bg="#10495F" p="3" mb="5">
        <Text fontSize="20">
          Claim History{" "}
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
            <Tr>
              <Th>Reward Type</Th>
              <Th>Reward Amount</Th>
              <Th>Time</Th>
              <Th>detail</Th>
            </Tr>
          </Thead>
          {claimHistory
            ? claimHistory.map((history, i) => {
                return (
                  <Tbody key={i}>
                    <Tr>
                      {/* <Td>{`${history.account.substr(0,7)} ...... ${history.account.substr(38,41)}`}</Td> */}
                      <Td>{history.value.rewardType}</Td>
                      <Td> + {history.value.amount}</Td>
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
      {claimHistory && claimHistory.length == 0 && (
        <Box align="center" mt="5">
          no data
        </Box>
      )}
    </Box>
  );
};

export default ClaimHistory;
