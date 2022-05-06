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
  mainNftData: null,
  errorMsg: "",
  auth: false,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        errorMsg: "",
      };
    case "CONNECTION_FAILED":
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
        mainNftData: action.payload.mainNftData,
      };
    case "UPDATE_MAIN_NFT":
      return {
        ...state,
        mainNftData: action.payload.mainNftData,
      };
    case "AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    case "WEB3":
      return {
        ...state,
        web3: action.payload,
      };
    case "CONTRACT":
      return {
        ...state,
        networkId: action.payload.networkId,
        account: action.payload.account.toString(),
        nftContract: action.payload.nftContract,
        nftDealContract: action.payload.nftDealContract,
        gameTokenContract: action.payload.gameTokenContract,
        auctionCreatorContract: action.payload.auctionCreatorContract,
        claim20_Contract: action.payload.claim20_Contract,
        stakingContract: action.payload.stakingContract,
        mainNftData: action.payload.mainNftData,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
