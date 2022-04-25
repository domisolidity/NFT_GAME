import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  loading: false,
  NftContract: null,
  NftDealContract: null,
  AuctionContract: null,
  AuctionCreatorContract: null,
  Claim20_Contract: null,
  GameTokenContract: null,
  StakingContract: null,
  mainNftData: null,
  error: false,
  errorMsg: "",
}

const contractReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CONTRACT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CONTRACT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.CONTRACT_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    case ActionTypes.CONTRACT_DATA_UPDATE:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default contractReducer;