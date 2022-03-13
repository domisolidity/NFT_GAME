import React, { useEffect } from "react";

import "./layout.css";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions.js";
import App from "../../App";
import TopNav from "./topnav/TopNav";

const Layout = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { account, errorMsg } = blockchain;

  const walletConnect = (e) => {
    e.preventDefault();
    if (errorMsg != "") {
      alert(errorMsg);
      return;
    }
    dispatch(connect());
  };

  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);

  return (
    <div className="layout">
      {console.log("Layout.js 렌더")}
      <div className="layout__content">
        <TopNav />
        <div>
          {account ? (
            <div className="layout__wallet">{account}</div>
          ) : (
            <>
              <div className="layout__wallet">
                <button onClick={walletConnect}>지갑 연결</button>
              </div>
              {blockchain.errorMsg != "" ? (
                <div>{alert(blockchain.errorMsg)}</div>
              ) : null}
            </>
          )}
        </div>
        <App />
      </div>
    </div>
  );
};

export default Layout;
