import React from "react";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import ethLogo from "../assets/logo/eth.svg";

const NftCard = (props) => {
  const { loading, remainNft, renderNft, minting } = props.toMintJSX;
  const { name, image, description } = renderNft;

  return (
    // 있으면 전체내용 없으면 카드만
    <>
      <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#b42020)">
        <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
          {" "}
          Nfts : {remainNft} / 60
        </Text>
        {image ? (
          <>
            <Box>
              <Image mt={6} w={300} h={300} src={image} borderRadius={30} />
            </Box>
            <Box ml="5">
              <Text> {name} </Text>
              <Text>{description} </Text>
            </Box>
          </>
        ) : (
          <>
            <Text fontSize={28} fontWeight="bold" mt={10}>
              {" "}
              Holder NFT <br /> Red
            </Text>
            <Text fontSize={16} mt={4}>
              (홀더 인증용 NFT)
            </Text>
            <Flex justify="space-around" padding={10} mt={6}>
              <Box>
                <Image
                  display="inline"
                  src={ethLogo}
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
                  {" "}
                  0.3 ETH
                </Text>
              </Box>
            </Flex>
          </>
        )}
        <Box>
          <Button
            disabled={loading ? 1 : 0}
            w={200}
            loadingText="Minting.."
            colorScheme="teal"
            variant="solid"
            onClick={minting}
          >
            MINT
          </Button>
        </Box>
      </Box>
      <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#549254)">
        <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
          {" "}
          Nfts : {remainNft} / 30
        </Text>
        {image ? (
          <>
            <Box>
              <Image mt={6} w={300} h={300} src={image} borderRadius={30} />
            </Box>
            <Box ml="5">
              <Text> {name} </Text>
              <Text>{description} </Text>
            </Box>
          </>
        ) : (
          <>
            <Text fontSize={28} fontWeight="bold" mt={10}>
              {" "}
              Holder NFT <br /> Green
            </Text>
            <Text fontSize={16} mt={4}>
              (홀더 인증용 NFT)
            </Text>
            <Flex justify="space-around" padding={10} mt={6}>
              <Box>
                <Image
                  display="inline"
                  src={ethLogo}
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
                  {" "}
                  0.5 ETH
                </Text>
              </Box>
            </Flex>
          </>
        )}
        <Box>
          <Button
            disabled={loading ? 1 : 0}
            w={200}
            loadingText="Minting.."
            colorScheme="teal"
            variant="solid"
            onClick={minting}
          >
            MINT
          </Button>
        </Box>
      </Box>
      <Box w={400} h={500} bgGradient="linear(to-br, whiteAlpha.200,#9b61ca)">
        <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}>
          {" "}
          Nfts : {remainNft} / 10
        </Text>
        {image ? (
          <>
            <Box>
              <Image mt={6} w={300} h={300} src={image} borderRadius={30} />
            </Box>
            <Box ml="5">
              <Text> {name} </Text>
              <Text>{description} </Text>
            </Box>
          </>
        ) : (
          <>
            <Text fontSize={28} fontWeight="bold" mt={10}>
              {" "}
              Holder NFT <br /> Purple
            </Text>
            <Text fontSize={16} mt={4}>
              (홀더 인증용 NFT)
            </Text>
            <Flex justify="space-around" padding={10} mt={6}>
              <Box>
                <Image
                  display="inline"
                  src={ethLogo}
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
                  {" "}
                  1 ETH
                </Text>
              </Box>
            </Flex>
          </>
        )}
        <Box>
          <Button
            disabled={loading ? 1 : 0}
            w={200}
            loadingText="Minting.."
            colorScheme="teal"
            variant="solid"
            onClick={minting}
          >
            MINT
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NftCard;

// return (
//   // 있으면 전체내용 없으면 카드만
//   <Box w={400} h={500} bgGradient={props.no == 1 ? "linear(to-br, whiteAlpha.200,#b42020)" : props.no==2 ? "linear(to-br, whiteAlpha.200,#549254)" : "linear(to-br, whiteAlpha.200,#9b61ca)"} >

//         <Text textAlign="left" padding={5} fontWeight="bold" fontSize={18}> Nfts : {remainNft} / 50</Text>
//         {image ?
//         <Box >
//           <Image mt={6} w={300} h={300} src={image} borderRadius={30}/>
//         </Box>
//         :
//         <>
//         <Text fontSize={28} fontWeight="bold" mt={10}> Holder NFT <br/> grade :Purple</Text>
//         <Text fontSize={16} mt={4}>(홀더 인증용 NFT)</Text>
//         </>
//         }
//         {image
//         ?
//         <Box ml="5">
//           <Text>  {name}  </Text>
//           <Text>{description} </Text>
//         </Box>
//         :
//         <Flex justify="space-around" padding={10} mt={6}>
//           <Box alignItems="center"><Text>Price : </Text></Box>
//           <Box >
//             <Image display="inline" src={ethLogo} mr={10} boxSize="2rem" bg="whiteAlpha.100" borderRadius={50}/>
//             {props.no == 1 ?
//               <Text display="inline" verticalAlign={8} fontSize="xl" fontWeight="700"> 0.3 ETH</Text>
//               : props.no == 2 ?
//               <Text display="inline" verticalAlign={8} fontSize="xl" fontWeight="700"> 0.5 ETH</Text>
//               :
//               <Text display="inline" verticalAlign={8} fontSize="xl" fontWeight="700"> 1 ETH</Text>
//               }
//           </Box>

//         </Flex>
//         }
//           <Box >
//             <Button
//               disabled={loading? 1:0}
//               w={200}
//               loadingText='Minting..'
//               colorScheme='teal'
//               variant='solid'
//               onClick={minting}>
//               MINT
//             </Button>
//         </Box>

//   </Box>
// );
