//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auction.sol";

// 경매 컨트랙트 생성용 컨트랙트
contract AuctionCreator {
  mapping(uint => Auction) public auctionToId;
  uint private endBlock;

  struct AuctionNft {
    address account;
    uint8 tokenId;
    uint endBlockNum;
    uint endTime;
    Auction auctionContract;
  }
  AuctionNft[] public auctionNfts;

  //경매 컨트랙트 생성 함수
  function createAuction(
    uint8 _tokenId,
    address _nftContractAddres,
    uint _startBid,
    uint _remainedBlock,
    uint _expirationTime
  ) public {
    Auction newAuction = new Auction(msg.sender, _nftContractAddres, _startBid, _remainedBlock, _tokenId);
    auctionToId[_tokenId] = newAuction;

    endBlock = block.number + _remainedBlock;

    auctionNfts.push(AuctionNft(msg.sender, _tokenId, endBlock, _expirationTime, newAuction));
  }

  function getAuctionAddress(uint _tokenId) public view returns (Auction) {
    return auctionToId[_tokenId];
  }

  function getAuctioningNft() external view returns (AuctionNft[] memory) {
    return auctionNfts;
  }

  function getCurrentBlock() external view returns (uint) {
    return block.number;
  }
}
/*
 ipfs://QmaGTbhBGBfdH6gXLoC4V5GScY1mtxac4Ye6ynA1Djw6mZ
    0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    91
    0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47
    10000
    30
 */
