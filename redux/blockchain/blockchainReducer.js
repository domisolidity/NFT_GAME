const initialState = {
  loading: false,
  account: null,
  networkId: null,
  nftContract: null,
  nftDealContract: null,
  gameTokenContract: null,
  auctionCreatorContract: null,
  claim20_Contract: null,
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
        account: action.payload.account.toString(),
        networkId: action.payload.networkId,
        nftContract: action.payload.nftContract,
        nftDealContract: action.payload.nftDealContract,
        gameTokenContract: action.payload.gameTokenContract,
        auctionCreatorContract: action.payload.auctionCreatorContract,
        claim20_Contract: action.payload.claim20_Contract,
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
        account: action.payload.account.toString(),
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
