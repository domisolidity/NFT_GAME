import React from "react";

import "./layout.css";

import Header from "./Header";
import App from "../../App";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <Header />
      </header>
      <content className="layout__content">
        <App />
      </content>
      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
