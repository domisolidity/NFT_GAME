import React from "react";

import Main from "./Main.jsx"
import Game from "./Game";
import Rank from "./Rank";
import Claim from "./Claim";
import Nft from "./Nft";
import Mypage from "./Mypage";

import { Route, Routes } from "react-router-dom";

const AllRoutes = (props) => {

  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/game" element={<Game/>} />
      <Route
        path="/rank"
        element={<Rank/>}
      />
      <Route
        path="/claim"
        element={<Claim/>}
      />
      <Route
        path="/nft"
        element={<Nft/>}
      />
      <Route
        path="/mypage"
        element={<Mypage/>}
      />
    </Routes>
  );
};

export default AllRoutes;
