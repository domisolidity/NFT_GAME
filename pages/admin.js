import {useState, useEffect } from "react";
import axios from "axios"
import { Box,Button, Heading,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Admin = () => {
    const blockchain = useSelector(state => state.blockchain);
    const {  account, gameTokenContract,nftContract } = blockchain;
    console.log(gameTokenContract);
    const [ rankData, setRankData] = useState();


    const importRank = async()=>{
        await axios.get("/api/games/rank").then(async(rank)=>{
            const rankResult = [];
            for (let i = 0; i < rank.data.length; i++) {
                rankResult.push(Object.values(rank.data[i]));
            }
            setRankData(rankResult)
            
            await gameTokenContract.methods.approveClaim(rankResult).send({from:account}).then(result=>{
                console.log(result)
            })
            // await nftContract.methods.remainNfts().call({from:account}).then(result=>{
            //     console.log(result)
            // })
        }).catch(console.error());
    }

    useEffect(() => {
      if (!account) return;
    }, [account])
    
    const exportToContract = async()=>{
        await gameTokenContract.methods.allowance('0xbe005997cc214577c575cab11d0430777145a7dd',account).call({from:account}).then(result=>{
            console.log("허용량",result)
        })
        await gameTokenContract.methods.rankClaim(account).send({from:account})
        
        await gameTokenContract.methods.balanceOf(account).call({from:account}).then(result=>{
            console.log("내 토큰 수 : ", result)
        })
        await gameTokenContract.methods.allowance('0xbe005997cc214577c575cab11d0430777145a7dd',account).call({from:account}).then(result=>{
            console.log("허용량",result)
        })
    }
  return (
    <Box w="70vw" bg="blackAlpha.400" margin="0 auto"padding="10">
        <Heading>Managing Reward System</Heading>
        <Button onClick={importRank}>랭크 불러오기</Button>
        <Button onClick={exportToContract}>클레임</Button>
        <TableContainer>
            <Table variant="striped" colorScheme='facebook'>
                <TableCaption>블라블라</TableCaption>
                <Thead>
                    <Tr>
                        <Th>game title</Th>
                        <Th>rank</Th>
                        <Th>address</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{console.log(rankData[0][0])}</Td>
                        <Td>sss</Td>
                        <Td>sss</Td>
                    </Tr>
                    <Tr>
                        <Td>sss</Td>
                        <Td>sss</Td>
                        <Td>sss</Td>
                    </Tr>
                    <Tr>
                        <Td>sss</Td>
                        <Td>sss</Td>
                        <Td>sss</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default Admin