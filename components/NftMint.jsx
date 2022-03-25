import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const NftMint = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract } = blockchain;
  console.log("nftContract", nftContract);
  const [loading, setLoading] = useState(false);
  const [redNfts, setRedNft] = useState();
  const [greenNft, setGreenNft] = useState();
  const [purpleNft, setPurpleNft] = useState();
  const [success, setSuccess] = useState("ss");

  // @ 민팅 함수
  const minting = async (grade) => {
    console.log(grade);
    try {
      setLoading(true);
      console.log(grade);
      let price;
      if (grade == "red") {
        price = "0.3";
      } else if (grade == "green") {
        price = "0.5";
      } else if (grade == "purple") {
        console.log(grade);
        console.log("purple");
        price = "1";
      }
      console.log(price);
      const response = await nftContract.methods
        .create(account, process.env.NEXT_PUBLIC_METADATA, grade)
        .send({ from: account, value: web3.utils.toWei(price, "ether") });
      console.log("response !!", response);
      if (response) {
        setLoading(false);
        success == "ss" ? setSuccess("qq") : setSuccess("ss");
        Swal.fire({
          icon: "success",
          title: "Minting Success",
          text: "정상 적으로 민팅 되었습니다.",
          footer: `<a href="/mypage">마이페이지에서 확인</a>`,
        });
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

  useEffect(async () => {
    if (!account) {
      return false;
    }
    await remainedNft();
  }, [account]);

  useEffect(async () => {
    if (!account) {
      // await getMyNftDetail();
      return false;
    }
    await remainedNft();
  }, [success]);

  return (
    <Box mt={6}>
      <Flex justify="space-around" w="70vw">
        <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#b42020)">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {redNfts} / 60
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={10}>
            Holder NFT <br /> Red
          </Text>
          <Text fontSize={16} mt={4}>
            (홀더 인증용 NFT)
          </Text>
          <Flex justify="space-around" padding={10} mt={6}>
            <Box>
              <Image
                display="inline"
                src={"/images/eth.svg"}
                mr={10}
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
                0.3 ETH
              </Text>
            </Box>
          </Flex>
          <Box>
            <Button
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              colorScheme="teal"
              variant="solid"
              onClick={() => minting("red")}
            >
              MINT
            </Button>
          </Box>
        </Box>
        {/* Green  */}
        <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#549254)">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {greenNft} / 30
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={10}>
            Holder NFT <br /> Green
          </Text>
          <Text fontSize={16} mt={4}>
            (홀더 인증용 NFT)
          </Text>
          <Flex justify="space-around" padding={10} mt={6}>
            <Box>
              <Image
                display="inline"
                src={"/images/eth.svg"}
                mr={10}
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
                0.5 ETH
              </Text>
            </Box>
          </Flex>
          <Box>
            <Button
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              colorScheme="teal"
              variant="solid"
              onClick={() => minting("green")}
            >
              MINT
            </Button>
          </Box>
        </Box>
        <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#9b61ca)">
          <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
            Nfts : {purpleNft} / 10
          </Text>
          <Text fontSize={28} fontWeight="bold" mt={10}>
            Holder NFT <br /> Purple
          </Text>
          <Text fontSize={16} mt={4}>
            (홀더 인증용 NFT)
          </Text>
          <Flex justify="space-around" padding={10} mt={6}>
            <Box>
              <Image
                display="inline"
                src={"/images/eth.svg"}
                mr={10}
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
                1 ETH
              </Text>
            </Box>
          </Flex>
          <Box>
            <Button
              disabled={loading ? 1 : 0}
              w={200}
              loadingText="Minting.."
              colorScheme="teal"
              variant="solid"
              onClick={() => minting("purple")}
            >
              MINT
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default NftMint;
