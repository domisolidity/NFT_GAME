const initialState = {
  loading: false,
  account: null,
  nftContract: null,
  nftDealContract: null,
  web3: null,
  errorMsg: "",
  auth: false,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        nftContract: action.payload.nftContract,
        nftDealContract: action.payload.nftDealContract,
        web3: action.payload.web3,
        errorMsg: "",
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
