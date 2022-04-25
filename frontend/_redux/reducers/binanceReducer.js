import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  loading: false,
  account: null,
  network: null,
  chainId: null,
  error: false,
  errorMsg: "",
}

const binanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.BINANCE_W_CONNECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.BINANCE_W_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.BINANCE_W_CONNECT_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    case ActionTypes.BINANCE_W_CONNECT_UPDATE:
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

export default binanceReducer;