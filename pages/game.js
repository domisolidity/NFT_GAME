import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/game/GameCard";
import GameInterface from "../components/game/GameInterface";
import { useRouter } from "next/router";
import Link from "next/link";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract } = blockchain;
  const router = useRouter();

  console.log(GameInterface.gameList)


  /* 게임 선택 */
  // const getSelectGame = async (selectedGame) => {
  //   // 로그인 안 하면 게임 선택 못하게 막기
  //   if (!(account && auth)) {
  //     alert("로그인 안하시면 게임 안 시켜줄겁니다");
  //     return;
  //   }
  //   // 선택한 게임을 useState에 담아 실행중임을 표시
  //   console.log("selectedGameselectedGame",selectedGame)
  //   setRunningGame(selectedGame);
  // };


  const selectGame = async (game) => {
    console.log("게임", game)
    console.log(nftContract)
    //홀더 자격 확인
    const haveToken = await nftContract.methods.haveTokenBool(account).call({ from: account })
    if (!haveToken) {
      alert("Nft를 가지고 있지 않습니다. \n 민팅 후 게임에 참여가 가능합니다.")
      return false;
    } else {
      const selectedGame = game.gameUrl;
      console.log("selectedGame", game.gameUrl)
      if (window.confirm(`${game.description}\n게임을 플레이 하시겠습니까?`))
        if (!(account && auth)) {
          alert("로그인 안하시면 게임 안 시켜줄겁니다");
          return;
        }
      // 선택한 게임을 useState에 담아 실행중임을 표시
      console.log("selectedGameselectedGame", selectedGame)

      router.push(`game/${selectedGame}`)
      return true;
    }

  }


  return (
    <Flex>
      {/* // 실행중인 게임이 없으면 사이드바 표시 안하기} */}
      <Box w={"100%"} minHeight={"400px"} position={`relative`}>
        <Flex justifyContent={"space-evenly"}>
          {/* {console.log(game)} */}
          {GameInterface.gameList.map((game, index) => (<>
            <Link href={(() => selectGame(game)) == true ? `/game/${game.gameUrl}` : `/game`} >
              <a onClick={() => selectGame(game)} style={{ width: '30%', height: '100%' }}>
                <GameCard key={index} game={game} />
              </a>
            </Link>
          </>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};
export default Game;
