import React from "react";
import { useSelector } from "react-redux";
import "./header.css";

import Logo from "./Logo";
import Searchbar from "../../components/Seachbar";
import Accountbar from "../log/Accountbar";
import Login from "../log/Login";
import TopNav from "./TopNav";
// import Theme from "./Theme";

const Header = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const { auth } = blockchain;
  return (
    <div className="header">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__searchbar">
        <Searchbar />
      </div>
      <div className="header__accountbar">{auth ? <Accountbar /> : null}</div>
      <div className="header__right-btns">
        <span>
          <Login />
        </span>
        {/* <span>
          <Theme />
        </span> */}
      </div>
      <div className="header__navbar">
        <TopNav />
      </div>
    </div>
  );
};

export default Header;
