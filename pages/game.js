import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/game/GameCard";
import GameInterface from "../components/game/GameInterface";
import GameListSidebar from "../components/game/GameListSidebar";

import usePrompt from "../hooks/PageMoveBlocker";
import { useRouter } from "next/router";
import Link from "next/link";

const Game = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth , nftContract} = blockchain;
  const router = useRouter();

  console.log(GameInterface.gameList)
  /* 실행중인 게임 */
  const [runningGame, setRunningGame] = useState();
  console.log(runningGame)
  /* 게임이 선택되어있는 상태에서 페이지 이동 시 확인창 출력 */
  usePrompt("진행중인 게임정보가 사라집니다. 정말로 페이지를 이동하시겠읍니까?", runningGame);

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

  /* 선택한 게임 컴포넌트 소환 */
  const settingGame = () => {
    console.log("runningGame",runningGame)
    switch (runningGame) {
      case "":
        break;
      case GameInterface.gameList[0].gameTitle:
        return router.push(`game/${GameInterface.gameList[0].gameTitle}`) 
        // <StackingBlocks />;
        case GameInterface.gameList[1].gameTitle:
        return router.push(`game/${GameInterface.gameList[1].gameTitle}`) 
        case GameInterface.gameList[2].gameTitle:
        return router.push(`game/${GameInterface.gameList[2].gameTitle}`) 
      default:
        break;
    }
  };

  const selectGame = async(game) =>{
    console.log("게임",game)
    console.log(nftContract)
    //홀더 자격 확인
    const haveToken =  await nftContract.methods.haveTokenBool(account).call({from: account})
    if ( !haveToken ) {
      alert ("Nft를 가지고 있지 않습니다. \n 민팅 후 게임에 참여가 가능합니다.")
      return false;
    } else{
      const selectedGame = game.gameTitle;
      console.log("selectedGame", game.gameTitle)
      if (window.confirm(`${game.description}\n게임을 플레이 하시겠습니까?`))
      if (!(account && auth)) {
        alert("로그인 안하시면 게임 안 시켜줄겁니다");
        return;
      }
      // 선택한 게임을 useState에 담아 실행중임을 표시
      console.log("selectedGameselectedGame",selectedGame)
      setRunningGame(selectedGame);
      router.push(`game/${selectedGame}`)
      return true;
    }
    
  }



  useEffect(() => {
    // 로그인 안돼있으면 게임 선택창으로 보내버리기
    if (!(account && auth)) {
      setRunningGame("");
    }
  }, [account, auth]);

  useEffect(() => {
    if (GameInterface.gameList.length != 0) return;
    GameInterface.getGameList();
  }, [GameInterface.gameList]);

  return (
    <Flex>
      {runningGame && (
        <GameListSidebar />
      )}
      {/* // 실행중인 게임이 없으면 사이드바 표시 안하기} */}
      <Box w={"100%"} minHeight={"400px"} position={`relative`}>
        {!runningGame && (
          // 실행중인 게임이 없을 땐 게임선택창 표시
          <Flex justifyContent={"space-evenly"}>
            {/* {console.log(game)} */}
            {GameInterface.gameList.map((game, index) => (
              <Link href={(()=>selectGame(game))== true ? `/game/${game.gameTitle}`: `/game`} >
               <a onClick={()=>selectGame(game)}>
                <GameCard key={index} game={game} /> 
                </a> 
              </Link>
            ))}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Game;
