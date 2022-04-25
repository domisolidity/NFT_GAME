
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import metamaskReducer from '../_redux/reducers/metamaskReducer'
import binanceReducer from '../_redux/reducers/binanceReducer'
import contractReducer from '../_redux/reducers/contractReducer'
import userReducer from '../_redux/reducers/userReducer'
import alertReducer from '../_redux/reducers/alertReducer'


const rootReducer = combineReducers({
  metamask: metamaskReducer,
  binance: binanceReducer,
  contract: contractReducer,
  user: userReducer,
  alert: alertReducer,
});

const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middleware))
    : composeWithDevTools(applyMiddleware(...middleware));

const configureStore = () => {
  const store = createStore(rootReducer, composeEnhancers);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development,",
});

export default wrapper;

