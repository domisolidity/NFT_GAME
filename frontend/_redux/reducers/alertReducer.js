import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  message: "",
}

const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALERT_UPDATE:
      return {
        ...state,
        message: payload,
      };
    case ActionTypes.ALERT_DELETE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default alertReducer;