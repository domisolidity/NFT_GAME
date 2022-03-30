import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ProfileCard = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [Images, setImages] = useState([]);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          onClick={handleSubmit}
        />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  ///////////////////////////////////////////////////////////////
  const LS_KEY = "login-with-metamask:auth";

  const [accessToken, setAccessToken] = useState("");

  const [state, setState] = useState({
    loading: false,
    user: "",
    userName: "",
  });

  const { loading, user } = state;

  useEffect(async () => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;

    setAccessToken(parsedToken);

    console.log(typeof accessToken);

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    console.log(jwtDecode(accessToken).payload.id);

    await fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((user) => setState({ ...state, user }))
      .catch(window.alert);
  }, [account]);

  const handleChange = ({ target: { value } }) => {
    setState({ ...state, userName: value });
  };

  console.log(state);

  const handleSubmit = () => {
    const { user, userName } = state;

    setState({ ...state, loading: true });

    if (!user) {
      console.log(
        "The user id has not been fetched yet. Please try again in 5 seconds."
      );
      return;
    }

    fetch(`/api/users/${user.userId}`, {
      body: JSON.stringify({ userName }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((user) => setState({ ...state, loading: false, user }))
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false });
      });
  };

  // const {
  //   payload: { publicAddress },
  // } = jwtDecode(accessToken);

  const getIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const getUserName = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
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
      userName: userName,
      images: Images,
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
      .then((user) => {
        setUserName(user.userName), setImages(user.userImage);
      })
      .catch((err) => {
        console.log(err);
      });

    // useEffect(async () => {
    //   const getToken = Cookies.get(LS_KEY);
    //   const parsedToken = getToken && JSON.parse(getToken).accessToken;

    //   setAccessToken(parsedToken);

    //   const {
    //     payload: { id },
    //   } = jwtDecode(accessToken);

    //   await fetch(`/api/users/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //     .then((response) => {
    //       response.json(), console.log(response);
    //     })
    //     // .then((user) => setState({ ...state, user }))
    //     .catch(window.alert);
    // }, [account]);
  };

  let imgFile = {
    updateImages,
  };

  return (
    <>
      <div>
        {isOpen && (
          <Modal closeModal={getIsOpen}>
            <form onSubmit={onSubmit}>
              <ImageUpload refreshImg={imgFile} />
              <input onChange={getUserName} value={userName} />
              <Button onClick={onSubmit}>변경하기</Button>
            </form>
          </Modal>
        )}
        <div className="profile_img">
          <img
            src={"/github-fill.png"}
            alt="프로필이미지"
            onClick={getIsOpen}
          />
        </div>
      </div>

      <Editable
        textAlign="center"
        // defaultValue={`${userName}`}
        fontSize="1.2rem"
        isPreviewFocusable={false}
        m={3}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} onChange={handleChange} />
        {/* {userName ? <div>{userName}</div> : "not set."} */}
        <EditableControls />
      </Editable>
    </>
  );
};

export default ProfileCard;
