import React from "react";
import { useSelector } from "react-redux";

import Logo from "./Logo";
import Searchbar from "../Seachbar";
import Chainbar from "../log/Chainbar";
import Accountbar from "../log/Accountbar";
import Adminbar from "../log/Adminbar";
import Login from "../log/Login";
import TopNav from "./TopNav";
import ConnectWallet from "../ConnectWallet";
import Modal from "../Modal";
import WalletList from "../WalletList";
import useModal from "../../hooks/useModal";
// import Theme from "./Theme";

const Header = () => {
  const blockchain = useSelector((state) => state.blockchain);

  const { auth } = blockchain;

  const { toggle, visible } = useModal();
  return (
    <div className="header">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__searchbar">
        <Searchbar />
      </div>
      {auth ? (
        <>
          <div className="header__chainbar">
            <Chainbar />
          </div>
          <div className="header__accountbar">
            <Accountbar />
          </div>
        </>
      ) : (
        <>
          <div className="header__chainbar"></div>
          <div className="header__accountbar"></div>
        </>
      )}
      <div className="header__right_btns">
        {!auth ? (
          <span>
            <ConnectWallet toggle={toggle} />
            <Modal visible={visible} toggle={toggle}>
              <WalletList toggle={toggle} />
            </Modal>
          </span>
        ) : null}

        {/* <span>
          <Theme />
        </span> */}
      </div>
      <div className="header__adminbar">
        <Adminbar />
      </div>
      <div className="header__navbar">
        <TopNav />
      </div>
      <style global jsx>{`
        .header {
          display: grid;
          grid-template-rows: repeat(2, minmax(2rem, auto));
          grid-template-columns: repeat(10, 1fr);
          align-items: center;
          min-width: 800px;
        }

        .header__logo:nth-child(1) {
          grid-row: 1;
          grid-column: 2;
          margin-left: 1rem;
        }

        .header__searchbar:nth-child(2) {
          grid-column: 3/5;
        }
        .header__chainbar:nth-child(3) {
          grid-column: 6;
        }

        .header__accountbar:nth-child(4) {
          grid-column: 7/9;
        }

        .header__right_btns:nth-child(5) {
          grid-column: 9;
          justify-items: end;
        }
        .header__right_btns > span {
          display: table-cell;
        }
        .header__adminbar:nth-child(6) {
          grid-column: 10;
        }

        .header__navbar:nth-child(7) {
          grid-row: 2;
          grid-column: 1/-1;
          /* border-top: 1px solid var(--chakra-colors-blue-200); */
        }
      `}</style>
    </div>
  );
};

export default Header;
