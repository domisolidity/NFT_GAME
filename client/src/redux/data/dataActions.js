// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

// const fetchNftSuccess = (payload) =>{
//   return {
//     type: "SAVE_NFT_SUCCESS",
//     payload: payload,
//   }
// }
// const fetchNftFailed = (payload) =>{
//   return {
//     type: "SAVE_NFT_Failed",
//     payload: payload,
//   }
// }

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      console.log(account)
      let myNft = await store.getState().blockchain.nftContract.methods.getMyToken().call({from:account.toString()});
      console.log(myNft.uri)
      console.log(myNft.id)
      dispatch(
        fetchDataSuccess({
          myNftId:myNft.id,
          myNftUri:myNft.uri.slice(6)})
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

// export const saveNfts = (account,nftInfo) =>{
//   return async (dispatch)  => {
//     try {
//       dispatch(
//         fetchNftSuccess({
//           nftInfo
//         })
//       )
//     } catch (error) {
//       console.log(error)
//       dispatch(fetchNftFailed("Nft 저장에 실패하였습니다. 민팅과정 재시도 바랍니다."))
//     }
//   }
// }

// export const getMyNft = account =>{
//   return async (dispatch) =>{
//     try {
//       let myNft = await store.getState().blockchain.nftContract.methods.getMyToken().call({from:account});
//       console.log(myNft.uri)
//       console.log(myNft.id)
//       dispatch(
//         fetchDataSuccess({myNft:myNft})
//       );
//     } catch (error) {
      
//     }
//   }
// }