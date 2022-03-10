import React from "react";

import Main from "./pages/Main";
import BlockGame from "./pages/BlockGame";
import Rank from "./pages/Rank";
import Market from "./pages/Market";
import Nft from "./pages/Nft";
import Mypage from "./pages/Mypage";
import NftDetail from "./pages/NftDetail.jsx";

import { Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game" element={<BlockGame />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/market" element={<Market />} />
      <Route path="/nft" element={<Nft />} />
      <Route path="/nft/:grade" element={<NftDetail />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default App;

