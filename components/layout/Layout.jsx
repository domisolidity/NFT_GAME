import React from "react";

import "./layout.css";

import Header from "./Header";
import App from "../../App";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout__header">
        <Header />
      </div>
      <div className="layout__content">
        <App />
      </div>
      <div className="layout__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
