import { ActionTypes } from "../constants/actionTypes";

import NftContract from "../../contracts/artifacts/NftContract.json";
import NftDealContract from "../../contracts/artifacts/NftDealContract.json";
import GameTokenContract from "../../contracts/artifacts/GameToken.json";
import Claim20_Contract from "../../contracts/artifacts/Claim_20.json";
import Staking from "../../contracts/artifacts/Staking.json";
import AuctionCreatorContract from "../../contracts/artifacts/AuctionCreator.json";
import { alertMsg } from '../../_redux/actions/alertActions'

import Web3 from "web3";

export const ConnectContract = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CONTRACT_DATA_REQUEST })

    let networkId;
    try {
      let web3 = new Web3(window.ethereum);

      networkId = await window.ethereum.request({
        method: "net_version",
      });

      const nft_Network = await NftContract.networks[networkId];
      const nftDeal_NetworkData = await NftDealContract.networks[networkId];
      const auctionCreator_NetworkData = await AuctionCreatorContract.networks[networkId];
      const gameToken_NetworkData = await GameTokenContract.networks[networkId];
      const claim20_NetworkData = await Claim20_Contract.networks[networkId];
      const stakingNetworkData = await Staking.networks[networkId];


      const nftContract = new web3.eth.Contract(NftContract.abi, nft_Network.address);
      const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDeal_NetworkData.address);
      const auctionCreatorContract = new web3.eth.Contract(
        AuctionCreatorContract.abi,
        auctionCreator_NetworkData.address
      );
      const gameTokenContract = new web3.eth.Contract(GameTokenContract.abi, gameToken_NetworkData.address);
      const claim20_Contract = new web3.eth.Contract(Claim20_Contract.abi, claim20_NetworkData.address);
      const stakingContract = new web3.eth.Contract(Staking.abi, stakingNetworkData.address);

      dispatch({
        type: ActionTypes.CONTRACT_DATA_SUCCESS,
        payload: {
          NftContract: nftContract,
          NftDealContract: nftDealContract,
          GameTokenContract: gameTokenContract,
          AuctionCreatorContract: auctionCreatorContract,
          Claim20_Contract: claim20_Contract,
          StakingContract: stakingContract,
        }
      })

    } catch (err) {
      console.log("에러발생", err)
      dispatch(alertMsg(`${networkId}로 접속하셨습니다. 네트워크 전환이 필요합니다.`))
      alert(`네트워크 아이디 ${networkId}로 접속하셨습니다. 네트워크 전환이 필요합니다.`)
    }
  }
}

export const mainNftData = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CONTRACT_DATA_REQUEST })

    let networkId;
    try {
      let web3 = new Web3(window.ethereum);

      networkId = await window.ethereum.request({
        method: "net_version",
      });


      const nftContract = new web3.eth.Contract(NftContract.abi, nft_Network.address);

      const stakingContract = new web3.eth.Contract(Staking.abi, stakingNetworkData.address);
      const stakingData = await stakingContract.methods.getStakingData().call({ from: accounts.toString() });
      let mainNftData;
      if (stakingData.tokenId == 0) {
        mainNftData = null;
      } else {
        const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
        const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
        mainNftData = { stakingData: stakingData, mainNftJson: response.data };
      }

      dispatch({
        type: ActionTypes.CONTRACT_DATA_SUCCESS,
        payload: {
          mainNftData: mainNftData,
        }
      })


    } catch (err) {
      console.log("에러발생", err)
      dispatch(alertMsg(err))
      alert(err)
    }
  }
}

