import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ChoiceNft from "./ChoiceNft";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import StakingCard from "./StakingCard";
import { Separator } from "../Separator/Separator";
const CurrentMainNft = ({ getCurrentMainNft, currentMainNftImg }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(getCurrentMainNft);
  console.log(currentMainNftImg);
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract, gameTokenContract, stakingContract } =
    blockchain;
  const [accessToken, setAccessToken] = useState("");
  const [currentMainNft, setcurrentMainNft] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [nftGrade, setNftGrade] = useState("");

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
      const stakingData = await stakingContract.methods
        .getStakingData()
        .call({ from: account });
      const directoryUri = await nftContract.methods
        .tokenURI(stakingData.tokenId)
        .call();
      const response = await axios.get(
        `${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`
      );
      console.log(response.data);
      setCurrentImage(`${baseUri}${response.data.image.slice(6)}`);
      setNftGrade(response.data.grade);
    } catch (error) {
      console.error();
    }
  };

  const unStaking = async () => {
    console.log(stakingContract.methods);
    const qqq = await stakingContract.methods
      .getStakingData()
      .call({ from: account });
    console.log(qqq.tokenId);

    if (!(qqq.tokenId > 0 && qqq.tokenId <= 100)) return;

    await stakingContract.methods
      .exit(qqq.tokenId)
      .send({ from: account })
      .catch((err) => console.log(err));
    setCurrentImage("");
    setNftGrade("");
  };

  const charge = async () => {
    console.log("돈돈");
    console.log(gameTokenContract.methods);
    await gameTokenContract.methods
      .transfer(stakingContract._address, 100)
      .send({ from: account });

    const abcd = await gameTokenContract.methods.balanceOf(account).call();
    const qwer = await gameTokenContract.methods
      .balanceOf(stakingContract._address)
      .call();
    console.log(abcd);
    console.log(qwer);
  };
  const myData = async () => {
    console.log("생생정보");

    const abcd = await gameTokenContract.methods.balanceOf(account).call();
    const qwer = await gameTokenContract.methods
      .balanceOf(stakingContract._address)
      .call();
    console.log(abcd);
    console.log(qwer);
    const ppp = await stakingContract.methods
      .getStakingData()
      .call({ from: account });
    console.log(ppp);
  };

  return (
    <div className={`nft-block ${nftGrade}`}>
      {/* <Modal toggle={toggle} visible={visible}>
      <ChoiceNft toggle={toggle} getCurrentMainNft={getCurrentMainNft} />
    </Modal> */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <Separator />
          <ModalCloseButton />
          <ModalBody>
            <ChoiceNft
              onClose={onClose}
              getCurrentMainNft={getCurrentMainNft}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="nft-block-title">
        MAIN NFT
        <Tooltip hasArrow label="대표 NFT를 설정하시면, 1 주일간 유지됩니다.">
          <i className="bx bx-help-circle"></i>
        </Tooltip>
      </div>
      {currentImage ? (
        <img src={currentImage} className="nft-img" onClick={onClose} />
      ) : (
        <div className="nft-img plus">
          <img
            src={"plus.svg"}
            className="add-nft"
            // onClick={onClose}
            onClick={onOpen}
          />
        </div>
      )}
      <button onClick={unStaking}>안녕</button>
      <button onClick={charge}>돈 충전</button>
      <button onClick={myData}>결과는?</button>
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

        .nft-block.purple {
          background-color: var(--chakra-colors-purple-700);
        }
        .nft-block.green {
          background-color: var(--chakra-colors-green-700);
        }
        .nft-block.red {
          background-color: var(--chakra-colors-red-700);
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
