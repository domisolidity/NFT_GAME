import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const { web3 } = useSelector((state) => state.blockchain);

  const [loading, setLoading] = useState(false); // Loading button state

  const handleAuthenticate = async ({ publicAddress, signature }) =>
    fetch(`/api/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = async ({ publicAddress, nonce }) => {
    try {
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );
      console.log(signature);
      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  const handleSignup = (publicAddress) =>
    fetch(`/api/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleClick = async () => {
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    setLoading(true);

    // Look if user with current publicAddress is already present on backend
    fetch(`/api/users?publicAddress=${publicAddress}`)
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((users) => (users.length ? users[0] : handleSignup(publicAddress)))
      // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
      // Send signature to backend on the /auth route
      .then(handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then((auth) => props.onLoggedIn(auth))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Box bg="#F93B8B">
      <Button onClick={handleClick}>Connect Wallet</Button>
    </Box>
  );
};

export default Login;
