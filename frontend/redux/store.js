import { applyMiddleware, createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
});

const configureStore = () => {
  const store = createStore(combinedReducer, bindMiddleware([thunk]));
  return store;
};

export const wrapper = createWrapper(configureStore);
