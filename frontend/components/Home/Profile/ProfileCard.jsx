import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useEditableControls,
} from "@chakra-ui/react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import ImageUpload from "./ImageUpload";
import UpdateProfile from "./UpdateProfile";
import Header from "./Header";

const ProfileCard = ({ as, slideIn }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const [beforeUserName, setBeforeUserName] = useState("");
  const [beforeImages, setBeforeImages] = useState([]);
  const [userName, setUserName] = useState("");
  const [Images, setImages] = useState([]);

  const LS_KEY = "login-with-metamask:auth";

  const [accessToken, setAccessToken] = useState("");

  // const [state, setState] = useState({
  //   loading: false,
  //   user: "",
  //   userName: "",
  // });

  // const { loading, user } = state;

  useEffect(async () => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);

    if (!accessToken) return;

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    await fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUserName(user.userName);
        setImages(user.userImage);
      })
      .catch(window.alert);
  }, [account, accessToken, userName]);

  const getBeforeUserName = (e) => {
    setBeforeUserName(e.target.value);
  };

  const getUserName = (name) => {
    setUserName(name);
  };
  const updateImages = (newImages) => {
    setBeforeImages(newImages);
    //setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (!userName || Images.length == 0) {
    //   return alert("빈칸을 채워주세요");
    // }

    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);
    const {
      payload: { id },
    } = jwtDecode(accessToken);

    const variables = {
      userName: beforeUserName,
      userImage: beforeImages[0],
    };

    fetch(`/api/users/profile/${id}`, {
      body: JSON.stringify(variables),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getUserName(result.userName);
        setImages(result.userImage);
        alert("변경되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
    // if (data == "change") {
    //   toggle();
    // }
  };

  let imgFile = {
    updateImages,
  };

  return (
    <>
      {/* <Header
        backgroundHeader={Images}
        backgroundProfile={Images}
        avatarImage={Images ? Images : "/circle.png"}
        name={userName ? userName : "Player"}
        account={account ? account : null}
        tabs={[
          {
            name: "TEAMS",
            icon: <IoDocumentsSharp w="100%" h="100%" />,
          },
          {
            name: "PROJECTS",
            icon: <FaPenFancy w="100%" h="100%" />,
          },
        ]}
      /> */}
      <SimpleGrid
        as={as}
        animation={slideIn}
        columns={{ sm: 1, md: 2 }}
        pt={{ base: "120px", md: "75px" }}
        align="center"
        justify="center"
      >
        <GridItem>
          {/* <Flex flexDirection="column" align="center" justify="center"> */}
          <Image
            borderRadius="full"
            boxSize="150px"
            src={Images ? Images : "/circle.png"}
            alt="profile-image"
            mb={5}
          />
          <Text fontSize={"32px"}>{userName ? userName : "Player"}</Text>
          {/* </Flex> */}
        </GridItem>
        <GridItem>
          <UpdateProfile
            imgFile={imgFile}
            userName={userName}
            getBeforeUserName={getBeforeUserName}
            beforeUserName={beforeUserName}
            update={onSubmit}
          />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default ProfileCard;

// import React, { useEffect, useState } from "react";
// import {
//   chakra,
//   Box,
//   Flex,
//   useColorModeValue,
//   SimpleGrid,
//   GridItem,
//   Heading,
//   Text,
//   Stack,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   FormHelperText,
//   Textarea,
//   Avatar,
//   Icon,
//   Button,
//   VisuallyHidden,
//   Image,
// } from "@chakra-ui/react";
// import { FaUser } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import Cookies from "js-cookie";
// import ImageUpload from "./ImageUpload";

// export default function ProfileCard() {
//   const blockchain = useSelector((state) => state.blockchain);
//   const { account } = blockchain;

//   const [beforeUserName, setBeforeUserName] = useState("");
//   const [beforeImages, setBeforeImages] = useState([]);
//   const [userName, setUserName] = useState("");
//   const [Images, setImages] = useState([]);

//   const LS_KEY = "login-with-metamask:auth";

//   const [accessToken, setAccessToken] = useState("");

//   useEffect(async () => {
//     const getToken = Cookies.get(LS_KEY);
//     const parsedToken = getToken && JSON.parse(getToken).accessToken;
//     setAccessToken(parsedToken);

//     if (!accessToken) return;

//     const {
//       payload: { id },
//     } = jwtDecode(accessToken);

//     await fetch(`/api/users/${id}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((user) => {
//         setUserName(user.userName);
//         setImages(user.userImage);
//       })
//       .catch(window.alert);
//   }, [account, accessToken, userName]);

//   const getBeforeUserName = (e) => {
//     setBeforeUserName(e.target.value);
//   };

//   const getUserName = (name) => {
//     setUserName(name);
//   };
//   const updateImages = (newImages) => {
//     setBeforeImages(newImages);
//     //setImages(newImages);
//   };

//   const onSubmit = (e, data) => {
//     e.preventDefault();

//     // if (!userName || Images.length == 0) {
//     //   return alert("빈칸을 채워주세요");
//     // }

//     const getToken = Cookies.get(LS_KEY);
//     const parsedToken = getToken && JSON.parse(getToken).accessToken;
//     setAccessToken(parsedToken);
//     const {
//       payload: { id },
//     } = jwtDecode(accessToken);

//     const variables = {
//       userName: beforeUserName,
//       userImage: beforeImages[0],
//     };

//     fetch(`/api/users/profile/${id}`, {
//       body: JSON.stringify(variables),
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       method: "PATCH",
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         getUserName(result.userName);
//         setImages(result.userImage);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     if (data == "change") {
//       toggle();
//     }
//   };

//   let imgFile = {
//     updateImages,
//   };

//   return (
//     <SimpleGrid
//       columns={{ sm: 1, md: 2 }}
//       pt={{ base: "120px", md: "75px" }}
//       align="center"
//       justify="center"
//     >
//       <GridItem>
//         <Flex flexDirection="column" align="center" justify="center">
//           <Image
//             borderRadius="full"
//             boxSize="150px"
//             src={Images ? Images : "/circle.png"}
//             alt="profile-image"
//             mb={5}
//           />
//           <Text fontSize={"32px"}>{userName ? userName : "Player"}</Text>
//         </Flex>
//       </GridItem>

//       <GridItem>
//         <chakra.form
//           method="POST"
//           shadow="base"
//           borderRadius={"15px"}
//           overflow={{ sm: "hidden" }}
//         >
//           <Stack
//             px={4}
//             py={5}
//             bg={useColorModeValue("white", "gray.700")}
//             spacing={6}
//             p={{ sm: 6 }}
//           >
//             <Text fontSize={"20px"} align="center" fontWeight={"bold"}>
//               You can change your profile image and nickname
//             </Text>
//             <ImageUpload refreshImg={imgFile} />
//             <FormControl>
//               <FormLabel
//                 fontSize="sm"
//                 fontWeight="md"
//                 color={useColorModeValue("gray.700", "gray.50")}
//                 textAlign="center"
//               >
//                 Cover photo
//               </FormLabel>
//               <Flex
//                 w={"150px"}
//                 h={"150px"}
//                 mt={1}
//                 align="center"
//                 justify="center"
//                 px={6}
//                 pt={5}
//                 pb={6}
//                 borderWidth={2}
//                 borderColor={useColorModeValue("gray.300", "gray.500")}
//                 borderStyle="dashed"
//                 rounded="50%"
//               >
//                 <Stack spacing={1}>
//                   <Icon
//                     mx="auto"
//                     boxSize={12}
//                     color={useColorModeValue("gray.400", "gray.500")}
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </Icon>
//                 </Stack>
//               </Flex>
//             </FormControl>

//             <FormControl as={GridItem} colSpan={[3, 2]}>
//               <FormLabel
//                 fontSize="sm"
//                 fontWeight="md"
//                 color={useColorModeValue("gray.700", "gray.50")}
//               ></FormLabel>
//               <FormHelperText></FormHelperText>
//             </FormControl>

//             <FormControl>
//               <FormLabel
//                 fontSize="sm"
//                 fontWeight="md"
//                 color={useColorModeValue("gray.700", "gray.50")}
//               >
//                 Photo
//               </FormLabel>
//               <Flex alignItems="center" mt={1}>
//                 <Avatar
//                   boxSize={12}
//                   bg={useColorModeValue("gray.100", "gray.800")}
//                   icon={
//                     <Icon
//                       as={FaUser}
//                       boxSize={9}
//                       mt={3}
//                       rounded="full"
//                       color={useColorModeValue("gray.300", "gray.700")}
//                     />
//                   }
//                 />
//                 <Button
//                   type="button"
//                   ml={5}
//                   variant="outline"
//                   size="sm"
//                   fontWeight="medium"
//                   _focus={{ shadow: "none" }}
//                 >
//                   Change
//                 </Button>
//               </Flex>
//             </FormControl>

//             <InputGroup size="sm">
//               <InputLeftAddon
//                 bg={useColorModeValue("gray.50", "gray.600")}
//                 color={useColorModeValue("gray.500", "gay.50")}
//                 rounded="md"
//               >
//                 Nick Name
//               </InputLeftAddon>
//               <Input
//                 type="tel"
//                 defaultValue={userName}
//                 focusBorderColor="brand.400"
//                 rounded="md"
//               />
//             </InputGroup>
//             <FormControl>
//               <FormLabel
//                 fontSize="sm"
//                 fontWeight="md"
//                 color={useColorModeValue("gray.700", "gray.50")}
//               >
//                 Cover photo
//               </FormLabel>
//               <Flex
//                 w={"150px"}
//                 h={"150px"}
//                 mt={1}
//                 align="center"
//                 justify="center"
//                 px={6}
//                 pt={5}
//                 pb={6}
//                 borderWidth={2}
//                 borderColor={useColorModeValue("gray.300", "gray.500")}
//                 borderStyle="dashed"
//                 rounded="50%"
//               >
//                 <Stack spacing={1}>
//                   <Icon
//                     mx="auto"
//                     boxSize={12}
//                     color={useColorModeValue("gray.400", "gray.500")}
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </Icon>
//                 </Stack>
//               </Flex>
//             </FormControl>
//             <Button
//               type="button"
//               ml={5}
//               variant="outline"
//               size="sm"
//               fontWeight="medium"
//               _focus={{ shadow: "none" }}
//             >
//               Change
//             </Button>
//           </Stack>
//           {/* <Box
//                   px={{ base: 4, sm: 6 }}
//                   py={3}
//                   // bg={useColorModeValue("gray.50", "gray.900")}
//                   textAlign="right"
//                 >
//                   <Button
//                     type="button"
//                     ml={5}
//                     variant="outline"
//                     size="sm"
//                     fontWeight="medium"
//                     _focus={{ shadow: "none" }}
//                   >
//                     Change
//                   </Button>
//                 </Box> */}
//         </chakra.form>
//       </GridItem>
//     </SimpleGrid>
//   );
// }
