import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import store from "./redux/store";
import { Provider } from "react-redux";
import Layout from "./components/layout/Layout.jsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./assets/theme";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider>
        <Layout />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
