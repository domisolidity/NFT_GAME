import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";
import missionReducer from "./dailyMission/dailyMissionReducer";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
  mission: missionReducer,
});

const middleware = [thunk];

const composeEnhancers =
  process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? compose(applyMiddleware(...middleware))
    : composeWithDevTools(applyMiddleware(...middleware));

const configureStore = () => {
  const store = createStore(rootReducer, composeEnhancers);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NEXT_PUBLIC_APP_ENV === "development,",
});

export default wrapper;
