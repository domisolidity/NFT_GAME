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

  const { onClose } = props;

  const [myNfts, setMyNfts] = useState([]);
  const [currentMainNft, setcurrentMainNft] = useState("");
  const [selectNft, setSelectNft] = useState("");

  const baseUri = "http://127.0.0.1:8080/ipfs";
  const LS_KEY = "login-with-metamask:auth";
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);
  }, [accessToken]);

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
    console.log(tokenId);
    handleClick(e);
    setSelectNft(tokenId);
  };

  useEffect(async () => {
    if (!account) return false;

    await getMyNfts();
  }, [account]);

  const clickedFocus = document.getElementsByClassName("forActive");

  function handleClick(event) {
    console.log(clickedFocus);
    // console.log(event.target);
    // console.log(this);
    // 콘솔창을 보면 둘다 동일한 값이 나온다

    console.log(event.target.classList);

    if (event.target.classList[1] === "active") {
      event.target.classList.remove("active");
    } else {
      for (var i = 0; i < clickedFocus.length; i++) {
        clickedFocus[i].classList.remove("active");
      }
      event.target.classList.add("active");
    }
  }

  let disable = "disable";
  if (selectNft) disable = "";

  const getSubmit = async () => {
    console.log(selectNft);

    if (!selectNft) return;

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    const variables = {
      mainNft: selectNft,
    };

    const isApprovedForAll = await nftContract.methods
      .isApprovedForAll(account, stakingContract._address)
      .call();
    if (!isApprovedForAll) {
      await nftContract.methods
        .setApprovalForAll(stakingContract._address, true)
        .send({ from: account })
        .then((result) => {
          if (result) {
            console.log(result);
          }
        });
    }
    const asdf = await nftContract.methods.ownerOf(selectNft).call();
    console.log(asdf);
    const staking = await stakingContract.methods
      .nftStake(selectNft)
      .send({ from: account });

    console.log(staking);
    if (staking.status) {
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
      dispatch(regMainNft({ mainNftData }));
      setcurrentMainNft(selectNft);
      alert("한 주간 유지됩니다.");
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
                  <Tr
                    className="forActive"
                    key={index}
                    onClick={getNftDetail}
                    tokenId={info.id}
                    _hover={{
                      bg: "teal.600",
                    }}
                    _focus={{
                      bg: "teal.600",
                    }}
                    _active={{
                      bg: "teal.600",
                    }}
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
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Box>{/* <img src="/no-search.svg" /> */}</Box>
                {/* <Box className="not-found mt-4 "> Not Found </Box> */}
              </Tr>
            )}
          </Tbody>
          {/* <Tfoot>
          <Tr>
            <Th></Th>
            <Th>
              <Button>Confirm</Button>
            </Th>
            <Th></Th>
            <Th>
              <Button>Cancel</Button>
            </Th>
          </Tr>
        </Tfoot> */}
        </Table>
      </TableContainer>
      <Flex justify="center">
        <Button m={5} onClick={getSubmit}>
          Confirm
        </Button>
        <Button m={5}>Cancel</Button>
      </Flex>
    </>

    // <Box className="shell overflow-hidden anim-scale-in position-relative ">
    //   <Box className="content">
    //     <Box className="nft-row nft-header-label">
    //       <Box className="nft-id">ID</Box>
    //       <Box className="nft-name">NFT Name</Box>
    //       <Box className="nft-grade">Grade</Box>
    //       <Box className="nft-image">Image</Box>
    //     </Box>

    //     {myNfts.length !== 0 ? (
    //       myNfts.map((info, index) => {
    //         return (
    //           <Box
    //             key={index}
    //             className={"nft-row nft-body"}
    //             onClick={getNftDetail}
    //             tokenId={info.id}
    //           >
    //             <Box className="nft-id">{info.id}</Box>
    //             <Box className="nft-name">{info.name}</Box>
    //             <Box className="nft-grade">{info.grade}</Box>
    //             <Box className="nft-image">
    //               <img src={info.image} />
    //             </Box>
    //           </Box>
    //         );
    //       })
    //     ) : (
    //       <Box className="blank-state">
    //         <Box>
    //           <img src="/no-search.svg" />
    //         </Box>
    //         <Box className="not-found mt-4 "> Not Found </Box>
    //       </Box>
    //     )}
    //   </Box>
    //   <Box className="retangle"></Box>
    //   <Box className="button-flex button-footer">
    //     <button
    //       className={`button button-wrapper button ${disable}`}
    //       type="submit"
    //       onClick={getSubmit}
    //     >
    //       <span>Confirm</span>
    //     </button>

    //     <button
    //       className="button button button-cancel"
    //       type="button"
    //       onClick={onClose}
    //     >
    //       Cancel
    //     </button>
    //   </Box>

    // <style jsx>{`
    //   .shell {
    //     display: flex;
    //     flex-direction: column;
    //     z-index: 999;
    //     margin: 0 auto;
    //     width: 100%;
    //     max-height: 90%;
    //     border-radius: 25px;
    //     background-color: #0f263e;
    //     padding-left: 0 !important;
    //     padding-right: 0 !important;
    //     max-width: 810px;
    //   }
    //   .border-0,
    //   .shell {
    //     border: 0 !important;
    //     margin: 0 !important;
    //   }
    //   .overflow-hidden {
    //     overflow: hidden !important;
    //   }
    //   .position-relative {
    //     position: relative !important;
    //   }
    //   .anim-scale-in {
    //     animation-name: scale-in;
    //     animation-duration: 0.15s;
    //     animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
    //   }
    //   .position-relative {
    //     position: relative !important;
    //   }
    //   .overflow-hidden {
    //     overflow: hidden !important;
    //   }
    //   .header-title {
    //     font-weight: 700;
    //     font-size: 22px;
    //     line-height: 35px;
    //     color: #f9f9f9;
    //     padding: 20px 40px;
    //     background: #1b3148;
    //   }
    //   .content {
    //     padding: 0;
    //     max-height: 300px;
    //     overflow-y: auto;
    //     position: relative;
    //   }
    //   .nft-row.nft-header-label {
    //     position: sticky;
    //     width: 100%;
    //     top: 0;
    //     background: #0f263e;
    //     /*color: hsla(0, 0%, 100%, 0.4); */
    //   }
    //   .nft-row {
    //     padding: 8px 40px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //   }

    //   .nft-row.nft-body {
    //     background: #0f263e;
    //     color: hsla(0, 0%, 100%, 0.4);
    //     cursor: pointer;
    //     text-align: center;
    //   }
    //   .nft-row.nft-body > Box {
    //     pointer-events: none;
    //   }
    //   .nft-row.nft-body:hover {
    //     color: white;
    //     background: #303844 !important;
    //   }

    //   .nft-row.nft-body.clicked {
    //     color: white;
    //     background: #f47820 !important;
    //   }

    //   .nft-id {
    //     width: 10%;
    //     text-align: center;
    //   }
    //   .nft-name {
    //     text-align: center;
    //     width: 40%;
    //   }
    //   .nft-grade {
    //     width: 20%;
    //     text-align: center;
    //   }
    //   .nft-image {
    //     width: 20%;
    //     text-align: center;
    //   }
    //   .nft-image > img {
    //     width: 50%;
    //     border-radius: 50%;
    //     text-align: center;
    //     display: block;
    //     margin: auto;
    //   }
    //   .blank-state {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     padding: 16px;
    //   }

    //   img {
    //     border-style: none;
    //   }
    //   img,
    //   svg {
    //     vertical-align: middle;
    //   }
    //   .not-found {
    //     color: hsla(0, 0%, 100%, 0.4);
    //   }
    //   .mt-4 {
    //     margin-top: 24px !important;
    //   }
    //   .mt-4,
    //   .my-4 {
    //     margin-top: 1.5rem !important;
    //   }
    //   .retangle {
    //     width: 100%;
    //     height: 1px;
    //     background-color: rgba(0, 0, 0, 0.08);
    //     margin-bottom: 16px;
    //   }
    //   .button-footer {
    //     padding: 0 20px;
    //   }
    //   .button-flex {
    //     display: flex;
    //     justify-content: space-around;
    //     align-items: center;
    //   }
    //   .button-wrapper.button.disable {
    //     background: #f47820;
    //     opacity: 0.4;
    //     cursor: not-allowed;
    //   }
  );
};

export default ChoiceNft;