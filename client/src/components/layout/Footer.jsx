import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">ABOUT US</div>
      <div className="footer__content">
        <div className="footer__item">
          <div className="footer__item-head">TEAM</div>
          <a href="https://github.com/domisolidity/NFT_GAME">
            <i class="bx bxl-github" />
            <div>도레미파솔리디티</div>
          </a>
        </div>
        <div className="footer__item">
          <div className="footer__item-head">DEVELOPERS</div>
          <a href="https://github.com/pier101">
            <i class="bx bxl-github" />
            <div>김동욱</div>
          </a>
          <a href="https://github.com/KimchiChamchi">
            <i class="bx bxl-github" />
            <div>이상민</div>
          </a>
          <a href="https://github.com/codecocos">
            <i class="bx bxl-github" />
            <div>이민주</div>
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        © 2022 Doremifa Sollidity. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
