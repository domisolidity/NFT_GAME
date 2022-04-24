import { ActionTypes } from "../constants/actionTypes";
import Web3 from "web3";

// import { severLogin } from "./userLogActions";

export const metamaskLogin = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.METAMASK_W_CONNECT_REQUEST });
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      dispatch({
        type: ActionTypes.METAMASK_W_CONNECT_SUCCESS,
        payload: { account: accounts[0], network: networkId, chainId: chainId },
      });

      // dispatch(severLogin(accounts[0]))

    } catch (error) {
      console.error(error)
      dispatch({ type: ActionTypes.METAMASK_W_CONNECT_FAILED, payload: { errorMsg: error } })
    }
  }
}

export const getWeb3 = () => {
  return async (dispatch) => {
    let web3 = new Web3(window.ethereum);
    console.log(web3)

    dispatch({ type: ActionTypes.METAMASK_W_CONNECT_REQUEST });
    dispatch({
      type: ActionTypes.METAMASK_W_CONNECT_SUCCESS,
      payload: { web3: web3 },
    });

  }
}

export const metamaskAuth = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.METAMASK_W_CONNECT_REQUEST });
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      dispatch({
        type: ActionTypes.METAMASK_W_CONNECT_UPDATE,
        payload: { account: accounts[0], network: networkId, chainId: chainId },
      });
    } catch (error) {
      console.error(error)
      dispatch({ type: ActionTypes.METAMASK_W_CONNECT_FAILED, payload: { errorMsg: error } })
    }
  }
}

