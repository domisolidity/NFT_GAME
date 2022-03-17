// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./NftContract.sol";

contract SaleAnimalToken {
    NftContract public nftContractAddres;

    constructor (address _nftContractAddres) {
        nftContractAddres = NftContract(_nftContractAddres);
    }

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
        require(_price > 0 , "price is zero or lower");
        require(nftPrices[_tokenId] == 0,"this nft is already on a sale");
        // 토큰 소유자에게 판매 권한을 받아야 됨
        require(nftContractAddres.isApprovedForAll(nftTokenOwner, address(this)), "Animal token owner did not approve token.");
    
        nftPrices[_tokenId] = _price;

        // 판매중인 토큰에 매개변수 넣음
        onSaleNftArray.push(_tokenId);
    
    }

    function buyNft(uint256 _tokenId) public payable{
        uint256 price = nftPrices[_tokenId];
        address seller = nftContractAddres.ownerOf(_tokenId);
        require(price > 0, " token not sale.");
        require(price <= msg.value, "not enought price");
        require(seller != msg.sender, "you are not token owner.");
    
        payable(seller).transfer(msg.value);

        nftContractAddres.safeTransferFrom(seller, msg.sender, _tokenId); //토큰 구매자에게 이동
        
        nftPrices[_tokenId] = 0;

        for(uint256 i=0; i < onSaleNftArray.length; i++){
            if(nftPrices[onSaleNftArray[i]] == 0){
                onSaleNftArray[i] = onSaleNftArray[onSaleNftArray.length - 1];
                onSaleNftArray.pop();
            }
        }
    }
    // 길이를 통해 for문 돌려서 프론트에 판매중인 리스트 가져올 용도
    function getOnSaleNftArrayLength() view public returns(uint256){
        return onSaleNftArray.length;
    }

    function getNftTokenPrice(uint256 _tokenId) view public returns (uint256) {
        return nftPrices[_tokenId];
    }
}