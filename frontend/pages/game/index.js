import { Box, Flex, keyframes, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../../components/game/GameCard";
import GameInterface from "../../components/game/GameInterface";
import { useRouter } from "next/router";
import Link from "next/link";
import BlankComponent from "../../components/utils/BlankComponent";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
import { motion } from "framer-motion";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract, mainNftData } = blockchain;
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [mainNFT, setMainNFT] = useState("");

  useEffect(async () => {
    if (!(account && auth && nftContract)) return;
    // NFT 홀더 확인용
    const haveToken = await nftContract.methods.haveTokenBool(account).call({ from: account });
    setHasToken(haveToken);
    setMainNFT(await GameInterface.getMyNFT(account));
  }, [account, auth, nftContract]);

  const selectGame = async (game) => {
    // 메타마스크, 홈페이지 로그인 확인
    if (!(account && auth)) {
      alert("로그인 안하시면 게임 안 시켜줄겁니다");
      return false;
    }
    // 대표 NFT 설정 확인
    if (mainNftData && !mainNFT) {
      alert("스테이킹 기간이 만료되었습니다.\n보상을 수령하시고 새로 스테이킹 해주세요");
      return false;
    }
    if (!mainNftData) {
      if (!hasToken) {
        alert("NFT를 가지고 있지 않습니다.\n민팅하고 대표NFT를 설정해주세요.");
        return false;
      }
      alert("대표 NFT를 설정해주세요");
      return false;
    }
    const selectedGame = game.gameUrl;
    console.log("selectedGame", game.gameUrl);
    if (window.confirm(`${game.description}\n게임을 플레이 하시겠습니까?`)) {
      // 선택한 게임을 useState에 담아 실행중임을 표시
      console.log("selectedGameselectedGame", selectedGame);
      // 선택한 게임 페이지로 보내기
      router.push(`game/${selectedGame}`);
      return true;
    }
  };
  const reflectKeyframes = keyframes`
      0% { -webkit-box-reflect: below 0px linear-gradient(#00000011, #00000044) }
     10% { -webkit-box-reflect: below 0px linear-gradient(#00000010, #00000040) }
     20% { -webkit-box-reflect: below 0px linear-gradient(#00000009, #00000036) }
     30% { -webkit-box-reflect: below 0px linear-gradient(#00000008, #00000032) }
     40% { -webkit-box-reflect: below 0px linear-gradient(#00000007, #00000028) }
     50% { -webkit-box-reflect: below 0px linear-gradient(#00000006, #00000024) }
     60% { -webkit-box-reflect: below 0px linear-gradient(#00000005, #00000020) }
     70% { -webkit-box-reflect: below 0px linear-gradient(#00000004, #00000016) }
     80% { -webkit-box-reflect: below 0px linear-gradient(#00000003, #00000012) }
     90% { -webkit-box-reflect: below 0px linear-gradient(#00000002, #00000008) }
    100% { -webkit-box-reflect: below 0px linear-gradient(#00000001, #00000004) }
  `;
  const reflect = `${reflectKeyframes} 2s linear alternate 0s infinite`;

  const txtColor = useColorModeValue("gray.600", "white")

  return (
    <Flex direction={"column"} pt={{ base: "120px", md: "75px" }} align="center">
      <Box>
        <Text
          fontSize={"5rem"}
          as={'span'}
          position={'relative'}
          color={txtColor}
          _after={{
            content: "''",
            width: 'full',
            height: useBreakpointValue({ base: '20%', md: '30%' }),
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: 'teal.400',
            zIndex: -1,
          }}
        >
          Doremi games 🎮
        </Text>
      </Box>
      <Flex w={"100%"} mb={"10px"} textAlign="center" height={"160px"} justifyContent={"center"} alignItems="center">
        {auth ? (
          !mainNftData ? (
            hasToken ? (
              <BlankComponent receivedText={[`대표 NFT가 지정되지 않았습니다`, `NFT를 스테이킹 해주세요`]} />
            ) : (
              <BlankComponent receivedText={[`NFT를 가지고 있지 않습니다`, `NFT를 민팅하고 대표NFT를 지정해주세요`]} />
            )
          ) : null
        ) : (
          <BlankComponent receivedText={["로그인을 해 주세요"]} />
        )}
      </Flex>
      <Box w={"100%"} position={`relative`} as={motion.div} animation={reflect}>
        <Flex justifyContent={"space-evenly"} gap="20px">
          {GameInterface.gameList.map((game, index) => (
            <Link key={index} href={(() => selectGame(game)) == true ? `/game/${game.gameUrl}` : `/game`}>
              <a onClick={() => selectGame(game)} style={{ width: "30%", maxWidth: "300px" }}>
                <GameCard game={game} animationDelay={index * 0.2} />
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
