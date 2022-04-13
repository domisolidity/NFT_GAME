import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import NftCard from "./NftCard.jsx";
import axios from "axios";

const NftMint = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract } = blockchain;
  console.log("nftContract", nftContract);
  const [loading, setLoading] = useState(false);
  const [redNfts, setRedNft] = useState();
  const [greenNft, setGreenNft] = useState();
  const [purpleNft, setPurpleNft] = useState();
  const [success, setSuccess] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [mintedNft, setMintedNft] = useState();
  const [redAmount, setRedAmount] = useState(0);
  const [greenAmount, setGreenAmount] = useState(0);
  const [purpleAmount, setPurpleAmount] = useState(0);

  // @ 민팅 함수
  const minting = async (grade) => {
    try {
      setLoading(true);
      console.log(grade);
      let price;
      let amount;
      if (grade == "red") {
        price = "0.3";
        amount = redAmount;
      } else if (grade == "green") {
        price = "0.5";
        amount = greenAmount;
      } else if (grade == "purple") {
        price = "1";
        amount = purpleAmount;
      }

      //민팅 메서드 요청
      const response = await nftContract.methods
        .create(
          account,
          process.env.NEXT_PUBLIC_METADATA,
          grade,
          amount,
          Date.now()
        )
        .send({
          from: account,
          value: web3.utils.toWei(price, "ether") * amount,
        });

      //민팅 성공시
      if (response) {
        const baseUrl = "http://127.0.0.1:8080/ipfs";
        setLoading(false);
        // 민팅한 nft정보 불러오기
        const result = await nftContract.methods
          .getMyLastNft(account)
          .call({ from: account });

        await axios
          .get(`${baseUrl}${result.uri.slice(6)}/${result.id}.json`)
          .then((res) => {
            console.log(res);
            console.log(res.data.attributes);

            setMintedNft({
              id: result.id,
              grade: res.data.grade,
              attributes: res.data.attributes,
              name: res.data.name,
              image: `${baseUrl}${res.data.image.slice(6)}`,
              description: res.data.description,
            });
          });
        setViewResult(true); // 민팅시 nft정보 띄우는 트리거 역할
        document
          .querySelector(".minted")
          .scrollIntoView({ behavior: "smooth", block: "start" });
        success ? setSuccess(false) : setSuccess(true); // 남은 nft 업데이트하는 트리거 역할

        // Swal.fire({
        //   icon: "success",
        //   title: "Minting Success",
        //   text: "정상 적으로 민팅 되었습니다.",
        //   footer: `<a href="/mypage">마이페이지에서 확인</a>`,
        // });
      }
    } catch (error) {
      console.log("-에러 내용- \n", error);
      setLoading(false);
    }
  };

  // @ 남은 Nft 수량
  const remainedNft = async () => {
    try {
      await nftContract.methods
        .remainNfts()
        .call()
        .then((result) => {
          console.log(result);
          setRedNft(result[0]);
          setGreenNft(result[1]);
          setPurpleNft(result[2]);
        });
    } catch (error) {
      console.log("-에러 내용- \n", error);
    }
  };

  const increaseAmount = (grade) => {
    if (grade == "red") {
      if (redAmount == 3) {
        alert("최대 3개까지 구매 가능");
        return;
      }
      setRedAmount(redAmount + 1);
    } else if (grade == "green") {
      if (greenAmount == 3) {
        alert("최대 3개까지 구매 가능");
        return;
      }
      setGreenAmount(greenAmount + 1);
    } else if (grade == "purple") {
      if (purpleAmount == 3) {
        alert("최대 3개까지 구매 가능");
        return;
      }
      setPurpleAmount(purpleAmount + 1);
    }
  };

  const decreaseAmount = (grade) => {
    if (grade == "red") {
      if (redAmount == 0) return;
      setRedAmount(redAmount - 1);
    } else if (grade == "green") {
      if (greenAmount == 0) return;
      setGreenAmount(greenAmount - 1);
    } else if (grade == "purple") {
      if (purpleAmount == 0) return;
      setPurpleAmount(purpleAmount - 1);
    }
  };

  useEffect(async () => {
    if (!account) return;
    await remainedNft();

    // 언마운트 역할
    return () => {
      setViewResult(false);
    };
  }, [account, success]);

  return (
    <Box mt="5">
      <Flex justify="space-around" w="70vw">
        <div className="card red">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {redNfts} / 60
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={2}>
            Holder NFT <br /> Red
          </Text>
          <Text fontSize={16}>(홀더 인증용 NFT)</Text>

          <Flex justify="center" mt="5vh" mb="5">
            <Text lineHeight="8" mr="3">
              price
            </Text>
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              0.3 ETH
            </Text>
          </Flex>
          <Flex justify="center" mb="5">
            <Button variant="ghost" onClick={() => decreaseAmount("red")}>
              -
            </Button>
            <Text m="0px 10px" lineHeight="10">
              {redAmount}
            </Text>
            <Button variant="ghost" onClick={() => increaseAmount("red")}>
              +
            </Button>
          </Flex>
          <Flex justify="center" mb="4vh">
            <Text lineHeight="8" mr="3">
              Total
            </Text>
            <Image
              display="inline"
              src={"/images/eth.svg"}
              mr={2}
              boxSize="2rem"
              bg="whiteAlpha.100"
              borderRadius={50}
            />
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              {(0.3 * redAmount).toFixed(1)} ETH
            </Text>
          </Flex>
          <Box>
            <Button
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              bg="blackAlpha.300"
              variant="solid"
              onClick={() => minting("red")}
            >
              MINT
            </Button>
          </Box>
        </div>

        <div className="card green">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {greenNft} / 30
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={2}>
            Holder NFT <br /> Green
          </Text>
          <Text fontSize={16}>(홀더 인증용 NFT)</Text>

          <Flex justify="center" mt="5vh" mb="5">
            <Text lineHeight="8" mr="3">
              price
            </Text>
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              0.5 ETH
            </Text>
          </Flex>
          <Flex justify="center" mb="5">
            <Button variant="ghost" onClick={() => decreaseAmount("green")}>
              -
            </Button>
            <Text m="0px 10px" lineHeight="10">
              {greenAmount}
            </Text>
            <Button variant="ghost" onClick={() => increaseAmount("green")}>
              +
            </Button>
          </Flex>
          <Flex justify="center" mb="4vh">
            <Text lineHeight="8" mr="3">
              Total
            </Text>
            <Image
              display="inline"
              src={"/images/eth.svg"}
              mr={2}
              boxSize="2rem"
              bg="whiteAlpha.100"
              borderRadius={50}
            />
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              {(0.5 * greenAmount).toFixed(1)} ETH
            </Text>
          </Flex>
          <Box>
            <Button
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              bg="blackAlpha.300"
              variant="solid"
              onClick={() => minting("green")}
            >
              MINT
            </Button>
          </Box>
        </div>

        <div className="card purple">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {purpleNft} / 10
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={2}>
            Holder NFT <br /> Purple
          </Text>
          <Text fontSize={16}>(홀더 인증용 NFT)</Text>

          <Flex justify="center" mt="5vh" mb="5">
            <Text lineHeight="8" mr="3">
              price
            </Text>
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              1.0 ETH
            </Text>
          </Flex>
          <Flex justify="center" mb="5">
            <Button variant="ghost" onClick={() => decreaseAmount("purple")}>
              -
            </Button>
            <Text m="0px 10px" lineHeight="10">
              {purpleAmount}
            </Text>
            <Button variant="ghost" onClick={() => increaseAmount("purple")}>
              +
            </Button>
          </Flex>
          <Flex justify="center" mb="4vh">
            <Text lineHeight="8" mr="3">
              Total
            </Text>
            <Image
              display="inline"
              src={"/images/eth.svg"}
              mr={2}
              boxSize="2rem"
              bg="whiteAlpha.100"
              borderRadius={50}
            />
            <Text
              display="inline"
              verticalAlign={8}
              fontSize="xl"
              fontWeight="700"
            >
              {(1 * purpleAmount).toFixed(1)} ETH
            </Text>
          </Flex>
          <Box>
            <Button
              className="minted"
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              bg="blackAlpha.300"
              variant="solid"
              onClick={() => minting("purple")}
            >
              MINT
            </Button>
          </Box>
        </div>
      </Flex>
      {viewResult && (
        <>
          <Text mt="150" fontSize="25">
            <span>Minting Nft</span>
          </Text>
          <Box
            bg="#000000b3"
            minW={"600px"}
            w="70vw"
            padding="10"
            borderRadius="20"
            mt="70"
          >
            <Flex justify="space-around" w="70vw">
              <NftCard nftInfo={mintedNft} />;
              {/* {mintedNft &&
                mintedNft.map((i, nft) => {
                  <NftCard key={i} nftInfo={nft} />;
                })}{" "} */}
            </Flex>
          </Box>
        </>
      )}

      <style jsx>{`
        span {
          font-size: 35px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }

        .card {
          width: 360px;
          height: 500px;
          border-radius: 10px;
        }
        .red {
          border: 2px solid #917a7a;
          background-image: linear-gradient(
            310deg,
            hsl(344deg 69% 43%) 0%,
            hsl(342deg 74% 37%) 9%,
            hsl(340deg 78% 30%) 19%,
            hsl(338deg 83% 24%) 28%,
            hsl(336deg 88% 18%) 37%,
            hsl(334deg 93% 13%) 47%,
            hsl(334deg 93% 13%) 56%,
            hsl(336deg 88% 18%) 65%,
            hsl(338deg 83% 24%) 74%,
            hsl(340deg 78% 30%) 83%,
            hsl(342deg 74% 37%) 92%,
            hsl(344deg 69% 43%) 100%
          );
        }
        .green {
          border: 2px solid #5c8665;
          background-image: linear-gradient(
            305deg,
            hsl(114deg 100% 20%) 0%,
            hsl(117deg 92% 18%) 11%,
            hsl(120deg 85% 15%) 22%,
            hsl(121deg 85% 12%) 33%,
            hsl(117deg 89% 9%) 44%,
            hsl(117deg 89% 9%) 55%,
            hsl(121deg 85% 12%) 65%,
            hsl(120deg 85% 15%) 77%,
            hsl(117deg 92% 18%) 88%,
            hsl(114deg 100% 20%) 100%
          );
        }

        .purple {
          border: 2px solid #78709c;
          background-image: linear-gradient(
            310deg,
            hsl(256deg 64% 39%) 0%,
            hsl(253deg 61% 34%) 8%,
            hsl(249deg 58% 29%) 17%,
            hsl(247deg 55% 23%) 27%,
            hsl(245deg 52% 18%) 37%,
            hsl(246deg 50% 13%) 47%,
            hsl(246deg 50% 13%) 57%,
            hsl(245deg 52% 18%) 67%,
            hsl(247deg 55% 23%) 76%,
            hsl(249deg 58% 29%) 85%,
            hsl(253deg 61% 34%) 93%,
            hsl(256deg 64% 39%) 100%
          );
        }
      `}</style>
    </Box>
  );
};

export default NftMint;
