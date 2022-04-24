import React from "react";
// Chakra imports
import {
  Box,
  Center,
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
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import TablesTableRow from "../Tables/TablesTableRow";
import { useSelector } from "react-redux";
import RankingTable from "./RankingTable";
import { Separator } from "../Separator/Separator";
import { BlockIcon, DiamondIcon, TetrisIcon } from "../Icons/Icons";

const CurrentRanking = ({ currentRankData, captions, title }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const gameIcon = (title) => {
    switch (title) {
      case "블록쌓기":
        return <BlockIcon />;
      case "테트리스":
        return <TetrisIcon />;
      case "보물찾기":
        return <DiamondIcon />;

      default:
        break;
    }
  };
  return (
    <>
      <Card
        overflowX={{ sm: "scroll", xl: "hidden" }}
        mt={5}
        borderRadius={"15px 15px 0 0"}
      >
        <CardHeader p="6px 0px 20px 6px">
          <Box fontSize="40px" color={textColor} align="center" m={"0 auto"}>
            {gameIcon(title)}
          </Box>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor} mt={5}>
            <Thead>
              <Tr my=".9rem" pl="0px" color="gray.400">
                {captions.map((caption, idx) => {
                  return (
                    <Th
                      color="gray.400"
                      key={idx}
                      ps={idx === 0 ? "0px" : null}
                      textAlign="center"
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
                // console.log(user.User.userImage);

                return (
                  <TablesTableRow
                    key={i}
                    ranking={ranking}
                    profile={user.User.userImage}
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
