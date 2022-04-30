import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
// import Loader from "./Loader";

const NftMint = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract } = blockchain;
  const [loading, setLoading] = useState(false);
  const [redNfts, setRedNft] = useState();
  const [greenNft, setGreenNft] = useState();
  const [purpleNft, setPurpleNft] = useState();
  const [success, setSuccess] = useState(false);
  const [myNftAmount, setMyNftAmount] = useState(0);
  const [redAmount, setRedAmount] = useState(0);
  const [greenAmount, setGreenAmount] = useState(0);
  const [purpleAmount, setPurpleAmount] = useState(0);

  // @ 민팅 함수
  const minting = async (grade) => {
    try {
      // 민팅 개수 확인
      if ((redAmount || greenAmount || purpleAmount) == 0) {
        alert("수량을 지정해주세요");
        return;
      }
      if (myNftAmount == 3) {
        alert("Nft는 최대 3개 까지만 민팅 가능합니다.");
        setLoading(false);
        return;
      }
      let price;
      let amount = 0;
      if (grade == 1) {
        price = "0.0003";
        amount = redAmount;
      } else if (grade == 2) {
        price = "0.0005";
        amount = greenAmount;
      } else if (grade == 3) {
        price = "0.001";
        amount = purpleAmount;
      }
      if (Number(myNftAmount) + amount > 3) {
        alert(
          `Nft는 최대 3번(갯수 기준) 까지 민팅 가능합니다. \n 현재 민팅 횟수 (${myNftAmount} / 3)`
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      //민팅 메서드 요청
      console.log(process.env.NEXT_PUBLIC_METADATA);
      await nftContract.methods
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
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Minting Success",
            text: "정상 적으로 민팅 되었습니다.",
            footer: `<a href="/mypage">마이페이지에서 확인</a>`,
          });
          setLoading(false);
          setSuccess(!success); // 남은 nft 업데이트하는 트리거 역할
        });
    } catch (error) {
      console.log("-에러 내용- \n", error);
      setLoading(false);
    }
  };

  // @ 남은 Nft 수량
  const remainedNft = async () => {
    try {
      console.log("durl");
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

  const myMingtingNftCount = async () => {
    try {
      await nftContract.methods
        .balanceOf(account)
        .call({ from: account })
        .then((res) => {
          setMyNftAmount(res);
        });
    } catch (error) {
      console.error;
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
    await myMingtingNftCount();

    // 언마운트 역할
    return () => {
      setMintedNft([]);
      setViewResult(false);
    };
  }, [account, success]);

  return (
    <>
      <Box w="400px" mb={70}>
        <Text fontSize="25" w="200px">
          <span>NFT Minting</span>
        </Text>
        <Text>
          <span className="small">{myNftAmount} / 3</span> <br />
          (민팅 Nft 수량)
        </Text>
      </Box>
      <Box mt="5">
        <Flex justify="space-around" w="70vw">
          <div className="card red" as={motion.div}>
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
                0.0003 ETH
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
                {(0.0003 * redAmount).toFixed(4)} ETH
              </Text>
            </Flex>
            <Box>
              <Button
                w={200}
                isLoading={loading ? 1 : null}
                loadingText="Minting.."
                bg="blackAlpha.300"
                variant="solid"
                onClick={() => minting(1)}
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
                0.0005 ETH
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
                {(0.0005 * greenAmount).toFixed(4)} ETH
              </Text>
            </Flex>
            <Box>
              <Button
                w={200}
                isLoading={loading ? 1 : null}
                loadingText="Minting.."
                bg="blackAlpha.300"
                variant="solid"
                onClick={() => minting(2)}
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
                0.001 ETH
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
                {(0.001 * purpleAmount).toFixed(4)} ETH
              </Text>
            </Flex>
            <Box>
              <Button
                w={200}
                className="minted"
                isLoading={loading ? 1 : null}
                loadingText="Minting.."
                bg="blackAlpha.300"
                variant="solid"
                onClick={() => minting(3)}
              >
                MINT
              </Button>
            </Box>
          </div>
        </Flex>
      </Box>
      <style jsx>{`
        span {
          font-size: 35px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }

        .small {
          font-size: 20px;
        }

        .card {
          width: 360px;
          height: 500px;
          border-radius: 10px;
          opacity: 0;
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
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
          animation: slideIn 0.3s linear 0s forwards;
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
          animation: slideIn 0.3s linear 0.2s forwards;
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
          animation: slideIn 0.3s linear 0.4s forwards;
        }
      `}</style>
    </>
  );
};

export default NftMint;
