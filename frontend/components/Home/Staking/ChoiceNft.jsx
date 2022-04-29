import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { regMainNft } from "../../../redux/blockchain/blockchainActions";
import GameInterface from "../../game/GameInterface";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const ChoiceNft = (props) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract, stakingContract } = blockchain;

  const { onClose, dateConverter } = props;

  const [myNfts, setMyNfts] = useState([]);
  const [selectNft, setSelectNft] = useState("");

  const baseUri = "https://gateway.pinata.cloud/ipfs/";

  const getMyNfts = async () => {
    try {
      await nftContract.methods
        .getMyToken(account)
        .call({ from: account })
        .then(async (result) => {
          console.log("getMyToken", result);
          let mynfts = [];
          if (!result) return true;
          for (const info of result) {
            if (info.uri == "") continue;
            const response = await axios.get(
              `${baseUri}${info.uri.slice(6)}/${info.id}.json`
            );
            console.log(`${baseUri}${info.uri.slice(6)}/${info.id}.json`);
            //console.log(_.cloneDeep(response.data.attributes));
            mynfts.push({
              id: info.id,
              grade: response.data.grade,
              attributes: response.data.attributes,
              name: response.data.name,
              image: `${baseUri}${response.data.image.slice(6)}`,
              description: response.data.description,
            });
          }
          setMyNfts(mynfts);
          console.log("myNft", mynfts);
        });
    } catch (error) {
      console.error();
    }
  };

  const getNftDetail = async (e) => {
    const tokenId = e.currentTarget.getAttribute("tokenId");
    handleClick(e);
    setSelectNft(tokenId);
  };

  useEffect(async () => {
    if (!account) return false;

    await getMyNfts();
  }, [account]);

  const clickedFocus = document.getElementsByClassName("forActive");
  function handleClick(e) {
    if (e.currentTarget.classList[1] === "active") {
      e.currentTarget.classList.remove("active");
    } else {
      for (var i = 0; i < clickedFocus.length; i++) {
        clickedFocus[i].classList.remove("active");
      }
      e.currentTarget.classList.add("active");
    }
  }

  let disable = "disable";
  if (selectNft) disable = "";

  const getSubmit = async () => {
    console.log(selectNft);

    if (!selectNft) return;

    // 스테이킹 컨트랙트에 NFT를 넘길 수 있는지
    // NFT 컨트랙트에 승인여부 확인하기
    const isApprovedForAll = await nftContract.methods
      .isApprovedForAll(account, stakingContract._address)
      .call({ from: account });
    // 승인되지 않은 상태면 승인상태로 바꾸기
    if (!isApprovedForAll && confirm(`스테이킹을 위한 권한을 부여합니다`)) {
      await nftContract.methods
        .setApprovalForAll(stakingContract._address, true)
        .send({ from: account })
        .then((result) => {
          if (result) {
            console.log(result);
          }
        });
    }
    const startTimestamp = parseInt(Date.now() / 1000);
    const endTimestamp = parseInt(
      await stakingContract.methods.setEndTime().call()
    );
    const endTime = dateConverter(endTimestamp);
    const reward = await stakingContract.methods
      .calcReward(selectNft, startTimestamp, endTimestamp)
      .call();
    if (
      !confirm(
        `해당 NFT를 스테이킹 합니다.\n스테이킹이 끝나게 될 시점은 ${endTime} 입니다.\n스테이킹이 끝나면 받게 될 보상은 토큰 ${reward}개로 예상됩니다.`
      )
    )
      return;
    const staking = await stakingContract.methods
      .nftStake(selectNft)
      .send({ from: account });

    if (staking) {
      const stakingData = await stakingContract.methods
        .getStakingData()
        .call({ from: account });

      let mainNftData;
      if (stakingData.tokenId == 0) {
        mainNftData = null;
      } else {
        const directoryUri = await nftContract.methods
          .tokenURI(stakingData.tokenId)
          .call();
        const response = await axios.get(
          `${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`
        );
        mainNftData = { stakingData: stakingData, mainNftJson: response.data };
      }
      alert(`${endTime}까지 유지됩니다`);
      await axios
        .post(`/api/users/profile/reg-token-id`, {
          account: account,
          tokenId: selectNft,
        })
        .then((res) => {
          console.log(res);
          dispatch(regMainNft({ mainNftData }));
        })
        .catch((err) => console.log(err));
      await GameInterface.missionReg(account, selectNft);

      onClose();
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <Thead>
            <Tr>
              <Th textAlign="center">ID</Th>
              <Th textAlign="center">NFT Name</Th>
              <Th textAlign="center">Grade</Th>
              <Th textAlign="center">Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {myNfts.length !== 0 ? (
              myNfts.map((info, index) => {
                return (
                  <tr
                    className="forActive"
                    key={index}
                    onClick={getNftDetail}
                    tokenId={info.id}
                  >
                    <Th textAlign="center">{info.id}</Th>
                    <Th textAlign="center">{info.name}</Th>
                    <Th textAlign="center">{info.grade}</Th>
                    <Th textAlign="center">
                      <Image
                        margin="0 auto"
                        src={info.image}
                        borderRadius="full"
                        boxSize="60px"
                      />
                    </Th>
                  </tr>
                );
              })
            ) : (
              <Tr>
                <Box>{/* <img src="/no-search.svg" /> */}</Box>
                {/* <Box className="not-found mt-4 "> Not Found </Box> */}
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="center">
        <Button m={5} onClick={getSubmit}>
          Confirm
        </Button>
        <Button m={5} onClick={onClose}>
          Cancel
        </Button>
      </Flex>
      <style jsx>{`
        .forActive:hover {
          background-color: var(--chakra-colors-whiteAlpha-100);
        }
        .forActive.active {
          background-color: var(--chakra-colors-teal-300);
        }
      `}</style>
    </>
  );
};

export default ChoiceNft;
