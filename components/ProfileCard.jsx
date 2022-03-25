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
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ProfileCard = () => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  ///////////////////////////////////////////////////////////////
  // const LS_KEY = "login-with-metamask:auth";

  // const [accessToken, setAccessToken] = useState("");

  // const [state, setState] = useState({
  //   loading: false,
  //   user: undefined,
  //   userName: "",
  // });

  // useEffect(() => {
  //   const getToken = localStorage.getItem(LS_KEY);
  //   const parsedToken = getToken && JSON.parse(getToken).accessToken;

  //   setAccessToken(parsedToken);

  //   // const {
  //   //   payload: { id },
  //   // } = jwtDecode(accessToken);

  //   console.log(jwtDecode(accessToken));

  // await fetch(`/api/users/${id}`, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((user) => setState({ ...state, user }))
  //   .catch(window.alert);

  // const {
  //   payload: { publicAddress },
  // } = jwtDecode(accessToken);

  // console.log(jwtDecode(accessToken));
  // }, []);

  // const handleChange = ({ target: { value } }) => {
  //   setState({ ...state, userName: value });
  // };

  // const handleSubmit = () => {
  //   const { user, userName } = state;

  //   setState({ ...state, loading: true });

  //   if (!user) {
  //     console.log(
  //       "The user id has not been fetched yet. Please try again in 5 seconds."
  //     );
  //     return;
  //   }

  //   fetch(`${baseUrl}/users/${user.id}`, {
  //     body: JSON.stringify({ userName }),
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     method: "PATCH",
  //   })
  //     .then((response) => response.json())
  //     .then((user) => setState({ ...state, loading: false, user }))
  //     .catch((err) => {
  //       console.log(err);
  //       setState({ ...state, loading: false });
  //     });
  // };

  // const {
  //   payload: { publicAddress },
  // } = jwtDecode(accessToken);

  // const { loading, user } = state;

  // const userName = user && user.userName;
  return (
    <>
      <Image borderRadius="full" src="/GameCoin3.png" alt="Profile-image" />
      <Editable
        textAlign="center"
        defaultValue={"Adsa"}
        fontSize="1.2rem"
        isPreviewFocusable={false}
        m={3}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
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
