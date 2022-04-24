import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Box,
  Button,
  Heading,
  Table,
  Flex,
  Image,
  Checkbox,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";

const RankingReword = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, gameTokenContract, claim20_Contract } = blockchain;

  const [rankData, setRankData] = useState();
  const [selectedRankData, setSelectedRankData] = useState();
  const [isRankData, setIsRankData] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const owner = process.env.NEXT_PUBLIC_OWNER;

  // step 1) 랭킹 정보 불러오기
  const importRank = async () => {
    await axios
      .get("/api/ranks")
      .then(async (rank) => {
        const rankResult = [];
        for (let i = 0; i < rank.data.length; i++) {
          rankResult.push(Object.values(rank.data[i]));
        }
        setRankData(rankResult);
        setIsRankData(true);
      })
      .catch(console.error());
  };

  // step 2) 데이터 선택
  const selectRankData = async () => {
    if (checkedItems.length == 0) {
      alert("아무것도 선택되지 않았습니다. 클레임 허용할 계정을 체크해주세요");
      return;
    }
    let selectedRankData = [];
    console.log(checkedItems);
    console.log(rankData);
    let totalCount = 0;
    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i] == true) {
        selectedRankData.push(rankData[i]);
        if (rankData[i][1] == 1) {
          totalCount += 50;
        } else if (rankData[i][1] == 2) {
          totalCount += 30;
        } else if (rankData[i][1] == 3) {
          totalCount += 10;
        }
      }
    }
    setTotalAllowance(totalCount);
    setSelectedRankData(selectedRankData);
    setIsRankData(false);
    setNextStep(true);
  };

  // step 3) 선택한 데이터에 대한 보상량 승인 작업
  const approveRankClaim = async () => {
    try {
      if (account != owner) {
        alert("권한이 없습니다.");
        return;
      }
      console.log("selectedRankData", selectedRankData);

      setLoading(true);
      // 1) 클레임 컨트랙트 주소로 토큰 이동
      await gameTokenContract.methods
        .transfer(claim20_Contract._address, totalAllowance)
        .send({ from: account })
        .then((res) => {
          console.log(res);
          alert("다음은 랭커별 인출 허용량 지정에 대한 승인 서명입니다.");
        });

      // 2) 랭커(조건)별 allowance 지정
      console.log(selectedRankData);
      await claim20_Contract.methods
        .approveClaim_rank(selectedRankData)
        .send({ from: account })
        .then(async (res) => {
          console.log(res);
          // 3) db에 approve 된 상태로 업데이트
          await axios.post("/api/ranks/approved", { rank: selectedRankData }).then(() => {
            alert("승인 작업 완료");
            setNextStep(false);
            setLastStep(true);
          });
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const previousStep = () => {
    if (isRankData) {
      setIsRankData(false);
      setTotalAllowance(0);
    } else {
      setNextStep(false);
      setIsRankData(true);
    }
  };

  const initStep = () => {
    setNextStep(false);
    setIsRankData(false);
    setLastStep(false);
  };

  useEffect(() => {
    if (!account) return;
  }, [account]);

  return (
    <Box pt={{ base: "120px", md: "75px" }}>
      <Flex justify="space-between">
        <Box>
          <Heading display="inline">
            <Image src="/images/icons/trophyIcon.png" display="inline" boxSize="35" mr="4" />
            <span>Managing Ranking Reward</span>
          </Heading>
          <Text ml="20" mt="5">
            {" "}
            주간 랭킹 정보를 확인하고 랭킹 정보에 따라 클레임 허용여부를 관리할 수 있습니다.
          </Text>
        </Box>
        <Link href={"/admin"}>
          <a>
            <Button bg="whiteAlpha.300">관리자 홈으로</Button>
          </a>
        </Link>
      </Flex>
      {isRankData ? (
        <TableContainer align="center" mt="10">
          <Text fontSize="30"> step 2 </Text> 계정 선택
          <Table border="1px solid gray" mt="5" w="80%">
            <TableCaption>
              <Button bg="#414fa28f" onClick={previousStep} mr="2">
                뒤로 가기
              </Button>
              <Button bg="#414fa28f" onClick={selectRankData}>
                선택 완료
              </Button>
            </TableCaption>
            <Thead bg="#whiteAlpha.200">
              <Tr>
                <Th>
                  <Checkbox
                    colorScheme="green"
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) => {
                      let checkedTarget = [];
                      for (let i = 0; i < rankData.length; i++) {
                        checkedTarget.push(e.target.checked);
                      }
                      setCheckedItems(checkedTarget);
                    }}
                  />
                </Th>
                {/* <Th>weeks</Th> */}
                <Th>game title</Th>
                <Th>rank</Th>
                <Th>address</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rankData &&
                rankData.map((rank, index) => {
                  return (
                    <Tr key={index} bg={rank[2] == "블록쌓기" && "whiteAlpha.200"}>
                      <Td>
                        <Checkbox
                          colorScheme="green"
                          isChecked={checkedItems[index]}
                          onChange={(e) => {
                            let checkedTarget2 = [];
                            console.log(e.target.checked, "<<<");
                            for (let i = 0; i < rankData.length; i++) {
                              if (i == index) {
                                checkedTarget2.push(e.target.checked);
                                continue;
                              }
                              checkedTarget2.push(checkedItems[i]);
                            }
                            setCheckedItems(checkedTarget2);
                          }}
                        />
                      </Td>
                      {/* <Td>{rank[4]} 주차</Td> */}
                      <Td>{rank[2]}</Td>
                      <Td>{rank[1]}</Td>
                      <Td>{rank[0]}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : nextStep ? (
        <TableContainer align="center" mt="10">
          <Text fontSize="30">step 3</Text> 클레임 허용
          <Table border="1px solid gray" mt="5" w="80%" variant="striped" colorScheme="#2C264C">
            <TableCaption>
              <Box mt="50" mb="5" fontSize="20">
                <span> Total Allowance : {totalAllowance} DGT </span>
              </Box>
              <Button bg="#414fa28f" onClick={previousStep} mr="2">
                뒤로 가기
              </Button>
              <Button
                isLoading={loading ? 1 : null}
                loadingText="Approving..."
                bg="#414fa28f"
                onClick={approveRankClaim}
              >
                클레임 허용
              </Button>
            </TableCaption>
            <Thead bg="whiteAlpha.200">
              <Tr>
                {/* <Th>weeks</Th> */}
                <Th>game title</Th>
                <Th>rank</Th>
                <Th>score</Th>
                <Th>address</Th>
                <Th>allowance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedRankData &&
                selectedRankData.map((rank, index) => {
                  return (
                    <Tr key={index} bg={rank[2] == "블록쌓기" && "whiteAlpha.200"}>
                      {/* <Td>{rank[4]} 주차</Td> */}
                      <Td>{rank[2]}</Td>
                      <Td>{rank[1]}</Td>
                      <Td>{rank[3]}</Td>
                      <Td>{rank[0]}</Td>
                      <Td>{rank[1] == 1 ? 50 : rank[1] == 2 ? 30 : 10}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : lastStep ? (
        <Box align="center" mt="10">
          <Text fontSize="30">step 4</Text> 완료
          <Box mt="5">
            <Text mt="5">완료되었습니다.</Text>
            <Button onClick={initStep}>추가 설정하기</Button>
          </Box>
        </Box>
      ) : (
        <Box align="center" mt="10">
          <Text fontSize="30">step 1</Text> 랭크 불러오기
          <Box mt="5">
            <Button bg="#414fa28f" onClick={importRank} mr="2">
              랭크 불러오기
            </Button>
          </Box>
        </Box>
      )}
      <style jsx>{`
        span {
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }
      `}</style>
    </Box>
  );
};

export default RankingReword;

// getLayout property
RankingReword.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};

