import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addAuctionList } from "../../redux/data/dataActions";
import { Box, Grid, GridItem, Flex, Image, Button, Heading, Text, Input } from "@chakra-ui/react";
import NftHistory from "../../components/mypage/NftHistory";

const NftDetail_my = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, nftContract, nftDealContract, auctionCreatorContract } = blockchain;
  const router = useRouter();
  const { id, grade, attributes, name, image, description } = router.query;

  const [isApproved, setIsApproved] = useState(false);
  const [price, setPrice] = useState();
  const [onsale, setOnSale] = useState(false);
  const [onAuction, setOnAuction] = useState(false);
  const [saleType, setSaleType] = useState(false);
  const [startingBid, setStartingBid] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // 경매 생성 함수
  const createAuction = async () => {
    try {
      if (onAuction) {
        alert("이미 경매 판매중입니다.");
      } else if (!startingBid || !expirationDate) {
        alert("가격 또는 종료일자를 입력해주세요");
        return false;
      }
      console.log("startingBid", startingBid);
      console.log("expirationDate", expirationDate);

      const startBid = web3.utils.toWei(startingBid, "ether");
      const startTime = Math.ceil(Date.now() / 1000);
      const endTime = Math.ceil(new Date(expirationDate).getTime() / 1000);
      console.log(startTime);
      console.log(endTime);

      // (종료시간 - 현재시간) / ms단위 / 블록생성주기
      // const currentBlock = await web3.eth.getBlockNumber();

      setLoading(true);
      await auctionCreatorContract.methods
        .createAuction(id, nftContract._address, startBid, startTime, endTime)
        .send({ from: account })
        .then((res) => {
          console.log("res", res);
          dispatch(addAuctionList(id, grade, attributes, name, image, description));
        });
      alert("경매 권한 승인");
      await auctionCreatorContract.methods
        .getAuctionAddress(id)
        .call({ from: account })
        .then(async (address) => {
          // const auctionContract = new web3.eth.Contract(AuctionContract.abi, address);
          // console.log(auctionContract);
          await nftContract.methods
            .setApprovalForAll(address, true)
            .send({ from: account })
            .then((res) => {
              console.log(res);
              setLoading(false);
            });
        });

      setOnAuction(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 판매 승인
  const approveSell = async (bool) => {
    try {
      setLoading2(true);
      console.log(!bool);
      console.log(nftDealContract._address);
      await nftContract.methods
        .setApprovalForAll(nftDealContract._address, !bool)
        .send({ from: account })
        .then((result) => {
          if (result) {
            console.log(result);
            setLoading2(false);
            isApprovedCheck();
          }
        });
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };

  // 판매 등록
  const submitSell = async () => {
    try {
      if (onsale) {
        alert("이미 판매중입니다.");
        return;
      }
      if (!isApproved) {
        alert("판매 승인을 먼저 받아주세요");
        return false;
      } else if (!price) {
        alert("가격을 입력해주세요");
        return false;
      }
      setLoading(true);
      await nftDealContract.methods
        .sellNft(id, web3.utils.toWei(price, "ether"))
        .send({ from: account })
        .then((result) => {
          console.log(result);
          setLoading(false);
          onSaleCheck();
        });
      console.log(id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // 판매 취소
  const cancelSellNft = async () => {
    try {
      setLoading(true);
      await nftDealContract.methods
        .cancelSell(id)
        .send({ from: account })
        .then((res) => {
          setLoading(false);
          console.log(res);
          onSaleCheck();
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const cancelAuctionNft = async () => {
  //   await auctionContract.
  // }
  // 허용여부 확인
  const isApprovedCheck = async () => {
    await nftContract.methods
      .isApprovedForAll(account, nftDealContract._address)
      .call()
      .then((result) => {
        setIsApproved(result);
      });
  };

  // 판매여부 확인
  const onSaleCheck = async () => {
    try {
      await nftDealContract.methods
        .onSale(id)
        .call({ from: account })
        .then((result) => {
          console.log(result);
          setOnSale(result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBlockNumber = (e) => {
    setExpirationDate(e.target.value);
  };

  useEffect(async () => {
    if (!account) return false;
    await isApprovedCheck();
    await onSaleCheck();
  }, [account]);

  return (
    <>
      <Grid w="70vw" margin="0 auto" templateColumns="repeat(5,1fr)" templateRows="repeat(1,1fr)" gap={2}>
        <GridItem colSpan={2} bg="whiteAlpha.100">
          <Flex direction="column">
            <Image src={image} borderRadius={10} />
            <Box borderRadius={10} border="1px solid #302f2f" mt="2">
              <Heading size="sm" bg="#182749" padding="3">
                Description
              </Heading>
              <Text fontSize="15" padding="3">
                {description}
              </Text>
            </Box>
            <Box borderRadius={10} bg="##1E315F" border="1px solid #302f2f">
              <Heading size="sm" bg="#182749" padding="3">
                Properties
              </Heading>
              <Grid templateColumns="repeat(3,1fr)" padding="5" gap={1}>
                {attributes &&
                  JSON.parse(attributes).map((attribute, i) => {
                    return (
                      <GridItem key={i} align="center" border="2px solid #2b7997" borderRadius={15}>
                        <Text fontWeight="bold">{attribute.trait_type}</Text>
                        <Text>{attribute.value}</Text>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} bg="whiteAlpha.100" padding="5">
          <Text
            borderRadius={20}
            bg={grade == "red" ? "red.700" : grade == "green" ? "green.700" : "purple.700"}
            w="10%"
            padding={1}
            align="center"
          >
            {grade}
          </Text>
          <Heading>{name}</Heading>
          <Text>
            owned by <span style={{ color: "skyblue" }}>you</span>
          </Text>
          <Box mt={20} p="20px 30px" bg="whiteAlpha.100" border="1px solid #6d6969bd" borderRadius={10}>
            <Heading size="lg" display="inline">
              Sell
              {onsale ? (
                <Text fontSize="15" display="inline-block" bg="#e28a37" borderRadius="20" ml="2" p="1">
                  일반 판매중
                </Text>
              ) : isApproved ? (
                <Text fontSize="15" display="inline-block" bg="#2d7a47" borderRadius="20" ml="2" p="1">
                  판매 가능
                </Text>
              ) : onAuction ? (
                <Text fontSize="15" display="inline-block" bg="#e28a37" borderRadius="20" ml="2" p="1">
                  경매 진행중
                </Text>
              ) : (
                <Text fontSize="15" display="inline-block" bg="#9e2d2d" borderRadius="20" ml="2" p="1">
                  판매 승인 필요
                </Text>
              )}
            </Heading>
            <Text mt="5">Type</Text>
            <Flex justify="space-around">
              <Button onClick={() => setSaleType(false)} p="10">
                Fixed Price
              </Button>
              <Button onClick={() => setSaleType(true)} p="10">
                Timed Action
              </Button>
            </Flex>
            {!saleType ? (
              <>
                {onsale ? (
                  <Flex justify="center" mt="10">
                    <Button isLoading={loading ? 1 : null} loadingText="Canceling.." onClick={cancelSellNft}>
                      {" "}
                      판매 취소{" "}
                    </Button>
                  </Flex>
                ) : (
                  <>
                    <Flex justify="center" mt="10">
                      <Text lineHeight={10} mr="5">
                        판매 가격 등록 :
                      </Text>
                      <Input w="200" onChange={(e) => setPrice(e.target.value)} />
                      <Text lineHeight={10} ml="2">
                        eth
                      </Text>
                    </Flex>
                    <Flex justify="center" mt="10">
                      <Button
                        isLoading={loading2 ? 1 : null}
                        loadingText="approving.."
                        onClick={() => approveSell(isApproved)}
                        colorScheme="linkedin"
                        disabled={onAuction || loading ? 1 : 0}
                      >
                        {isApproved ? <span>판매 권한 철회</span> : <span>판매 권한 승인</span>}
                      </Button>
                      <Button
                        isLoading={loading ? 1 : null}
                        loadingText="add marketPlace.."
                        ml="5"
                        onClick={submitSell}
                        colorScheme="linkedin"
                        disabled={onAuction || loading2 ? 1 : 0}
                      >
                        판매 등록
                      </Button>
                    </Flex>
                  </>
                )}
              </>
            ) : (
              <>
                {onAuction ? (
                  <Text mt="10" align="center">
                    경매가 진행중입니다. 경매 관리는 마켓에 등록된 경매건에서 가능합니다.
                  </Text>
                ) : (
                  <Box mt="10">
                    <Flex justify="space-between">
                      <Text>입찰 시작가</Text>
                      <Box>
                        Eth <Input w="60" onChange={(e) => setStartingBid(e.target.value)} />
                      </Box>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>경매 종료일</Text>
                      <Input w="60" type="datetime-local" onChange={convertToBlockNumber} />
                    </Flex>
                    <Flex justify="center" mt="10">
                      <Button
                        isLoading={loading ? 1 : null}
                        loadingText="adding.."
                        ml="5"
                        onClick={createAuction}
                        colorScheme="linkedin"
                        disabled={onsale ? 1 : 0}
                      >
                        {" "}
                        경매 등록
                      </Button>
                    </Flex>
                  </Box>
                )}
              </>
            )}
          </Box>
          <Box mt="5"></Box>
          <Box mt={10} p="20px 30px" bg="whiteAlpha.100" border="1px solid #6d6969bd" borderRadius={10}>
            <Heading size="lg">Present</Heading>
            <Flex justify="center">
              <Text lineHeight={10} mr="10">
                {" "}
                to Address
              </Text>{" "}
              <Input w="200" />
              <Button ml="2" colorScheme="linkedin" disabled={onAuction || onsale || loading || loading2 ? 1 : 0}>
                Present
              </Button>
            </Flex>
          </Box>
        </GridItem>

        <GridItem colSpan={5} bg="whiteAlpha.100" padding={5}>
          <NftHistory tokenId={id} />
        </GridItem>
      </Grid>
    </>
  );
};

export default NftDetail_my;
