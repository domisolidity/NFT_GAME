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
    function _setTokenURI(uint _tokenId,string memory _tokenURI) internal{
      tokenURIs[_tokenId] = _tokenURI;
    }

    // nft 메타데이터 값 반환
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      return tokenURIs[tokenId];
    }


    function handOver(address from, address to, uint16 tokenId,uint idx )public {
      safeTransferFrom(from, to, tokenId);
      delete myNfts[from][idx];
      string memory tokenUri = tokenURI(tokenId);
      myNfts[to].push(RenderToken(tokenId,tokenUri));
    }

    function getMyToken() public view returns(RenderToken[] memory){
      return myNfts[msg.sender];
    }
    //=> getAllToken()에서 Transfer

    function remainNfts()public view returns(uint16,uint16,uint16){
        return (remainedRed,remainedGreen,remainedPurple);
    }
    // nft 생성
    function create(address _to, string memory _tokenURI, string  memory _grade)public payable returns (uint16){
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

        uint16 newItemId = uint16(tokenId);
        _mint(_to, newItemId);
        tokenURIs[newItemId] = _tokenURI;

        return newItemId;
    }



}

//remixd -s . --remix-ide https://remix.ethereum.org
//ipfs://QmegNmnxoh6gQWvk1xkbq45dGWt8dzpiTzHSxrp5WAwChS (gateway)
//ipfs://QmaGTbhBGBfdH6gXLoC4V5GScY1mtxac4Ye6ynA1Djw6mZ (localhost)
