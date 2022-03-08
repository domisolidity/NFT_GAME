import React, { useState } from "react";
import { useSelector } from "react-redux";

const Rank = () => {
  const [storageValue, setStorageValue] = useState(0);
  const blockchain = useSelector(state=>state.blockchain);
  const {account , simpleStorage} = blockchain;


  //callback 방법
  const callback = async () => {
    try {
      if (!account) {
        alert("로그인이 필요합니다.")
      }
      await simpleStorage.methods.set(10).send({ from: account,gas:50000, gasPrice:"40000000000"}).then(result => console.log(result))
      const response = await simpleStorage.methods.get().call()
      setStorageValue(response)
    } catch (error) {
      console.log(error);
      console.log("에러")

    }
  };

  return (
    <div>
      {console.log("Rank.jsx 렌더")}
      <h1>PATH: {window.location.pathname}</h1>
      <p>address : {account}</p>

      <button onClick={callback}>10으로 바꾸기(callback)</button>
      <br />

      <div>The stored value is: {storageValue}</div>
    </div>
  );
};

export default Rank;
