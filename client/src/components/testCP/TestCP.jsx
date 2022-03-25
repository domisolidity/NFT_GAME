import React from "react";

const TestCP = (props) => {
  const { account, storageValue, callback, then } = props.initialization;

  return (
    <div>
      {console.log("TestCP.jsx 렌더")}
      <h1>PATH: {window.location.pathname}</h1>
      <p>address : {account}</p>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show a
        stored value of 15 (by default).
      </p>
      <button onClick={callback}>15로 바꾸기(callback)</button>
      <br />
      <button onClick={then}>15로 바꾸기2(then)</button>
      <p>
        Try changing the value stored on <strong>line 64</strong> of Test.js.
      </p>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
};

export default TestCP;
