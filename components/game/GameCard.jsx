import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const GameCard = ({ game, getSelectGame }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;
  // 해당 게임 선택 시 상위 컴포넌트(Game)의 함수selectGame에 게임명 전달
  const selectGame = async () => {
    //홀더 자격 확인
    const haveToken = await nftContract.methods
      .haveTokenBool(account)
      .call({ from: account });
    if (!haveToken) {
      alert("Nft를 가지고 있지 않습니다. \n 민팅 후 게임에 참여가 가능합니다.");
      return;
    }

    const selectedGame = game.gameTitle;
    if (window.confirm(`${game.description}\n게임을 플레이 하시겠습니까?`))
      getSelectGame(selectedGame);
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
