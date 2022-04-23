import { Box, Flex, useColorModeValue, Image } from "@chakra-ui/react";

const MyNftsCard = (props) => {
  const txtColor = useColorModeValue("gray.600", "gray.300");
  return (
    <Flex p={5} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
        minW={"230px"}
        bgColor={`${props.grade}.700`}
      >
        <Box w={"230px"} h={"230px"} m={"0 auto"}>
          <Image src={props.img} />
        </Box>
        <Box textAlign="center">
          <Box
            display="block"
            fontSize="2xl"
            color={txtColor}
            fontWeight="bold"
            mb={2}
          >
            {props.grade}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default MyNftsCard;
