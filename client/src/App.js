import React from "react";

import Main from "./pages/Main";
import BlockGame from "./pages/BlockGame";
import Rank from "./pages/Rank";
import Market from "./pages/Market";
import MarketDetail from "./pages/Market/MarketDetail"; // 마켓에 nft 상세 정보 > 이름 나중에 수정하기
import Market_sell from "./pages/Market/Market_sell"; // 마이페이지에서 구현하고 없앨 예정
import Nft from "./pages/Nft";
import NftDetail from "./pages/NftDetail.jsx"; // 넣는건가?
import Mypage from "./pages/Mypage";
import NftDetail_my from "./pages/MyPage/NftDetail"; // 10번줄 nftDetail 안쓰면 뒤에 _my 뺼 예정
import NftSell from "./pages/MyPage/NftSell";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="/game" element={<BlockGame />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/market" element={<Market />} />
      <Route path="/market/:id" element={<MarketDetail />} />
      <Route path="/market/sell" element={<Market_sell />} />
      <Route path="/nft" element={<Nft />} />
      <Route path="/nft/:grade" element={<NftDetail/>} />
      <Route path="mypage" element={<Mypage />} />
      <Route path="mypage/:id"  element={<NftDetail_my />} />
    
      <Route path="mypage/:id/sell" element={<NftSell />} />
    </Routes>

  );
};

export default App;
