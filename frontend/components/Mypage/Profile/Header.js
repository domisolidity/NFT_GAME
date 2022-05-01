// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const Header = ({
  backgroundHeader,
  backgroundProfile,
  avatarImage,
  name,
  account,
  tabs,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const accountColor = useColorModeValue("gray.400", "gray.300");
  const bgColor = useColorModeValue("gray.700", "white");
  return (
    <Box
      // mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius='15px'

      px='0px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      align='center'>
      <Box
        bgColor={borderProfileColor}
        w='100%'
        h='300px'
        borderRadius='25px'
        bgPosition='50%'
        bgRepeat='no-repeat'
        position='relative'
        display='flex'
        justifyContent='center'>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx='1.5rem'
          maxH='330px'
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='saturate(200%) blur(50px)'
          position='absolute'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='2px solid'
          borderColor={borderProfileColor}
          bg={"backgroundProfile"}
          bgColor={accountColor}
          p='24px'
          borderRadius='20px'
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}>
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={avatarImage}
              w='80px'
              h='80px'
              borderRadius='50%'
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {name}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={accountColor}
                fontWeight='semibold'>
                {account}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}>
            <Button p='0px' bg='transparent' _hover={{ bg: "none" }}>
              <Flex
                align='center'
                w={{ sm: "100%", lg: "135px" }}
                bg='hsla(0,0%,100%,.3)'
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                boxShadow='inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)'
                border='1px solid gray.200'
                cursor='pointer'>
                {tabs[0].icon}
                <Text
                  fontSize='xs'
                  color={textColor}
                  fontWeight='bold'
                  ms='6px'>
                  {tabs[0].name}
                </Text>
              </Flex>
            </Button>
            <Button p='0px' bg='transparent' _hover={{ bg: "none" }}>
              <Flex
                align='center'
                w={{ lg: "135px" }}
                borderRadius='15px'
                justifyContent='center'
                py='10px'
                mx={{ lg: "1rem" }}
                cursor='pointer'>
                {tabs[1].icon}
                <Text
                  fontSize='xs'
                  color={textColor}
                  fontWeight='bold'
                  ms='6px'>
                  {tabs[1].name}
                </Text>
              </Flex>
            </Button>

          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
