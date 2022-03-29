import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
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
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ProfileCard = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

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

  const userName = user && user.userName;

  console.log(userName);
  return (
    <>
      <Image borderRadius="full" src="/GameCoin3.png" alt="Profile-image" />
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

      {/* <div>
        My userName is {userName ? <pre>{userName}</pre> : "not set."} My
        publicAddress is <pre>{publicAddress}</pre>
      </div>
      <div>
        <label htmlFor="userName">Change userName: </label>
        <input name="userName" onChange={handleChange} />
        <button disabled={loading} onClick={handleSubmit}>
          Submit
        </button>
      </div> */}
    </>
  );
};

export default ProfileCard;
