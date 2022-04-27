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
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  const { account } = blockchain;
  const [beforeUserName, setBeforeUserName] = useState("");
  const [beforeImages, setBeforeImages] = useState([]);
  const [userName, setUserName] = useState("");
  const [Images, setImages] = useState([]);

  const { NEXT_PUBLIC_LOGIN_KEY } = process.env;

  const [accessToken, setAccessToken] = useState("");

  useEffect(async () => {
    const getToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);

    if (!accessToken) return;

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    await fetch(`${NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
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
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!beforeUserName || beforeImages.length == 0) {
      return alert("빈칸을 채워주세요");
    }

    const getToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);
    const {
      payload: { id },
    } = jwtDecode(accessToken);

    const variables = {
      userName: beforeUserName,
      userImage: beforeImages[0],
    };

    fetch(`${NEXT_PUBLIC_SERVER_URL}/users/profile/${id}`, {
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
        setBeforeUserName("");
        setBeforeImages("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let imgFile = {
    updateImages,
  };

  return (
    <>
      <SimpleGrid
        as={as}
        animation={slideIn}
        columns={{ sm: 1, md: 2 }}
        pt={{ base: "120px", md: "75px" }}
        align="center"
        justify="center"
      >
        <GridItem>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={Images ? Images : "/circle.png"}
            alt="profile-image"
            mb={5}
          />
          <Text fontSize={"32px"}>{userName ? userName : "Player"}</Text>
        </GridItem>
        <GridItem>
          <UpdateProfile
            imgFile={imgFile}
            userName={userName}
            getBeforeUserName={getBeforeUserName}
            beforeUserName={beforeUserName}
            beforeImages={beforeImages}
            update={onSubmit}
          />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default ProfileCard;
