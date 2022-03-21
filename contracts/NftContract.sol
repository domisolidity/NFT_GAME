// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract NftContract is ERC721Enumerable {
  using Counters for Counters.Counter;

  uint16 public tokenIds_red;
  uint16 public tokenIds_green = 60;
  uint16 public tokenIds_purple = 90;
  uint16 public remainedRed = 60 - tokenIds_red;
  uint16 public remainedGreen = 90 - tokenIds_green;
  uint16 public remainedPurple = 100 - tokenIds_purple;

  constructor() ERC721("domisol", "DMS") {}

  // uint8 public constant totalSupply = 100;
  mapping(uint => string) tokenURIs;

  struct RenderToken {
    uint16 id;
    string uri;
  }

  mapping(address => RenderToken[]) public myNfts;

  // nft별 메타데이터 저장
  function _setTokenURI(uint _tokenId, string memory _tokenURI) private {
    tokenURIs[_tokenId] = _tokenURI;
  }

  // nft 메타데이터 값 반환
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return tokenURIs[tokenId];
  }

  function handOver(
    address _from,
    address _to,
    uint16 _tokenId,
    uint _idx
  ) public {
    safeTransferFrom(_from, _to, _tokenId);
    delete myNfts[_from][_idx];
    string memory tokenUri = tokenURI(_tokenId);
    myNfts[_to].push(RenderToken(_tokenId, tokenUri));
  }

  function getMyToken(address _tokenOwner) public view returns (RenderToken[] memory) {
    uint balanceLength = balanceOf(_tokenOwner);

    require(balanceLength != 0, "Owner did not have token.");

    RenderToken[] memory renderToken = new RenderToken[](balanceLength);

    for (uint256 i = 0; i < balanceLength; i++) {
      uint16 tokenId = uint16(tokenOfOwnerByIndex(_tokenOwner, i));
      string memory tokenUri = tokenURI(tokenId);

      renderToken[i] = RenderToken(tokenId, tokenUri);
    }
    return renderToken;
  }

  function remainNfts()
    public
    view
    returns (
      uint16,
      uint16,
      uint16
    )
  {
    return (remainedRed, remainedGreen, remainedPurple);
  }

  // nft 생성
  function create(
    address _to,
    string memory _tokenURI,
    string memory _grade
  ) public payable {
    bool red = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("red"));
    bool green = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("green"));
    bool purple = keccak256(abi.encodePacked(_grade)) == keccak256(abi.encodePacked("purple"));
    require(red || green || purple, "This is the wrong approach.");
    require(remainedRed > 0 || remainedGreen > 0 || remainedPurple > 0, "All quantities have been exhausted.");

    uint16 tokenId;
    if (red) {
      require(msg.value == 0.3 ether, "value error");
      tokenIds_red++;
      tokenId = tokenIds_red;
      remainedRed = 60 - tokenIds_red;
      myNfts[msg.sender].push(RenderToken(tokenId, _tokenURI));
    } else if (green) {
      require(msg.value == 0.5 ether, "value error");
      tokenIds_green++;
      tokenId = tokenIds_green;
      remainedGreen = 90 - tokenIds_green;
      myNfts[msg.sender].push(RenderToken(tokenId, _tokenURI));
    } else if (purple) {
      require(msg.value == 1 ether, "value error");
      tokenIds_purple++;
      tokenId = tokenIds_purple;
      remainedPurple = 100 - tokenIds_purple;
      myNfts[msg.sender].push(RenderToken(tokenId, _tokenURI));
    }

    _mint(_to, tokenId);
    _setTokenURI(tokenId, _tokenURI);

    //setApprovalForAll(배포한 거래 계약 주소, true); => 에러모음에 적기
  }
}

//remixd -s . --remix-ide https://remix.ethereum.org
//ipfs://QmegNmnxoh6gQWvk1xkbq45dGWt8dzpiTzHSxrp5WAwChS (pinata)
//ipfs://QmaGTbhBGBfdH6gXLoC4V5GScY1mtxac4Ye6ynA1Djw6mZ (localhost)
