import React from "react";

import Main from "./pages/Main";
import Game from "./pages/Game";
import Rank from "./pages/Rank";
import Market from "./pages/Market";
import MarketDetail from "./pages/Market/MarketDetail";
import Nft from "./pages/Nft";
import Mypage from "./pages/Mypage";
import NftDetail from "./pages/NftDetail.jsx";
import Market_sell from "./pages/Market/Market_sell";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game" element={<Game />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/market" element={<Market />} />
      <Route path="/market/:id" element={<MarketDetail />} />
      <Route path="/market/sell" element={<Market_sell />} />
      <Route path="/nft" element={<Nft />} />
      <Route path="/nft/:grade" element={<NftDetail />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default App;
