// Chakra imports
import { Box, Flex, Stat, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import IconBox from "../Icons/IconBox";
import { Separator } from "../Separator/Separator.js";

const MiniStatus = ({ title, amount, unit, icon, as, slideIn }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");
  const unitColor = useColorModeValue("teal.300", "teal.300");

  return (
    <Card opacity={"0"} as={as} animation={slideIn} minH="83px">
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                ml="8px"
                // color={percentage > 0 ? "green.400" : "red.400"}
                color={unitColor}
                fontWeight="bold"
                ps="3px"
                fontSize="md"
              >
                {unit ? unit : null}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatus;
