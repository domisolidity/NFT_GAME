import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../redux/blockchain/blockchainActions";

const ConnectedModal = (props) => {
  const { toggle } = props;
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const { account } = blockchain;

  // const [scan, setScan] = useState("");

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
  };

  useEffect(() => {
    if (!account) return;
    // setScan(account);
  }, [account]);
  return (
    <div>
      <h3 className="p-4 border-bottom text-header ">Account</h3>
      <div className="list-connect">
        <a
          href={`https://bscscan.com/address/${account}`}
          target="_blank"
          className="mb-2 d-block"
          onClick={toggle}
        >
          <button className="button width-full">
            <div className="d-inline-block v-align-middle line-height-0 mr-2 ml-n1">
              <div
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  padding: "0px",
                  margin: "0px",
                  width: "16px",
                  height: "16px",
                  display: "inline-block",
                  background: "rgb(252, 25, 96)",
                }}
              >
                <svg x="0" y="0" width="16" height="16">
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    transform="translate(-1.9648821102651668 -0.994747498470386) rotate(364.3 8 8)"
                    fill="#1598F2"
                  ></rect>
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    transform="translate(-0.08300866174519939 8.443399956083116) rotate(179.3 8 8)"
                    fill="#F73F01"
                  ></rect>
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    transform="translate(-11.619925695097987 -6.918734684434651) rotate(247.7 8 8)"
                    fill="#FC7500"
                  ></rect>
                </svg>
              </div>
            </div>
            <span className="link">
              {account && account.slice(0, 6) + "..." + account.slice(-4)}
            </span>
            <i className="bx bx-link-external ml-1 link icon-external-link"></i>
            {/* <i className="iconfont ml-1 link icon-external-link"></i> */}
          </button>
        </a>
        <div className="">
          <button className="button width-full mb-2">
            Connect To A Wallet
          </button>
        </div>
        <div className="">
          <button
            className="button width-full text-red mb-2"
            onClick={getDisConnectWallet}
          >
            Log out
          </button>
        </div>
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

        .link {
          /* color: var(--link-color) !important; */
          color: #3990f8 !important;
        }
      `}</style>
    </div>
  );
};
export default ConnectedModal;
