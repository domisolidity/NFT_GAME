import { useEffect } from "react";
import Link from "next/link";
import {
  Box,
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
import { todayTimeFormal } from "../../hooks/currentTime";

const ClaimHistory = (props) => {
  const blockchain = useSelector((data) => data.blockchain);
  const { account } = blockchain;

  const claimHistory = props.history;

  useEffect(async () => {
    if (!account || !claimHistory) return;
    console.log(claimHistory);
  }, [account, claimHistory]);

  return (
    <Box m="0 auto" w="80%">
      <Box bg="#190929" p="3" mb="5">
        <Text fontSize="20">Claim History</Text>
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
                        <Link href={`https://etherscan.io/tx/${history.tx}`}>
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

export default ClaimHistory;
