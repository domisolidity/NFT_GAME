import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";

const GameCard = (props) => {
  // 해당 게임 선택 시 상위 컴포넌트(Game)의 함수selectGame에 게임명 전달
  const selectGame = () => {
    const selectedGame = props.game.gameTitle;
    if (window.confirm(`${selectedGame} 게임으로 이동합니다`))
      props.selectGame(selectedGame);
  };
  return (
    <Box
      overflow={`hidden`}
      borderRadius={`15px`}
      w={`30%`}
      h={`100%`}
      position={`relative`}
      onClick={selectGame}
    >
      <Img w={`100%`} src={`./images/game_${props.game.id}.png`} />
      <Flex
        w={`100%`}
        h={`100%`}
        _hover={{ opacity: `0.5`, cursor: `pointer` }}
        transition={`0.5s ease`}
        opacity={`0`}
        position={`absolute`}
        top={`50%`}
        left={`50%`}
        transform={`translate(-50%, -50%)`}
        textAlign={`center`}
        backgroundColor={`#04AA6D`}
        justifyContent={`center`}
        alignItems={`center`}
      >
        <Text color={`#1e315f`} fontSize={`50px`} fontWeight={`bold`}>
          {props.game.gameTitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default GameCard;
