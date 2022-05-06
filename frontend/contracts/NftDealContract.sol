// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./NftContract.sol";

contract NftDealContract {
  NftContract public nftContractAddres;

  event NftHistory(uint indexed tokenId, address from, address to, uint time, string historyType);

  constructor(address _nftContractAddress) {
    nftContractAddress = NftContract(_nftContractAddress);
  }

  event submitSell(uint tokenId, uint price, address tokenOwner, string tokenUri);

  //토큰별 가격
  mapping(uint256 => uint256) public nftPrices;

  //판매중 nft
  uint256[] public onSaleNftArray;

  // @ 판매 함수
  function sellNft(uint256 _tokenId, uint256 _price) public {
    // 토큰 주인
    address nftTokenOwner = nftContractAddres.ownerOf(_tokenId);

    //주인이어야 등록
    require(nftTokenOwner == msg.sender, "you are not token owner.");
    require(_price > 0, "price is zero or lower");
    require(nftPrices[_tokenId] == 0, "this nft is already on a sale");
    // 토큰 소유자에게 판매 권한을 받아야 됨
    require(
      nftContractAddres.isApprovedForAll(nftTokenOwner, address(this)),
      "Animal token owner did not approve token."
    );

    nftPrices[_tokenId] = _price;

    // 판매중인 토큰에 매개변수 넣음
    onSaleNftArray.push(_tokenId);

    emit submitSell(_tokenId, _price, nftTokenOwner, nftContractAddres.tokenURI(_tokenId));
  }

  function buyNft(uint256 _tokenId, uint _timestamp) public payable {
    // uint256 price = nftPrices[_tokenId];
    address seller = nftContractAddres.ownerOf(_tokenId);
    // require(nftPrices[_tokenId]; > 0, " token not sale.");
    // require(nftPrices[_tokenId]; <= msg.value, "not enought price");
    // require(seller != msg.sender, "you are not token owner.");
    uint fee = (msg.value / 100) * 5;
    payable(0xBE005997Cc214577c575cAb11d0430777145a7dd).transfer(fee);
    payable(seller).transfer(msg.value - fee);

    nftContractAddres.safeTransferFrom(seller, msg.sender, _tokenId); //토큰 구매자에게 이동

    nftPrices[_tokenId] = 0;

    for (uint256 i = 0; i < onSaleNftArray.length; i++) {
      if (nftPrices[onSaleNftArray[i]] == 0) {
        onSaleNftArray[i] = onSaleNftArray[onSaleNftArray.length - 1];
        onSaleNftArray.pop();
      }
    }

    // nft history 이벤트 트리거
    nftContractAddress.nftEventTrigger(_tokenId, seller, msg.sender, _timestamp, "Shop");
  }

  // 길이를 통해 for문 돌려서 프론트에 판매중인 리스트 가져올 용도
  function getOnSaleNftArrayLength() public view returns (uint256) {
    return onSaleNftArray.length;
  }

  function onSale(uint _tokenId) public view returns (bool) {
    if (nftPrices[_tokenId] == 0) {
      return false;
    } else {
      return true;
    }
  }

  //
  function getOnSaleNftArray() public view returns (uint256[] memory) {
    return onSaleNftArray;
  }

  function getNftTokenPrice(uint256 _tokenId) public view returns (uint256) {
    return nftPrices[_tokenId];
  }
}
/*
  구매 로직

  1) 민팅 계약 배포
  2) 1)의 address 인수로 받아 거래 계약 배포
---------------------
  3) 2)의 address 가지고 setApprovalForAll( 2) , true)함수 실행
  =>    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
        }
  (내부에 msgsender도 있어서 호출한 주소에 한해 2)의 거래계약에 대한 권한 넘겨주는 개념)
  4) 2) 내부에 판매함수에 대한 권한을 얻게 된다. (판매가능)

*/

// emit nftContractAddres.NftHistory(_tokenId,owner,recipient,_timestamp,"AuctionShop");
