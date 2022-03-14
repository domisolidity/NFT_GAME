// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftContract is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private tokenIds; //잠깐만 public 사용중

  constructor() ERC721("domisol", "DMS") {}

  uint8 public constant totalSupply = 50;
  mapping(uint => string) tokenURIs;
  mapping(address => RenderToken) tokenByOwner;
  struct RenderToken {
    uint16 id;
    string uri;
  }

  // nft별 메타데이터 저장
  function _setTokenURI(uint _tokenId, string memory _tokenURI) internal {
    tokenURIs[_tokenId] = _tokenURI;
  }

  // nft 메타데이터 값 반환
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return tokenURIs[tokenId];
  }

  // 모든 nft 반환(렌더용)
  function getAllTokens() public view returns (RenderToken[] memory) {
    uint latestId = tokenIds.current();
    uint16 counter = 1;
    RenderToken[] memory res = new RenderToken[](latestId);

    for (uint i = 1; i <= latestId; i++) {
      if (_exists(counter)) {
        string memory uri = tokenURI(counter);
        res[counter - 1] = RenderToken(counter, uri);
      }
      counter++;
    }
    return res;
  }

  // 내 nft반환(렌더용)
  function getMyToken() public view returns (RenderToken memory) {
    uint latestId = tokenIds.current();
    RenderToken memory renderToken;

    for (uint16 i = 1; i <= latestId; i++) {
      if (ownerOf(i) == msg.sender) {
        renderToken.id = i;
        renderToken.uri = tokenURI(i);
      }
    }

    return renderToken;
  }

  // => getAllToken()에서 Transfer

  // nft 생성
  function create(address _to, string memory _tokenURI) public returns (uint16) {
    // 50개 차면 민팅 종료
    require(totalSupply > tokenIds.current(), "minting is done");
    tokenIds.increment();

    uint16 newItemId = uint16(tokenIds.current());
    _mint(_to, newItemId);
    tokenURIs[newItemId] = _tokenURI;
    tokenByOwner[msg.sender] = RenderToken(newItemId, _tokenURI);

    return newItemId;
  }

  function remainedNft() public view returns (uint) {
    return totalSupply - tokenIds.current();
  }
}

//remixd -s . --remix-ide https://remix.ethereum.org
//ipfs://QmegNmnxoh6gQWvk1xkbq45dGWt8dzpiTzHSxrp5WAwChS
