import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import GameInterface from "./game/GameInterface";
import { useSelector } from "react-redux";

const MainNftCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth, nftContract } = blockchain;
  const [mainNFT, setMainNFT] = useState("");
  const LS_KEY = "login-with-metamask:auth";
  const baseUri = "http://127.0.0.1:8080/ipfs";
  const [currentImage, setCurrentImage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // 페이지 진입 시 대표 NFT 받아오기
  useEffect(async () => {
    if (!(account && auth)) return;
    console.log(123);
    const mainNFT = await GameInterface.getMyNFT(account);
    setMainNFT(mainNFT);
    console.log(mainNFT);
  }, [account, auth]);

  useEffect(async () => {
    if (!mainNFT) return;
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);
    console.log(getToken);
    console.log(parsedToken);
    console.log(accessToken);
    if (!parsedToken) return;

    const {
      payload: { id },
    } = jwtDecode(parsedToken);

    await nftContract.methods
      .getMyToken(account)
      .call({ from: account })
      .then(async (tokenData) => {
        console.log("getMyToken", tokenData);

        if (!tokenData) return;
        for (const info of tokenData) {
          console.log(info);
          console.log(info.id);
          if (info.id == mainNFT) {
            const response = await axios.get(
              `${baseUri}${info.uri.slice(6)}/${info.id}.json`
            );
            console.log(`${baseUri}${response.data.image.slice(6)}`);
            setCurrentImage(`${baseUri}${response.data.image.slice(6)}`);
            return;
          }
        }
      });
  }, [mainNFT]);
  return (
    <>
      <img className="main-nft-img" src={currentImage} />
      <style jsx>{`
        .main-nft-img {
          width: 160px;
        }
      `}</style>
    </>
  );
};

export default MainNftCard;
