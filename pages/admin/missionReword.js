import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  Flex,
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

const MissionReword = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, gameTokenContract, claim20_Contract } = blockchain;
  console.log(claim20_Contract);
  console.log(gameTokenContract);
  const [dataList, setDataList] = useState();
  const [selectedDataList, setSelectedDataList] = useState();
  const [isData, setIsData] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  //랭킹 정보 불러오기
  const importMissionAchiever = async () => {
    await axios
      .get("/api/games/mission-achiever")
      .then(async (db) => {
        console.log(db.data);
        const Result = [];
        for (let i = 0; i < db.data.length; i++) {
          Result.push({
            address: db.data[i].user_address,
            count: db.data[i].count_mission,
          });
        }
        setDataList(Result);
        setIsData(true);
      })
      .catch(console.error());
  };

  //데이터 선택
  const selectRankData = async () => {
    if (checkedItems.length == 0) {
      alert("아무것도 선택되지 않았습니다. 클레임 허용할 계정을 체크해주세요");
      return;
    }
    let selectedData = [];
    console.log(checkedItems);
    console.log(dataList);
    let totalCount = 0;
    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i] == true) {
        selectedData.push(dataList[i]);
        totalCount += dataList[i].count;
      }
    }
    setTotalAllowance(totalCount);
    setSelectedDataList(selectedData);
    setIsData(false);
    setNextStep(true);
  };

  // const testtest = async () => {
  //   await gameTokenContract.methods
  //     .allowance("0xB0475eB97e3895D508aADa880cf7De4A3fE86AEa", "0xfa55215946f348d884b8c017448416a55c840404")
  //     .call({ from: "0xB0475eB97e3895D508aADa880cf7De4A3fE86AEa" })
  //     .then((res) => console.log(res));
  // };

  // 랭킹정보에 따른 클레임양 선택 허용
  const approvedSome = async () => {
    console.log("checkedItems", checkedItems);
    console.log("selectedDataList", selectedDataList);

    //선택한 계정에 한해 클레임 허용
    console.log("claim", claim20_Contract);
    await claim20_Contract.methods
      .approveClaim(selectedDataList)
      .send({ from: account })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));

    setNextStep(false);
    setLastStep(true);
    // // 클레임 허용한 계정 랭킹db에서삭제
    // await axios.post("/api/ranks/deleteRank",{rank:selectedRankData}).then(result=>{
    //     console.log(result.data);
    // }).catch(console.error());
  };

  // 보상자 클레임 요청
  const exportToContract = async () => {
    await gameTokenContract.methods
      .allowance("0xBE005997Cc214577c575cAb11d0430777145a7dd", account)
      .call({ from: account })
      .then((result) => {
        console.log("허용량", result);
      });
    await claim20_Contract.methods.rankClaim(account).send({ from: account });

    await gameTokenContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((result) => {
        console.log("내 토큰 수 : ", result);
      });
    await gameTokenContract.methods
      .allowance("0xBE005997Cc214577c575cAb11d0430777145a7dd", account)
      .call({ from: account })
      .then((result) => {
        console.log("허용량", result);
      });
  };

  const previousStep = () => {
    if (isData) {
      setIsData(false);
    } else {
      setNextStep(false);
      setIsData(true);
    }
  };

  const initStep = () => {
    setNextStep(false);
    setIsData(false);
    setLastStep(false);
  };

  useEffect(() => {
    if (!account) return;
  }, [account]);

  return (
    <Box w="70vw" bg="blackAlpha.400" margin="0 auto" padding="10" border="2px solid gray" borderRadius="10">
      <Flex justify="space-between">
        <Box>
          <Heading display="inline">
            <Image src="/images/icons/noteIcon.png" display="inline" boxSize="35" mr="4" />
            <span>Managing Mission Reward</span>
          </Heading>
          <Text ml="20" mt="5">
            {" "}
            주간 랭킹 정보를 확인하고 랭킹 정보에 따라 클레임 허용여부를 관리할 수 있습니다.
          </Text>
        </Box>
        <Link href={"/admin"}>
          <Button bg="whiteAlpha.300"> 관리자 홈으로</Button>
        </Link>
        {/* <Button onClick={test_transferTOContract}>TEST</Button>
        <Button onClick={testtest}>TEST11</Button> */}
      </Flex>
      {isData ? (
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
            <Thead bg="whiteAlpha.200">
              <Tr>
                <Th>
                  <Checkbox
                    colorScheme="green"
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) => {
                      let checkedTarget = [];
                      for (let i = 0; i < dataList.length; i++) {
                        checkedTarget.push(e.target.checked);
                      }
                      setCheckedItems(checkedTarget);
                    }}
                  />
                </Th>
                <Th>계정 주소</Th>
                <Th>미션 달성 횟수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataList &&
                dataList.map((list, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <Checkbox
                          colorScheme="green"
                          isChecked={checkedItems[index]}
                          onChange={(e) => {
                            let checkedTarget2 = [];
                            console.log(e.target.checked, "<<<");
                            for (let i = 0; i < dataList.length; i++) {
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
                      <Td>{list.address}</Td>
                      <Td>{list.count}</Td>
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
                <span> Total Allowance : {totalAllowance * 10} DGT </span>
              </Box>
              <Button bg="#414fa28f" onClick={previousStep} mr="2">
                뒤로 가기
              </Button>
              <Button bg="#414fa28f" onClick={approvedSome}>
                클레임 허용
              </Button>
            </TableCaption>
            <Thead bg="whiteAlpha.200">
              <Tr>
                <Th>계정 주소</Th>
                <Th>미션 달성 횟수</Th>
                <Th>허용량</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedDataList &&
                selectedDataList.map((list, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{list.address}</Td>
                      <Td>{list.count}</Td>
                      <Td>{list.count * 10}</Td>
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
          <Text fontSize="30">step 1</Text> 미션 보상자 목록
          <Box mt="5">
            <Button bg="#414fa28f" onClick={importMissionAchiever} mr="2">
              보상자 목록 불러오기
            </Button>
            <Button bg="#414fa28f" onClick={exportToContract}>
              클레임하기 - 마이페이지에다 넣을꺼
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

export default MissionReword;
