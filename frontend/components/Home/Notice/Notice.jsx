import NoticeNft from "./NoticeNft";
import {
  Box,
  Center,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Clock from "../../utils/Clock";

const Notice = () => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center" mt={5}>
      <Box
        py="64px"
        px="10"
        bg={useColorModeValue("gray.100", "gray.700")}
        borderRadius="15px"
      >
        <Box w="full" px={[10, , 4]} mx="auto" textAlign="center">
          <Text mb={2} fontSize="5xl" fontWeight="bold" lineHeight="tight">
            Tier
          </Text>
          <chakra.p
            fontSize={["lg", , "xl"]}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            About benefits
          </chakra.p>
        </Box>
        <Center fontSize={"30px"} mt={5}>
          <Clock />
        </Center>
        <Box maxW="7xl" py="10" mx="auto">
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} gap={[16, 8]}>
            <NoticeNft
              grade={"red"}
              price={0.001}
              times={5}
              mission={1}
              duration={1}
              startNumber={1}
              endNumber={60}
            />
            <NoticeNft
              grade={"green"}
              price={0.003}
              times={10}
              mission={2}
              duration={2}
              startNumber={61}
              endNumber={90}
            />
            <NoticeNft
              grade={"purple"}
              price={0.005}
              times={15}
              mission={3}
              duration={3}
              startNumber={91}
              endNumber={100}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default Notice;
