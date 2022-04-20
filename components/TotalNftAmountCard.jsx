// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import IconBox from "./Icons/IconBox";
import { Separator } from "./Separator/Separator";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TotalNftAmountCard = ({ icon, title, description, amount }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const blockchain = useSelector((state) => state.blockchain);
  const { nftContract, account } = blockchain;
  const [totalAmount, setTotalAmount] = useState("");

  const MyTotalNft = async () => {
    await nftContract.methods
      .getMyToken(account)
      .call({ from: account })
      .then((res) => setTotalAmount(res.length));

    console.log(amount);
  };

  useEffect(() => {
    if (!account) return;
    MyTotalNft();
  }, [amount]);

  return (
    <Card p="1px" display="flex" align="center" justify="center">
      <CardBody>
        <Flex direction="column" align="center" w="100%" py="14px">
          <IconBox as="box" h={"60px"} w={"60px"} bg={"#0f263e"}>
            {!totalAmount ? totalAmount : "0"}
          </IconBox>
          <Flex
            direction="column"
            m="1.9rem"
            justify="center"
            textAlign="center"
            align="center"
            w="100%"
          >
            <Separator />
          </Flex>
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {amount}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TotalNftAmountCard;
