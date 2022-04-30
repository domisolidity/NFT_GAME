import FullScreen from "../components/Layout/Frame/FullScreen";
import { Box, Flex, Heading, Text, useColorModeValue, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Main() {
  const slideInLeftKeyframes = keyframes`
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
  `;
  const fadeInKeyframes = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
  `;
  const animationIn = [`${slideInLeftKeyframes} 0.3s linear 0s forwards`, `${fadeInKeyframes} 2.5s linear 0s forwards`];
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            as={motion.div}
            animation={animationIn[0]}
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome !
            </Heading>
            <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="16px">
              Doremi Games
            </Text>
          </Flex>
        </Flex>
        <Box
          as={motion.div}
          animation={animationIn[1]}
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="100%"
          // position='absolute'
          right="0px"
        >
          <Box
            bgImage={"/Frame.png"}
            w="100%"
            h="100%"
            // bgSize='cover'
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

// getLayout property
Main.getLayout = function getLayout(page) {
  return <FullScreen>{page}</FullScreen>;
};
