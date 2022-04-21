import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../../components/game/GameCard";
import GameInterface from "../../components/game/GameInterface";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import BlankComponent from "../../components/utils/BlankComponent";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract, stakingContract } = blockchain;
  const router = useRouter();
  const [mainNFT, setMainNFT] = useState("");
  const baseUri = "http://127.0.0.1:8080/ipfs";
  const [nftGrade, setNftGrade] = useState("");

  useEffect(async () => {
    if (!(account && auth)) return;
    const stakingData = await stakingContract.methods.getStakingData().call({ from: account });
    const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
    const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
    console.log(response.data);
    setCurrentImage(`${baseUri}${response.data.image.slice(6)}`);
    setNftGrade(response.data.grade);
  }, [mainNFT]);

  // 페이지 진입 시 대표 NFT 받아오기
  useEffect(async () => {
    if (!(account && auth)) return;
    // const mainNFT = await GameInterface.getMyNFT(account);
    const mainNftData = await stakingContract.methods.getStakingData().call({ from: account });
    setMainNFT(mainNftData.tokenId);
  }, [account, auth]);

  useEffect(async () => {
    if (!(account && auth && mainNFT)) return;
    //

    // 대표 NFT가 있으면 일일미션정보 받아오기
    let receivedMissions = await GameInterface.getMission(account);
    // 일일미션이 없으면 새로 받기
    if (receivedMissions.length == 0) {
      await GameInterface.missionReg(account, mainNFT);
      receivedMissions = await GameInterface.getMission(account);
    }
  }, [mainNFT]);

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
    if (!mainNFT) {
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
      <Flex
        backgroundColor={`var(--chakra-colors-${nftGrade}-700)`}
        w={"100%"}
        mb={"10px"}
        textAlign="center"
        height={"160px"}
        justifyContent={"center"}
        alignItems="center"
      >
        {mainNFT ? null : <BlankComponent receivedText={"대표 NFT가 지정되지 않았습니다"} />}
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
