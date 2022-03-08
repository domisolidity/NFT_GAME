import React from "react";
import "./topnav.css";

import { useSelector, useDispatch } from "react-redux";
import {connect} from "../../../redux/blockchain/blockchainActions.js";

const TopNav = () => {

  const dispatch = useDispatch();
  const blockchain = useSelector(state=>state.blockchain);

  
  const walletConnect = (e)=>{
    e.preventDefault();
    dispatch(connect());
  }
  
  return (
    <div className="topnav">
      <div className="topnav__account">
        {/* <input value={account} /> */}
        {blockchain.account ? blockchain.account: <button onClick={walletConnect}>지갑 연결</button>}
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">icon #1</div>
        <div className="topnav__right-item">icon #2</div>
        <div className="topnav__right-item">icon #3</div>
      </div>
    </div>
  );
};

export default TopNav;
