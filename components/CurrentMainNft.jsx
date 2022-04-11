import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CurrentMainNft = ({ getCurrentMainNft, currentMainNftImg }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;
  const [accessToken, setAccessToken] = useState("");
  const [currentMainNft, setcurrentMainNft] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  const LS_KEY = "login-with-metamask:auth";
  const baseUri = "http://127.0.0.1:8080/ipfs";

  useEffect(async () => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);

    if (!accessToken) return;

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    await fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setcurrentMainNft(result.mainNft);
        console.log(currentMainNft);
      })
      .catch(window.alert);
    getMyNfts();
  }, [account, accessToken, currentMainNft, currentImage, currentMainNftImg]);

  const getMyNfts = async () => {
    try {
      getCurrentMainNft(currentMainNft);
      await nftContract.methods
        .getMyToken(account)
        .call({ from: account })
        .then(async (result) => {
          console.log("getMyToken", result);
          console.log(currentMainNft);

          if (!result) return true;
          for (const info of result) {
            console.log(info);
            console.log(info.id);
            if (info.id == currentMainNftImg) {
              const response = await axios.get(
                `${baseUri}${info.uri.slice(6)}/${info.id}.json`
              );
              setCurrentImage(`${baseUri}${response.data.image.slice(6)}`);
              return;
            }
          }
        });
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="current_main_nft">
      <img
        src={currentImage ? currentImage : `images/defaultProfile.jpeg`}
        alt="대표 NFT"
      />
      <style jsx>{`
        .current_main_nft > img {
          width: 160px;
          height: 160px;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

export default CurrentMainNft;
