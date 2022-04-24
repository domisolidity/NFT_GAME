import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  loading: false,
  account: null,
  userName: null,
  userImage: null,
  auth: false,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case ActionTypes.USER_LOGIN_FAILED:
      return {
        ...initialState,
        loading: false,
      };
    case ActionTypes.USER_LOGIN_UPDATE:
      return {
        ...initialState,
        loading: false,
        ...payload,
      };
    case ActionTypes.USER_LOGIN_AUTH:
      return {
        ...state,
        loading: false,
        ...payload,

      };
    case ActionTypes.USER_LOGOUT:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;