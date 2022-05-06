const initialState = {
  loading: false,
  myNftId: null,
  myNftUri: null,
  myNfts: null,
  onSaleNfts: null,
  auctionList: null,
  kdkd: null,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        myNftId: action.payload.myNftId,
        myNftUri: action.payload.myNftUri,
        myNfts: action.payload.myNfts,
        onSaleNfts: action.payload.onSaleNfts,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "SUCCESS_SUBMIT_SALE":
      return {
        ...initialState,
        onSaleNfts: action.payload.onSaleNfts,
      };
    case "ADD_AUCTION":
      console.log(action.payload);
      return {
        ...initialState,
        kdkd: action.payload.kdkd,
        auctionList: action.payload.auctionList,
      };
    default:
      return state;
  }
};

export default dataReducer;
