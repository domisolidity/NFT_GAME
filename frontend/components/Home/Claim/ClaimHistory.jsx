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
import { todayTimeFormal } from "../../../hooks/currentTime";

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
    <Box m="0 auto" borderRadius={"15px"}>
      <Box bg="#10495F" p="3" mb="5" borderRadius={"15px 15px 0 0"}>
        <Text fontSize="20">
          Claim History
          <span style={{ marginLeft: 10 }}>
            <Button variant="ghost" onClick={updateHistory}>
              <RepeatIcon />
            </Button>
          </span>
        </Text>
      </Box>
      <TableContainer textAlign={"center"}>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Reward Type</Th>
              <Th textAlign={"center"}>Reward Amount</Th>
              <Th textAlign={"center"}>Time</Th>
              <Th textAlign={"center"}>detail</Th>
            </Tr>
          </Thead>
          {claimHistory
            ? claimHistory.map((history, i) => {
                return (
                  <Tbody key={i}>
                    <Tr>
                      {/* <Td>{`${history.account.substr(0,7)} ...... ${history.account.substr(38,41)}`}</Td> */}
                      <Td textAlign={"center"}>{history.value.rewardType}</Td>
                      <Td textAlign={"center"}> + {history.value.amount}</Td>
                      <Td>{todayTimeFormal(Number(history.value.time))}</Td>
                      <Td textAlign={"center"}>
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
