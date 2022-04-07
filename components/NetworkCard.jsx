import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const NetworkCard = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { web3, account } = blockchain;

  const [ethBalance, setEthBalance] = useState();

  //잔액
  const getEthBalance = async () => {
    let balance;
    await web3.eth.getBalance(account.toString()).then((balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei);
      setEthBalance(balance.slice(0, 5));
    });
  };

  useEffect(async () => {
    if (!account) return false;
    await getEthBalance();
  }, [account]);

  return (
    <div className="general-wrapper">
      <img
        src="https://www.sandbox.game/img/30_Profile/eth-back.svg"
        className="background-logo"
      />
      <header>
        <p className="is-text-capitalized">Ethereum Network</p>
      </header>
      <section className="wallet">
        <div className="eth">
          <img
            src="https://www.sandbox.game/img/30_Profile/eth-small.png"
            alt="eth-coin"
            className="crypto-img"
          />
          <div className="eth-balances">
            <p className="crypto-balance">{ethBalance}</p>
            <p className="crypto-name">ETH</p>
            <p className="fiat-balance">0.00 USD</p>
          </div>
        </div>
        <div className="sand">
          <img
            src="https://www.sandbox.game/img/30_Profile/sand-small.png"
            alt="sand-coin"
            className="crypto-img"
          />
          <div className="sand-balances">
            <p className="crypto-balance is-color-yellow">0.00</p>
            <p className="crypto-name is-color-yellow">SAND</p>
            <p className="fiat-balance">0.00 USD</p>
          </div>
        </div>
      </section>
      <style jsx>{`
        .general-wrapper {
          background-image: linear-gradient(242deg, #2748c9, #5e7cf2);
          width: 350px;
          height: 160px;
          padding: 20.38px 0 0 20px;
          box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
          margin: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: flex-start;
          border: solid;
          border-color: #3b4149;
          border-radius: 1rem;
          border-width: 1px;
        }
        .general-wrapper .background-logo {
          position: absolute;
          top: 19.66px;
          right: 13.81px;
          bottom: unset;
          left: unset;
          z-index: 1;
          width: 123px;
          height: 123px;
        }
        img {
          height: auto;
          max-height: 100%;
          max-width: 100%;
          font-style: italic;
          vertical-align: middle;
        }

        .general-wrapper header {
          padding-bottom: 25px;
        }

        .general-wrapper header > p {
          letter-spacing: 0.7px;
          font-size: 14px;
          line-height: 18px;
          font-family: "Montserrat SemiBold";
          color: hsla(0, 0%, 100%, 0.7);
          text-align: left;
        }

        .general-wrapper .wallet {
          width: 100%;
          bottom: 85px;
          z-index: 2;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .general-wrapper .wallet .eth {
          width: 50%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .general-wrapper .wallet .crypto-img {
          width: 26px;
          height: 26px;
        }

        .general-wrapper .wallet .eth .eth-balances {
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: flex-start;
        }

        .general-wrapper .wallet .crypto-balance {
          font-size: 20px;
          line-height: 21px;
          font-family: "Montserrat SemiBold";
          color: #fff;
          text-align: left;
        }

        .general-wrapper .wallet .crypto-name {
          font-size: 14px;
          line-height: 18px;
          font-family: "Montserrat SemiBold";
          color: #fff;
          text-align: left;
        }

        .general-wrapper .wallet .fiat-balance {
          font-size: 14px;
          line-height: 31px;
          font-family: "Montserrat Regular";
          color: hsla(0, 0%, 100%, 0.7);
          text-align: left;
        }

        .general-wrapper .wallet .sand {
          width: 50%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .general-wrapper .wallet .crypto-img {
          width: 26px;
          height: 26px;
        }
        img {
          height: auto;
          max-height: 100%;
          max-width: 100%;
          font-style: italic;
          vertical-align: middle;
        }

        .general-wrapper .wallet .sand .sand-balances {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: flex-start;
        }
        .general-wrapper .wallet .sand .sand-balances {
          padding-left: 10px;
        }

        .is-color-yellow {
          color: #ffbf36 !important;
        }
        .content_wrapprer {
          display: flex;
          justify-content: space-around;
        }
        .content {
          display: flex;
          font-size: 1.5rem;
          align-items: center;
          text-align: center;
          margin: 1rem;
        }
        .content > img {
          width: 4rem;
          margin-right: 2rem;
        }
      `}</style>
    </div>
  );
};

export default NetworkCard;
