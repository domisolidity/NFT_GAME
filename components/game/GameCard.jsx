import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";

const GameCard = ({ game }) => {
  return (
    <Box
      overflow={`hidden`}
      borderRadius={`15px`}
      w={`100%`}
      h={`100%`}
      position={`relative`}
    >
      <Img w={`100%`} src={`./images/game_${game.gameId}.png`} />
      <Flex
        w={`100%`}
        h={`100%`}
        _hover={{ opacity: `1`, cursor: `pointer` }}
        transition={`0.5s ease`}
        opacity={`0`}
        position={`absolute`}
        top={`50%`}
        left={`50%`}
        transform={`translate(-50%, -50%)`}
        textAlign={`center`}
        backgroundColor={`rgba(200,200,200,0.5)`}
        justifyContent={`center`}
        alignItems={`center`}
      >
        <Text color={`#1e315f`} fontSize={`50px`} fontWeight={`bold`}>
          {game.gameTitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default GameCard;
