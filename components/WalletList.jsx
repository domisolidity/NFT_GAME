import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../redux/blockchain/blockchainActions";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { metamaskLogin } from "../redux/actions/metamaskActions";

const WalletList = (props) => {
  const { toggle } = props;
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.userLog);
  const metamask = useSelector((state) => state.metamask);

  const { auth } = userLog;
  const { account } = metamask;

  // const getConnectWallet = () => {
  //   dispatch(connectWallet());
  //   toggle();
  // };

  let onboarding = new MetaMaskOnboarding();

  // let web3 = new Web3(window.ethereum);

  useEffect(() => {
    if (!account) return;
    console.log(account);
    console.log(metamask);
  }, [account]);

  // const isMetaMaskConnected = () => account && account.length > 0;
  // console.log(isMetaMaskConnected());

  const getMetamaskWallet = async () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      //dispatch(alertMsg("메타마스크가 설치되어 있지 않습니다.)); //=> 알림창
      alert("메타마스크가 설치되어 있지 않습니다. 설치 페이지로 이동합니다.");
      toggle();
      onboarding.startOnboarding(); // => 다운로드 페이지 새창열기
    } else if (account && auth) {
      if (onboarding) {
        onboarding.stopOnboarding();
      }
    } else {
      //메타마스크 로그인 시작
      dispatch(metamaskLogin());
      toggle();
    }
  };

  return (
    <div>
      <h3 className="p-4 border-bottom text-header ">Connect To A Wallet</h3>
      <div className="list-connect">
        <a target="_blank" className="mb-2 d-block item-connect">
          <button
            className="button width-full v-align-middle d-flex"
            onClick={getMetamaskWallet}
          >
            <div> Metamask </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/metamask.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> Binance Chain Wallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/bsc.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        {/* <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> TrustWallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/trustwallet.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> MathWallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/mathwallet.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> TokenPocket </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/tokenpocket.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> SafePal Wallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/safepalwallet.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> WalletConnect </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/walletconnect.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> ONTO Wallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/ontowallet.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> Coin98 Wallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/coin98.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <a target="_blank" className="mb-2 d-block item-connect">
          <button className="button width-full v-align-middle d-flex">
            <div> Clover Wallet </div>
            <div>
              <img
                src="https://bunicorn.exchange/images/connectors/clover.png"
                height="28"
                width="28"
                className="v-align-middle"
              />
            </div>
          </button>
        </a>
        <div className="learn-connect"></div> */}
      </div>

      <style jsx>{`
        .modal-account {
          color: var(--text-color);
        }

        .list-connect .button {
          font-family: DelaGothicOne-Regular;
          font-size: 12px;
        }

        .modal-account .text-header {
          color: var(--secondary-text-color);
          background-color: var(--tab-background);
          /* color: #fff;
          background-color: #1b3148; */
          font-size: 22px;
          line-height: 35px;
          padding: 20px 40px !important;
        }
        /* 
        .icon-close-modal {
          padding: 30px 40px !important;
        } */

        .list-connect {
          padding: 20px 40px;
          overflow-y: scroll;
          max-height: 440px;
        }

        .button {
          background: rgba(244, 120, 32, 0.1) !important;
          border: 0 !important;
          align-items: center;
          justify-content: space-between;
          color: #f47820;
          font-size: 15px;
          line-height: 20px;
          font-family: Lato-Bold;
          padding: 0 30px;
        }

        .button:hover {
          background: #f47820 !important;
          color: #fff !important;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background-clip: padding-box;
          border-radius: 6px;
          background-color: var(--text-btn-search);
        }
      `}</style>
    </div>
  );
};

export default WalletList;
