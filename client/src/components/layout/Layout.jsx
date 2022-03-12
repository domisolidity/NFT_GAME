import React, { useEffect, useState } from "react";

import "./layout.css";
import TopNav from "./topnav/TopNav";

import { useSelector, useDispatch } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions.js";
import App from "../../App";
import Login from "../login/Login";
import Profile from "../login/Profile";

const Layout = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain);

  const { account, errorMsg } = blockchain;

  const LS_KEY = "login-with-metamask:auth";
  const [state, setState] = useState({});

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

  useEffect(() => {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    setState({ auth });
  }, []);

  const handleLoggedIn = (auth) => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    setState({ auth });
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setState({ auth: undefined });
  };

  const { auth } = state;

  return (
    <div className="layout">
      {console.log("Layout.js 렌더")}
      <div className="layout__content">
        <TopNav />
        {auth ? (
          <Profile auth={auth} onLoggedOut={handleLoggedOut} />
        ) : (
          <Login onLoggedIn={handleLoggedIn} />
        )}
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
