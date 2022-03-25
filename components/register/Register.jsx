import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const { account } = blockchain;

  const [userName, setuUerName] = useState("");

  const getuUerName = (e) => setuUerName(e.target.value);

  const isErrorUserName = userName === "";

  const register = () => {
    const dataToSubmit = { publicAddress: account, userName: userName };
    axios.post("/api/users/register", dataToSubmit).then((res) => {
      console.log(res.data);
      alert(res.data.message);
    });
  };

  return (
    <Flex flexDirection={"column"}>
      <Box>{account}</Box>
      <FormControl isInvalid={isErrorUserName}>
        <FormLabel htmlFor="userName">User Name</FormLabel>
        <Input id="userName" value={userName} onChange={getuUerName} />
        {!isErrorUserName ? (
          <FormHelperText>User Name is ok!</FormHelperText>
        ) : (
          <FormErrorMessage>User Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={register} mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Flex>
  );
};

export default Register;
