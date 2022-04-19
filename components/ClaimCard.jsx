// Chakra imports
import { Button, Flex, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
// Custom components

import IconBox from "./Icons/IconBox";
import { Separator } from "./Separator/Separator";
import React from "react";
import Card from "./Card/Card";
import CardBody from "./Card/CardBody";
import CardHeader from "./Card/CardHeader";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const ClaimCard = ({ icon, title, description, amount , unit }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p='16px' display='flex' align='center' justify='center'>
        <CardHeader py='12px'>
          <IconBox as='box' h={"30px"} w={"30px"} bg={iconTeal} mr={5}>
            {icon}
          </IconBox>
          <Text color={textColor} fontSize='lg' fontWeight='bold'>
           { `${title} ReWard`}
          </Text>
          <Tooltip hasArrow label={description} bg='gray.300' color={textColor} >
            <QuestionOutlineIcon />
          </Tooltip>
        </CardHeader>
      <CardBody>
        <Flex direction='column' align='center' w='100%' py='14px'>
          <Flex
            direction='row'
            m='14px'
            justify='center'
            textAlign='center'
            align='center'
            w='100%'>
            <Text fontSize='md' color={textColor} fontWeight='bold'>
              {amount}
            </Text>
            <Text
              fontSize='xs'
              color={iconTeal}
              fontWeight='semibold'
              >
            {unit}
            </Text>
          </Flex>
            <Separator m={3}/>
            <Button>Claim</Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ClaimCard;