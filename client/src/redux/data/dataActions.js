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

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      console.log(account);
      let myNft = await store.getState().blockchain.nftContract.methods.getMyToken().call({ from: account.toString() });
      console.log(myNft.uri);
      console.log(myNft.id);
      dispatch(
        fetchDataSuccess({
          myNftId: myNft.id,
          myNftUri: myNft.uri.slice(6),
        })
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
//     dispatch(fetchDataRequest());
//     try {
//       console.log(typeof account)
//       if (typeof account == "object"){
//         account = account[0]
//       }
//       await store.getState().blockchain.nftContract.methods.getMyToken().call({from:account}).then(async(result)=>{
//         let myNfts = [];
//         for (const info of result) {
//           if(info.uri == "") continue;
//           const response = await axios.get( `${baseUri}${info.uri.slice(6)}/${info.id}.json`)
//           myNfts.push({
//             id: info.id,
//             name: response.data.name,
//             image: `${baseUri}${response.data.image.slice(6)}`,
//             description: response.data.description,
//           })
//         }
//         console.log("myNft", myNfts);
//         dispatch(
//           fetchDataSuccess({myNfts:myNfts})
//         );
//       })
//     } catch (error) {
//       console.log(error);
//       dispatch(fetchDataFailed("Could not load data from contract."));
//     }
//   }
// }

const onSaleNfts = [];
export const getSaleNft = (data,tokenId, price )=>{
  return (dispatch) =>{
    try {
    
    console.log("getSaleNft-dataActions")
    console.log(data)
    let nftInfo = {
      tokenId : tokenId,
      price : price,
      name : data.name,
      description : data.description,
      img : data.img
    }
    onSaleNfts.push(nftInfo);
    console.log("getSaleNft-finished")
    dispatch(
      fetchDataSuccess({onSaleNfts:onSaleNfts})
    );
      
  } catch (error) {
    console.log(error)
  }
  }
}