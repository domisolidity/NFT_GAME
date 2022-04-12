import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { createWrapper } from 'next-redux-wrapper';
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  const store = createStore(rootReducer, composeEnhancers);
  return store
};


const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development,'
});

export default wrapper;