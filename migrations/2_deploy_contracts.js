var NftContract = artifacts.require("./NftContract.sol");
var NftDealContract = artifacts.require("./NftDealContract.sol");
var GameToken = artifacts.require("./GameToken.sol");
var AuctionCreator = artifacts.require('./AuctionCreator.sol');

module.exports = async function (deployer) {
  await deployer.deploy(NftContract);
  await deployer.deploy(NftDealContract, NftContract.address);
  await deployer.deploy(GameToken);
  await deployer.deploy(AuctionCreator);
};


/*
  - 게임 "승리"시 토큰보상 구현 어떻게
  - bep20토큰 구현
  - 마켓 기능 보완
      - 거래 기록 정보 표시/차트화
      - 경매 기능
  
  - nft 스테이킹 or 마이닝 개념
      - nft레벨에 따라 마이닝 보상 확대
      - 스테이킹/마이닝 기간에 따라 레벨 업 --> 이 부분은 고려(레벨업 방식)
      - 스테이킹/마이닝에 따른 거버넌스?토큰 지급
  - 거버넌스 토큰 활용한 투표기능  
*/