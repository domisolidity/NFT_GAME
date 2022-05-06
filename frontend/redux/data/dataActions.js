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

export const addAuctionList = (id, grade, attributes, name, image, description) => {
  return (dispatch) => {
    try {
      const auctionNftInfo = {
        id: id,
        grade: grade,
        attributes: attributes,
        name: name,
        image: image,
        description: description,
      };
      console.log(id);
      console.log(image);
      console.log(description);
      console.log(auctionNftInfo);

      dispatch(
        addAuctioningList({
          kdkd: id,
          auctionList: auctionNftInfo,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

const onSaleNfts = [];
export const getSaleNft = (data, tokenId, price) => {
  return (dispatch) => {
    try {
      console.log("getSaleNft-dataActions");
      console.log(data);
      let nftInfo = {
        tokenId: tokenId,
        price: price,
        name: data.name,
        description: data.description,
        img: data.img,
      };
      onSaleNfts.push(nftInfo);
      console.log("getSaleNft-finished");
      dispatch(fetchDataSuccess({ onSaleNfts: onSaleNfts }));
    } catch (error) {
      console.log(error);
    }
  };
};
