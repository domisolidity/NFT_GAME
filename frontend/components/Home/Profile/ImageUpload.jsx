import { useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function ImageUpload(props) {
  const { NEXT_PUBLIC_LOGIN_KEY, NEXT_PUBLIC_SERVER_URL } = process.env;

  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const [Images, setImages] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [beforeUserName, setBeforeUserName] = useState("");
  // const [beforeImages, setBeforeImages] = useState([]);
  const [userName, setUserName] = useState("");

  const getToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
  const parsedToken = getToken && JSON.parse(getToken).accessToken;

  useEffect(() => {
    console.log(Images);
  }, [Images]);

  const onDrop = (files) => {
    setAccessToken(parsedToken);

    let formData = new FormData();

    [].forEach.call(files, (f) => {
      formData.append("image", f);
    });

    fetch(`${NEXT_PUBLIC_SERVER_URL}/users/uploadImage`, {
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "content-type": "multipart/form-data", //=>있으면 안보내짐
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setImages(result);
        props.refreshImg.updateImages(result);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to save the Image in Server");
      });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshImg.updateImages(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex w={"150px"} h={"150px"} rounded="50%" direction={"column"}>
      <Box {...getRootProps()}>
        <Input {...getInputProps()} />
        {props.beforeImages.length == 0 ? (
          <Button
            borderRadius={"50%"}
            w={"150px"}
            h={"150px"}
            borderStyle="dashed"
          >
            <Icon
              mx="auto"
              boxSize={12}
              color={useColorModeValue("gray.400", "gray.500")}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          </Button>
        ) : (
          <Box w={"150px"} h={"150px"} borderRadius={"50%"}>
            {props.beforeImages.length != 0 &&
              props.beforeImages.map((image, index) => (
                <Box>
                  <Image
                    w={"150px"}
                    h={"150px"}
                    key={index}
                    src={props.beforeImages}
                    borderRadius="50%"
                    alt={"uploading profile"}
                  />
                  {/* <ButtoBOzn onClick={() => onDelete(image)}>지우기</ButtoBOzn> */}
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default ImageUpload;
