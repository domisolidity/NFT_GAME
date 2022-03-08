import React from "react";


import "./layout.css";
import TopNav from "./topnav/TopNav";
import AllRoutes from "../../pages/AllRoutes";

import { useSelector, useDispatch } from "react-redux";
import {connect} from "../../redux/blockchain/blockchainActions.js";

const Layout = () => {

  
  const dispatch = useDispatch();
  const blockchain = useSelector(state=>state.blockchain);

  const walletConnect = (e)=>{
    e.preventDefault();
    dispatch(connect());
  }

  return (
    <div className="layout">
        {console.log("Layout.js 렌더")}
        <div className="layout__content">
          <TopNav/>
          <div>
          {blockchain.account
          ?
          <div className="layout__wallet"> 
            {blockchain.account}
          </div>
          :<div className="layout__wallet"> 
            <button onClick={walletConnect}>지갑 연결</button>
          </div>
          }
          </div>
          <div className="layout__content-main">
            <AllRoutes/>
          </div>
        </div>
      </div>
  );
};

export default Layout;
