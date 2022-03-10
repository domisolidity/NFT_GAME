import React from "react";

import Main from "./Main.jsx";
import BlockGame from "./BlockGame";
import Rank from "./Rank";
import Market from "./Market";
import Nft from "./Nft";
import Mypage from "./Mypage";
import NftDetail from "./NftDetail.jsx";

import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game" element={<BlockGame />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/market" element={<Market />} />
      <Route path="/nft" element={<Nft />} />  
      <Route path="/nft/:grade" element={<NftDetail/>} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default AllRoutes;
