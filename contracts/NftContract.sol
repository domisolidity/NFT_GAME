// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract NftContract is ERC721Enumerable {
        using Counters for Counters.Counter;
    // Counters.Counter private tokenIds; //잠깐만 public 사용중
    // Counters.Counter private tokenIds_red; //잠깐만 public 사용중
    // Counters.Counter private tokenIds_green; //잠깐만 public 사용중
    // Counters.Counter private tokenIds_purple; //잠깐만 public 사용중


    uint16 public tokenIds_red;
    uint16 public tokenIds_green = 60;
    uint16 public tokenIds_purple = 90;
    uint16 public remainedRed = 60 - tokenIds_red; 
    uint16 public remainedGreen = 90 - tokenIds_green; 
    uint16 public remainedPurple = 100 - tokenIds_purple;
    constructor() ERC721("domisol", "DMS") {}
  
    // uint8 public constant totalSupply = 100; 
    mapping(uint => string) tokenURIs;

    struct RenderToken{
      uint16 id;
      string uri;
    }

     mapping(address=>RenderToken[]) public myNfts;
    // nft별 메타데이터 저장
    function _setTokenURI(uint _tokenId,string memory _tokenURI) private{
      tokenURIs[_tokenId] = _tokenURI;
    }

    // nft 메타데이터 값 반환
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      return tokenURIs[tokenId];
    }


    function handOver(address _from, address _to, uint16 _tokenId,uint _idx )public {
      safeTransferFrom(_from, _to, _tokenId);
      delete myNfts[_from][_idx];
      string memory tokenUri = tokenURI(_tokenId);
      myNfts[_to].push(RenderToken(_tokenId,tokenUri));
    }

    function getMyToken() public view returns(RenderToken[] memory){
      return myNfts[msg.sender];
    }
    //=> getAllToken()에서 Transfer

    function remainNfts()public view returns(uint16,uint16,uint16){
        return (remainedRed,remainedGreen,remainedPurple);
    }
    // nft 생성
    function create(address _to, string memory _tokenURI, string  memory _grade)public payable {
      bool red = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("red"));
      bool green = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("green"));
      bool purple = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("purple"));
      require(red || green || purple , "This is the wrong approach.");
      require(remainedRed > 0 || remainedGreen > 0 || remainedPurple > 0, "All quantities have been exhausted.");

        uint16 tokenId;
        if(red) {
          require(msg.value == 0.3 ether,"value error");
          tokenIds_red++;
          tokenId = tokenIds_red;
          remainedRed = 60 - tokenIds_red; 
          myNfts[msg.sender].push(RenderToken(tokenId,_tokenURI));
        } else if(green){
          require(msg.value == 0.5 ether,"value error");
          tokenIds_green++;
          tokenId = tokenIds_green;
          remainedGreen = 90 - tokenIds_green;
          myNfts[msg.sender].push(RenderToken(tokenId,_tokenURI));
        } else if(purple) {
          require(msg.value == 1 ether,"value error");
          tokenIds_purple++;
          tokenId = tokenIds_purple;
          remainedPurple = 100 - tokenIds_purple;
          myNfts[msg.sender].push(RenderToken(tokenId,_tokenURI));
        }

        _mint(_to, tokenId);
        _setTokenURI(tokenId,_tokenURI);

        //setApprovalForAll(배포한 거래 계약 주소, true); => 에러모음에 적기
     }



//========================================================================


    //토큰별 가격
    mapping(uint256 => uint256) public nftPrices;

    //판매중 nft
    uint256[] public onSaleNftArray;

    // @ 판매 함수
    function sellNft(uint256 _tokenId, uint256 _price) public {
        // 토큰 주인
        //주인이어야 등록
        require(ownerOf(_tokenId) == msg.sender, "you are not token owner.");
        require(_price > 0 , "price is zero or lower");
        require(nftPrices[_tokenId] == 0,"this nft is already on a sale");
        // 토큰 소유자에게 판매 권한을 받아야 됨
        require(isApprovedForAll(ownerOf(_tokenId), address(this)), "Animal token owner did not approve token.");
    
        nftPrices[_tokenId] = _price;

        // 판매중인 토큰에 매개변수 넣음
        onSaleNftArray.push(_tokenId);
    
    }

    // // 구매 함수
    function buyNft(uint256 _tokenId) public payable{
        uint256 price = nftPrices[_tokenId];
        address seller = ownerOf(_tokenId);
        require(price > 0, " token not sale.");
        require(price <= msg.value, "not enought price");
        require(seller != msg.sender, "you are not token owner.");
    
        payable(seller).transfer(msg.value);

        safeTransferFrom(seller, msg.sender, _tokenId); //토큰 구매자에게 이동
        
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

//remixd -s . --remix-ide https://remix.ethereum.org
//ipfs://QmegNmnxoh6gQWvk1xkbq45dGWt8dzpiTzHSxrp5WAwChS (pinata)
//ipfs://QmaGTbhBGBfdH6gXLoC4V5GScY1mtxac4Ye6ynA1Djw6mZ (localhost)

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

