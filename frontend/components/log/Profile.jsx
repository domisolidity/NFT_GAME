import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const Profile = (props) => {
  // const dispatch = useDispatch();
  // const { web3 } = useSelector((state) => state.blockchain);

  const [state, setState] = useState({
    loading: false,
    user: undefined,
    userName: "",
  });

  useEffect(() => {
    const { accessToken } = props.auth;
    const {
      payload: { id },
    } = jwtDecode(accessToken);

    console.log(jwtDecode(accessToken));

    fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((user) => setState({ ...state, user }))
      .catch(window.alert);
  }, []);

  const handleChange = ({ target: { value } }) => {
    setState({ ...state, userName: value });
  };

  const handleSubmit = () => {
    const { accessToken } = props.auth;
    const { user, userName } = state;

    setState({ ...state, loading: true });

    if (!user) {
      window.alert(
        "The user id has not been fetched yet. Please try again in 5 seconds."
      );
      return;
    }

    fetch(`/api/users/${user.id}`, {
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
        alert(err);
        setState({ ...state, loading: false });
      });
  };

  const { accessToken } = props.auth;

  const {
    payload: { publicAddress },
  } = jwtDecode(accessToken);

  const { loading, user } = state;

  const userName = user && user.userName;

  return (
    <div className="Profile">
      <div>
        My userName is {userName ? <pre>{userName}</pre> : "not set."} My
        publicAddress is <pre>{publicAddress}</pre>
      </div>
      <div>
        <label htmlFor="userName">Change userName: </label>
        <input name="userName" onChange={handleChange} />
        <button disabled={loading} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p>
        <button onClick={() => props.onLoggedOut()}>Logout</button>
      </p>
    </div>
  );
};

export default Profile;
