import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import ChoiceNft from "./ChoiceNft";
import Modal from "./Modal";
import StakingCard from "./StakingCard";
const CurrentMainNft = ({ getCurrentMainNft, currentMainNftImg }) => {
  console.log(getCurrentMainNft);
  console.log(currentMainNftImg);
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;
  const [accessToken, setAccessToken] = useState("");
  const [currentMainNft, setcurrentMainNft] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const { toggle, visible } = useModal();

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
    <div className="nft-block">
      <Modal toggle={toggle} visible={visible}>
        <ChoiceNft toggle={toggle} getCurrentMainNft={getCurrentMainNft} />
      </Modal>
      <div className="nft-block-title">
        MAIN NFT
        <Tooltip hasArrow label="대표 NFT를 설정하시면, 1 주일간 유지됩니다.">
          <i className="bx bx-help-circle"></i>
        </Tooltip>
      </div>
      {currentImage ? (
        <img src={currentImage} className="nft-img" onClick={toggle} />
      ) : (
        <div className="nft-img plus">
          <img src={"plus.svg"} className="add-nft" onClick={toggle} />
        </div>
      )}

      <style jsx>{`
        .nft-block {
          display: flex;
          background-color: #0f263e;
          box-shadow: 1px 9px 15px rgb(0 0 0 / 10%);
          border-radius: 10px;
          padding: 20px;
          width: 250px;
          height: 160px;
          align-items: center;
        }

        .nft-block-title {
          font-size: 1rem;
          margin: 0 1rem 0 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nft-img.plus {
          cursor: pointer;
        }

        .nft-img {
          width: 130px;
          height: 130px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f1f3f6;
        }

        img.add-nft {
          width: 64px;
          height: 64px;
          -o-object-fit: contain;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
};

export default CurrentMainNft;
