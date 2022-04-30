// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Math/SafeMath.sol";

contract NftContract is ERC721Enumerable {
  using Counters for Counters.Counter;
  using SafeMath for uint;
  // Counters.Counter private tokenIds; //잠깐만 public 사용중
  // Counters.Counter private tokenIds_red; //잠깐만 public 사용중
  // Counters.Counter private tokenIds_green; //잠깐만 public 사용중
  // Counters.Counter private tokenIds_purple; //잠깐만 public 사용중

  event NftHistory(uint indexed tokenId, address from, address to, uint time, string historyType);

  uint16 public tokenIds_red;
  uint16 public tokenIds_green = 60;
  uint16 public tokenIds_purple = 90;
  uint16 public remainedRed = 60 - tokenIds_red;
  uint16 public remainedGreen = 90 - tokenIds_green;
  uint16 public remainedPurple = 100 - tokenIds_purple;

  constructor() ERC721("DoremiGames Nft Token", "REMIN") {}

  // uint8 public constant totalSupply = 100;
  mapping(uint => string) tokenURIs;

  struct RenderToken {
    uint16 id;
    string uri;
  }

  mapping(address => RenderToken[]) public myNfts;

  modifier isOwner(address _tokenOwner) {
    require(_tokenOwner == msg.sender, "you are not tokenOwner");
    _;
  }

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
    uint16 _tokenId
  ) public {
    string memory tokenUri = tokenURI(_tokenId);

    for (uint16 i = 0; i < myNfts[_from].length; i++) {
      if (_tokenId == myNfts[_from][i].id) {
        myNfts[_from][i] = myNfts[_from][myNfts[_from].length - 1];
      }
    }
    myNfts[_to].push(RenderToken(_tokenId, tokenUri));
    safeTransferFrom(_from, _to, _tokenId);
  }

  function getMyToken(address _tokenOwner) public view isOwner(_tokenOwner) returns (RenderToken[] memory) {
    uint balanceLength = balanceOf(_tokenOwner);

    RenderToken[] memory renderToken = new RenderToken[](balanceLength);

    for (uint256 i = 0; i < balanceLength; i++) {
      uint16 tokenId = uint16(tokenOfOwnerByIndex(_tokenOwner, i));
      string memory tokenUri = tokenURI(tokenId);

      renderToken[i] = RenderToken(tokenId, tokenUri);
    }
    return renderToken;
  }

  function haveTokenBool(address _tokenOwner) public view isOwner(_tokenOwner) returns (bool) {
    uint balanceLength = balanceOf(_tokenOwner);
    if (balanceLength > 0) {
      return true;
    } else {
      return false;
    }
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

  // "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", uri, purple, 3, 15500000
  // nft 생성
  function create(
    address _to,
    string memory _tokenURI,
    uint _grade,
    uint _amount,
    uint _timestamp
  ) external payable returns (RenderToken[] memory) {
    require(remainedRed > 0 || remainedGreen > 0 || remainedPurple > 0, "All quantities have been exhausted.");
    require(balanceOf(_to) <= 3, "You can purchase up to 3");

    RenderToken[] memory renderToken = new RenderToken[](_amount);
    for (uint i = 0; i < _amount; i++) {
      require(_grade == 1 || _grade == 2 || _grade == 3, "This is the wrong approach.");

      uint16 tokenId;

      if (_grade == 1) {
        require(msg.value == 0.0003 ether * _amount, "value error");
        tokenIds_red++;
        tokenId = tokenIds_red;
        remainedRed = 60 - tokenIds_red;
      } else if (_grade == 2) {
        require(msg.value == 0.0005 ether * _amount, "value error");
        tokenIds_green++;
        tokenId = tokenIds_green;
        remainedGreen = 90 - tokenIds_green;
      } else if (_grade == 3) {
        require(msg.value == 0.001 ether * _amount, "value error");
        tokenIds_purple++;
        tokenId = tokenIds_purple;
        remainedPurple = 100 - tokenIds_purple;
      }
      myNfts[msg.sender].push(RenderToken(tokenId, _tokenURI));
      renderToken[i] = RenderToken(tokenId, _tokenURI);

      _mint(_to, tokenId);
      _setTokenURI(tokenId, _tokenURI);

      emit NftHistory(tokenId, address(this), _to, _timestamp, "Mint");
    }

    return renderToken;
  }

  function nftEventTrigger(
    uint tokenId,
    address from,
    address to,
    uint time,
    string memory historyType
  ) public {
    emit NftHistory(tokenId, from, to, time, historyType);
  }

  function getMyLastNft(address _account) public view returns (RenderToken memory) {
    uint myNftLength = myNfts[_account].length;
    return myNfts[_account][myNftLength - 1];
  }
}

//remixd -s . --remix-ide https://remix.ethereum.org
//ipfs://QmegNmnxoh6gQWvk1xkbq45dGWt8dzpiTzHSxrp5WAwChS (pinata)
//ipfs://QmaGTbhBGBfdH6gXLoC4V5GScY1mtxac4Ye6ynA1Djw6mZ (localhost)
