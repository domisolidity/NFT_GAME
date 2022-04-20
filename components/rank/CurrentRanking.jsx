import React from "react";
// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import TablesTableRow from "../Tables/TablesTableRow";
import { useSelector } from "react-redux";
import RankingTable from "./RankingTable";

const CurrentRanking = ({ currentRankData, captions, title }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} mt={10}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {title}
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".9rem" pl="0px" color="gray.400">
                {captions.map((caption, idx) => {
                  return (
                    <Th
                      color="gray.400"
                      key={idx}
                      ps={idx === 0 ? "0px" : null}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {currentRankData.map((user, i) => {
                const tempUpdatedAt = new Date(user.updatedAt);
                const tempMonth = tempUpdatedAt.getMonth() + 1;
                const tempDate = tempUpdatedAt.getDate();
                const tempHours = tempUpdatedAt.getHours();
                const tempMinutes = tempUpdatedAt.getMinutes();
                const tempSeconds = tempUpdatedAt.getSeconds();
                const updatedAt = `${tempMonth}/${tempDate} ${tempHours}:${tempMinutes}:${tempSeconds}`;

                const ranking = i + 1;

                return (
                  <TablesTableRow
                    key={i}
                    ranking={ranking}
                    logo={user.logo}
                    domain={user.domain}
                    player={user.user_address}
                    score={user.gameScore}
                    date={user.updatedAt ? updatedAt : null}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default CurrentRanking;
