import { ActionTypes } from "../constants/actionTypes";

export const alertMsg = (message) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ALERT_UPDATE, payload: message })
  }
}