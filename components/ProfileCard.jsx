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

const ProfileCard = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  const [isOpen, setIsOpen] = useState(false);
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

  const getIsOpen = () => {
    setIsOpen(!isOpen);
  };

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
      })
      .catch((err) => {
        console.log(err);
      });

    getIsOpen();
  };

  let imgFile = {
    updateImages,
  };

  return (
    <>
      <div className="profile_content">
        {isOpen && (
          <Modal closeModal={getIsOpen}>
            <form className="profile_modal" onSubmit={onSubmit}>
              <ImageUpload refreshImg={imgFile} />
              <div>nick name</div>
              <div className="profile_name">
                <Input
                  textAlign="center"
                  width={"20rem"}
                  mt={"1rem"}
                  onChange={getBeforeUserName}
                  value={beforeUserName}
                />
                <Button mt={"4rem"} onClick={onSubmit}>
                  변경하기
                </Button>
              </div>
            </form>
          </Modal>
        )}
        {Images ? (
          <>
            <img src={Images} alt="프로필이미지" onClick={getIsOpen} />
            <div onClick={getIsOpen}>{userName}</div>
          </>
        ) : (
          <img src={"/circle.png"} alt="프로필이미지" onClick={getIsOpen} />
        )}
      </div>
      <style jsx>{`
        .profile_content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .profile_content div {
          cursor: pointer;
        }
        .profile_content > img {
          border-radius: 50%;
          width: 10rem;
          height: 10rem;
          padding: 1rem;
          cursor: pointer;
        }
        .profile_modal {
          border: solid 1px;
          background-color: #0f263e;
          padding: 3rem;
        }
        .profile_modal div {
          display: flex;
          flex-direction: column;
          justify-items: center;
          align-items: center;
        }
        .profile_name {
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default ProfileCard;
