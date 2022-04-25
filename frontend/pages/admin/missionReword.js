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
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";

const MissionReword = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, gameTokenContract, claim20_Contract } = blockchain;

  const [dataList, setDataList] = useState();
  const [selectedMissionData, setSelectedMissionData] = useState();
  const [isData, setIsData] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const owner = process.env.NEXT_PUBLIC_OWNER;

  const importMissionAchiever = async () => {
    await axios
      .get("/api/games/mission-achiever")
      .then(async (db) => {
        console.log(db.data);
        let result = [];
        for (let i = 0; i < db.data.length; i++) {
          result.push(Object.values(db.data[i]));
        }
        console.log(result);
        setDataList(result);
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
        totalCount += dataList[i][1];
      }
    }
    console.log(selectedData);
    console.log(typeof totalCount);
    setTotalAllowance(totalCount);
    setSelectedMissionData(selectedData);
    setIsData(false);
    setNextStep(true);
  };

  const approveMissionClaim = async () => {
    try {
      if (account != owner) {
        alert("관리자 권한이 없는 계정입니다.");
        return;
      }
      console.log(claim20_Contract._address);
      setLoading(true);
      await gameTokenContract.methods
        .transfer(claim20_Contract._address, totalAllowance)
        .send({ from: account })
        .then((res) => {
          console.log(res);
          alert("다음은 미션 보상자별 인출 허용량 지정에 대한 서명입니다.");
        });

      await claim20_Contract.methods
        .approveClaim_mission(selectedMissionData)
        .send({ from: account })
        .then(async (res) => {
          console.log(res);
          if (res.status) {
            await axios.post("/api/games/mission/approved", { mission: selectedMissionData }).then(() => {
              setLoading(false);
              alert("승인 작업 완료");
              setNextStep(false);
              setLastStep(true);
            });
          }
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
    <Box pt={{ base: "120px", md: "75px" }}>
      <Flex justify="space-between">
        <Box>
          <Heading display="inline">
            <Image src="/images/icons/noteIcon.png" display="inline" boxSize="35" mr="4" />
            <span>Managing Mission Reward</span>
          </Heading>
          <Text ml="20" mt="5">

            주간 랭킹 정보를 확인하고 랭킹 정보에 따라 클레임 허용여부를 관리할 수 있습니다.
          </Text>
        </Box>
        <Link href={"/admin"}>
          <a>
            <Button bg="whiteAlpha.300"> 관리자 홈으로</Button>
          </a>
        </Link>
        {/* <Button onClick={test_transferTOContract}>TEST</Button>
        <Button onClick={testtest}>TEST11</Button> */}
      </Flex>
      {
        isData ? (
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
                      // colorScheme="green"
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
                            // colorScheme="green"
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
                        <Td>{list[0]}</Td>
                        <Td>{list[1]}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : nextStep ? (
          <TableContainer align="center" mt="10">
            <Text fontSize="30">step 3</Text> 클레임 허용
            <Table border="1px solid gray" mt="5" w="80%" variant="striped"
            // colorScheme="#2C264C"
            >
              <TableCaption>
                <Box mt="50" mb="5" fontSize="20">
                  <span> Total Allowance : {totalAllowance} DGT </span>
                </Box>
                <Button bg="#414fa28f" onClick={previousStep} mr="2">
                  뒤로 가기
                </Button>
                <Button
                  isLoading={loading ? 1 : null}
                  loadingText="approving..."
                  bg="#414fa28f"
                  onClick={approveMissionClaim}
                >
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
                {selectedMissionData &&
                  selectedMissionData.map((list, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{list[0]}</Td>
                        <Td>{list[1]}</Td>
                        <Td>{list[1]}</Td>
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
            </Box>
          </Box>
        )
      }
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

// getLayout property
MissionReword.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};


