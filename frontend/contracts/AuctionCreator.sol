//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auction.sol";
import "./NftDealContract.sol";

// 경매 컨트랙트 생성용 컨트랙트
contract AuctionCreator {
  NftDealContract public nftDealContract;

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

  constructor(address _nftDealContract) {
    nftDealContract = NftDealContract(_nftDealContract);
  }

  //경매 컨트랙트 생성 함수
  function createAuction(
    uint8 _tokenId,
    address _nftContractAddres,
    uint _startBid,
    uint _startTime,
    uint _endTime
  ) public {
    require(!nftDealContract.onSale(_tokenId), "this token is saling");
    Auction newAuction = new Auction(msg.sender, _nftContractAddres, _startBid, _startTime, _endTime, _tokenId);
    auctionToId[_tokenId] = newAuction;

    auctionNfts.push(AuctionNft(msg.sender, _tokenId, endBlock, _endTime, newAuction));
  }

  //     // 경매
  //   function cancelAuctionContract(uint _tokenId) external {
  //     for (uint256 i = 0; i < auctionNfts.length; i++) {
  //         if(auctionNfts[i].tokenId == _tokenId){
  //             require(msg.sender == auctionNfts[i].account, "you are not this contract owner");
  //             auctionNfts[i] = auctionNfts[auctionNfts.length - 1];
  //             auctionNfts.pop();
  //             break;
  //         }
  //     }
  //     delete auctionToId[_tokenId];
  //   }

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
