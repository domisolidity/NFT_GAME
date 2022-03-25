import React from "react";
import { useSelector } from "react-redux";

import Logo from "./Logo";
import Searchbar from "../Seachbar"
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
      <div className="header__accountbar">
        {auth ? <Accountbar /> : null}
      </div>
      <div className="header__right_btns">
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
      <style jsx>{`
      .header {
        display: grid;
        grid-template-rows: repeat(2, minmax(2rem, auto));
        grid-template-columns: repeat(10, 1fr);
        align-items: center;
      }

      .header__logo:nth-child(1) {
        grid-row: 1;
        grid-column: 1/2;
        margin-left: 1rem;
      }

      .header__searchbar:nth-child(2) {
        grid-column: 3/6;
      }

      .header__accountbar:nth-child(3) {
        grid-column: 8/10;
      }

      .header__right_btns:nth-child(4) {
        grid-column: 10/-1;
        justify-items: end;
      }
      .header__right_btns > span {
        display: table-cell;
      }

      .header__navbar:nth-child(5) {
        grid-row: 2;
        grid-column: 1/-1;
        /* border-top: 1px solid var(--chakra-colors-blue-200); */
      }

      `}</style>
    </div>
  );
};

export default Header;
