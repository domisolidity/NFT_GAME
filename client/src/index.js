import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import store from "./redux/store";
import { Provider} from "react-redux";
import Layout from "./components/layout/Layout.jsx"
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <ChakraProvider>
      <Layout>
        <App />  
      </Layout>
    </ChakraProvider>
    </Provider>
  </BrowserRouter>
  , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();