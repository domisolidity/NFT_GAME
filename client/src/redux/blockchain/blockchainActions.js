// constants
import Web3 from "web3";
import SimpleStorage from "../../contracts/SimpleStorage.json";

// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("networkId : ", networkId);
        const NetworkData = await SimpleStorage.networks[networkId];
        console.log(NetworkData.address);
        if (networkId) {
          const simpleStorage = new web3.eth.Contract(SimpleStorage.abi, NetworkData.address);
          dispatch(
            connectSuccess({
              account: accounts[0],
              simpleStorage: simpleStorage,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network"));
        }
      } catch (err) {
        dispatch(connectFailed("메타마스크 로그인을 해주세요."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    // dispatch(fetchData(account));
  };
};
