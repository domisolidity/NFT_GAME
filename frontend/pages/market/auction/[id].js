import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Image,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  Thead,
  Tbody,
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { todayTimeFormal } from "../../../hooks/currentTime";
import AuctionInfo from "../../../components/market/auction/AuctionInfo.jsx";
import Countdown from "../../../components/utils/Countdown";
import AuctionContract from "../../../contracts/artifacts/Auction.json";
import SideBarScreen from "../../../components/Layout/Frame/SideBarScreen";
import { FaCheckCircle } from "react-icons/fa";

const MarketDetail_auction = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account, auctionCreatorContract } = blockchain;
  const router = useRouter();
  const { id, grade, attributes, name, image, description, remainTime } = router.query;
  const [tokenOwner, setTokenOwner] = useState();
  const [auctionContract, setAuctionContract] = useState(0);
  const [bidHistory, setBidHistory] = useState([]);
  const [check, setCheck] = useState(false);
  const [isClaim, setIsClaim] = useState(false);
  const [initInfo, setInitInfo] = useState();
  const [auctionState, setAuctionState] = useState("경매 진행중");
  const [maxBid, setMaxBid] = useState(0);
  const [startBid, setStartBid] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qqqq, setqqqq] = useState(false);
  const [loading, setLoading] = useState(false);

  // @ 입찰하기 함수
  const placeBidNft = async () => {
    try {
      if (check == false) {
        alert("동의 여부에 체크해 주세요.");
        return;
      } else if (tokenOwner.toLowerCase() == account) {
        alert("시세조작 방지를 위해 자신이 판매하는 경매에 참여할 수 없습니다.");
        return;
      }
      const isHighestBidder = await auctionContract.methods.isHighestBidder().call({ from: account });
      const inputBid = web3.utils.toWei(maxBid, "ether");
      if (isHighestBidder == false && Number(inputBid) <= Number(startBid)) {
        alert("경매 시작가보다 더 높게 지불해야 합니다.");
        return;
      }
      setLoading(true);
      await auctionContract.methods
        .placeBid(Date.now())
        .send({ from: account, value: web3.utils.toWei(maxBid, "ether") })
        .then((res) => {
          const time = todayTimeFormal();
          console.log(time);
          console.log([...bidHistory, res.events.PlaceBidEvent.returnValues]);
          setBidHistory([...bidHistory, res.events.PlaceBidEvent.returnValues]);
          setLoading(false);
        });
      alert("성공");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // @ 경매 종료의 입찰금들 회수 함수
  const claimAuction = async () => {
    try {
      const isBidder = await auctionContract.methods.getBidAmount().call({ from: account });
      console.log(tokenOwner);
      console.log(account);

      if (tokenOwner.toLowerCase() == account && !isClaim) {
      } else if (tokenOwner.toLowerCase() == account && isClaim) {
        alert("이미 클레임 하셨습니다.");
        return;
      } else if (isBidder == 0) {
        alert("이미 클레임 하였거나 입찰 대상이 아닙니다.");
        return;
      }
      setLoading(true);
      await auctionContract.methods
        .finalizeAuction(id, Date.now())
        .send({ from: account })
        .then((res) => {
          if (tokenOwner.toLowerCase() == account) {
            setIsClaim(true);
          }
          console.log(res);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getAuctionContract = async () => {
    console.log("여기");
    await auctionCreatorContract.methods
      .getAuctionAddress(id)
      .call({ from: account })
      .then((address) => {
        const addr = new web3.eth.Contract(AuctionContract.abi, address);
        console.log(address);
        setAuctionContract(addr);
        addr.getPastEvents("PlaceBidEvent", { filter: { id: id }, fromBlock: 0, toBlock: "latest" }).then((res) => {
          let returnValuesArr = [];
          for (const history of res) {
            returnValuesArr.push(history.returnValues);
          }
          console.log(returnValuesArr);
          setBidHistory([...bidHistory, ...returnValuesArr]);
        });
      })
      .catch(console.error);
  };

  const getAuctionInfo = async () => {
    console.log(auctionContract);
    if (auctionContract) {
      await auctionContract.methods
        .getInitInfo()
        .call({ from: account })
        .then((res) => {
          console.log(res);
          setInitInfo(res);
          setStartBid(res[1]);
        })
        .catch(console.error());
      if (tokenOwner) return;
      await auctionContract.methods
        .getEoa()
        .call({ from: account })
        .then((res) => {
          console.log(res);
          setTokenOwner(res);
        })
        .catch(console.error());
    }
  };

  const getIsEnd = (data) => {
    setqqqq(data);
  };
  const endTimeAuction = () => {
    if (remainTime < Date.now()) {
      setAuctionState("경매 종료");
    }
  };

  useEffect(async () => {
    endTimeAuction();
  }, [qqqq]);
  useEffect(async () => {
    if (!account) return;
    await getAuctionContract();
    endTimeAuction();
  }, []);
  useEffect(async () => {
    if (!account) return;
    await getAuctionInfo();
    console.log(bidHistory);
  }, [account, bidHistory]);

  const options = [
    { id: 1, desc: "옥션 경매 수수료는 판매 확정 금액의 5% 만큼 발생합니다." },
    { id: 2, desc: "수수료는 판매자 부담입니다." },
    { id: 3, desc: "히스토리는 하단에서 확인 가능합니다." },
    { id: 4, desc: " 판매자는 낙찰가를 받게 됩니다." },
    {
      id: 5,
      desc: "낙찰자는 입찰 시 입력했던 최대 허용 입찰가에서,",
    },
    {
      id: 6,
      desc: "낙찰금액을 제외한 나머지 금액과 낙찰받은 NFT를 받게 됩니다.",
    },
    { id: 7, desc: "패찰자는 입찰 시 입력했던 최대 허용 입찰가를 돌려받게 됩니다." },
  ];

  const PackageTier = ({ options }) => {
    return (
      <Stack
        p={3}
        py={3}
        justifyContent={{
          base: "flex-start",
          md: "space-around",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
        alignItems={{ md: "center" }}
      >
        <List spacing={3} textAlign="start">
          {options.map((desc, id) => (
            <ListItem key={desc.id}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              {desc.desc}
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  };

  return (
    <Grid
      w="70vw"
      margin="0 auto"
      templateColumns="repeat(5,1fr)"
      templateRows="repeat(1,1fr)"
      gap={2}
      pt={{ base: "120px", md: "75px" }}
    >
      <GridItem colSpan={2} bg="whiteAlpha.100" borderRadius={"15px"}>
        <Flex direction="column">
          <Box borderRadius={"15px"}>
            <Image src={image} borderRadius={"15px 15px 0 0"} />
            <Box borderRadius={10} border="1px solid #302f2f">
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
                  JSON.parse(attributes).map((attr, i) => {
                    return (
                      <GridItem key={i} align="center" border="2px solid #2b7997" borderRadius={15}>
                        <Text fontWeight="bold">{attr.trait_type}</Text>
                        <Text>{attr.value}</Text>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Box>
        </Flex>
      </GridItem>

      <GridItem colSpan={3} bg="whiteAlpha.100" padding="5" borderRadius={"15px"} border="1px solid #302f2f">
        <Text
          borderRadius="10"
          p="1"
          align="center"
          w="65px"
          bg={grade == "red" ? "red.700" : grade == "green" ? "green.700" : "purple.700"}
        >
          {grade}
        </Text>
        <Heading>{name}</Heading>
        <Text mt="4">
          owned by <Text style={{ color: "skyblue" }}>{tokenOwner}</Text>
        </Text>
        <AuctionInfo
          auctionContract={auctionContract}
          info={initInfo}
          auctionState={auctionState}
          history={bidHistory[bidHistory.length - 1]}
        />
        <Countdown remain={remainTime} setEnd={getIsEnd} auctionContract={auctionContract} />
        <Box mt={15}>
          {auctionState == "경매 종료" ? (
            <>
              <Flex mt={10} justify="center">
                <Button
                  isLoading={loading ? 1 : null}
                  loadingText="Claiming.."
                  bg="green.600"
                  onClick={claimAuction}
                  mb={10}
                >
                  Claim
                </Button>
              </Flex>

              <PackageTier title={"NFT"} price={"가격"} options={options} />
            </>
          ) : (
            <>
              <Flex justify="center">
                <Text mr="5" lineHeight="10">
                  max bid
                </Text>
                <Input
                  mr="3"
                  w="30"
                  type="number"
                  placeholder="최대 허용 입찰가"
                  onChange={(e) => setMaxBid(e.target.value)}
                  mb={10}
                />
                <Button isLoading={loading ? 1 : null} loadingText="Bidding.." bg="red.600" onClick={onOpen}>
                  입찰하기
                </Button>
              </Flex>

              <PackageTier title={"NFT"} price={"가격"} options={options} />
            </>
          )}
          {/* 모달창 */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Check</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  name : {name} <br />
                  최대 허용 입찰가 : {maxBid} ETH
                  <Box>
                    <Checkbox onChange={() => setCheck(!check)}>구매 하는데 동의 하십니까</Checkbox>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      placeBidNft();
                      onClose();
                    }}
                  >
                    Confirm
                  </Button>
                  <Button
                    // colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      setCheck(false);
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                  {/* {agree ? } */}
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>
      </GridItem>

      <GridItem colSpan={5} bg="whiteAlpha.100" padding={5} borderRadius={"15px"}>
        {/* history */}

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="16px">
                  입찰 시간
                </Th>
                <Th textAlign="center" fontSize="16px">
                  입찰자
                </Th>
                <Th textAlign="center" fontSize="16px">
                  입찰가 현재 시세
                </Th>
                <Th textAlign="center" fontSize="16px">
                  입찰한 가격 합산
                </Th>
              </Tr>
            </Thead>
            {bidHistory[0]
              ? bidHistory.map((history, i) => {
                  return (
                    <Tbody key={i}>
                      <Tr>
                        <Td textAlign="center">{todayTimeFormal(Number(history.timestamp))}</Td>
                        <Td textAlign="center">{`${history.account.substr(0, 7)} ...... ${history.account.substr(
                          38,
                          41
                        )}`}</Td>
                        <Td textAlign="center">{web3.utils.fromWei(history.highestBindingBid, "ether")} eth</Td>
                        <Td textAlign="center">{web3.utils.fromWei(history.currentBid, "ether")} eth</Td>
                      </Tr>
                    </Tbody>
                  );
                })
              : null}
          </Table>
        </TableContainer>
        {!bidHistory[0] ? (
          <Text mt={5} textAlign="center">
            No data
          </Text>
        ) : null}
      </GridItem>
    </Grid>
  );
};

export default MarketDetail_auction;

// getLayout property
MarketDetail_auction.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
