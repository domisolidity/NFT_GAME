import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import GameCard from "../../components/game/GameCard";
import GameInterface from "../../components/game/GameInterface";
import { useRouter } from "next/router";
import Link from "next/link";
import BlankComponent from "../../components/utils/BlankComponent";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract, mainNftData } = blockchain;
  const router = useRouter();

  const selectGame = async (game) => {
    // 메타마스크, 홈페이지 로그인 확인
    if (!(account && auth)) {
      alert("로그인 안하시면 게임 안 시켜줄겁니다");
      return false;
    }
    // NFT 홀더 확인
    const haveToken = await nftContract.methods.haveTokenBool(account).call({ from: account });
    if (!haveToken) {
      alert("NFT를 가지고 있지 않습니다. \n 민팅하고 대표NFT를 설정해주세요.");
      return false;
    }
    // 대표 NFT 설정 확인(설정 안되있으면 mypage로 보내기)
    if (!mainNftData) {
      alert("대표 NFT를 설정해주세요");
      router.push(`mypage`);
      return false;
    }
    const selectedGame = game.gameUrl;
    console.log("selectedGame", game.gameUrl);
    if (window.confirm(`${game.description}\n게임을 플레이 하시겠습니까?`)) {
      // 선택한 게임을 useState에 담아 실행중임을 표시
      console.log("selectedGameselectedGame", selectedGame);

      router.push(`game/${selectedGame}`);
      return true;
    }
  };

  return (
    <Flex direction={"column"} pt={{ base: "120px", md: "75px" }}>
      <Flex w={"100%"} mb={"10px"} textAlign="center" height={"160px"} justifyContent={"center"} alignItems="center">
        {auth ? (
          mainNftData ? null : (
            <BlankComponent receivedText={"대표 NFT가 지정되지 않았습니다"} />
          )
        ) : (
          <BlankComponent receivedText={"로그인 해 주세요"} />
        )}
      </Flex>
      <Box w={"100%"} minHeight={"400px"} position={`relative`}>
        <Flex justifyContent={"space-evenly"}>
          {GameInterface.gameList.map((game, index) => (
            <Link key={index} href={(() => selectGame(game)) == true ? `/game/${game.gameUrl}` : `/game`}>
              <a onClick={() => selectGame(game)} style={{ width: "30%", height: "100%" }}>
                <GameCard game={game} />
              </a>
            </Link>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};
export default Game;

// getLayout property
Game.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
