import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWallet,
  disconnectWallet,
  reconnect,
} from "../../redux/blockchain/blockchainActions";

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
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { account, errorMsg, auth } = blockchain;
  console.log(auth);
  const { toggle, visible } = useModal();

  // const getConnectWallet = async () => {
  //   if (errorMsg == "메타마스크 로그인이 필요합니다.") {
  //     console.log(11);
  //     const popUp = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //   }
  //   console.log("로그인");
  //   dispatch(connectWallet());
  // };

  // const getDisConnectWallet = () => {
  //   dispatch(disconnectWallet());
  // };

  const getReconnect = () => {
    dispatch(reconnect());
  };
  useEffect(() => {
    getReconnect();
    // getConnectWallet();
  }, []);

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
          <div className="header__chainbar2">
            <Chainbar />
          </div>
          <div className="header__right_btns">
            <Accountbar />
          </div>
        </>
      ) : (
        <>
          <div className="header__chainbar"></div>
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
        </>
      )}
      <div className="header__adminbar">
        <Adminbar />
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
        .header__chainbar2:nth-child(3) {
          grid-column: 8;
        }
        .header__right_btns:nth-child(4) {
          grid-column: 9;
          justify-items: end;
        }
        .header__right_btns > span {
          display: table-cell;
        }
        .header__adminbar:nth-child(5) {
          grid-column: 10;
        }

        .header__navbar:nth-child(6) {
          grid-row: 2;
          grid-column: 1/-1;
          /* border-top: 1px solid var(--chakra-colors-blue-200); */
        }
      `}</style>
    </div>
  );
};

export default Header;
