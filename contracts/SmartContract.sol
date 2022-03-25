// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract SmartContract is ERC721, Ownable {
//   constructor() ERC721("Smart Contract", "SC") {}

//   using Counters for Counters.Counter; //이건 뭐지?
//   using Strings for uint; //이건 뭐지?
//   Counters.Counter _tokenIds;
//   mapping(uint => string) _tokenURIs;

//   struct RenderToken {
//     uint16 id;
//     string uri;
//   }

//   function _setTokenURI(uint _tokenId, string memory _tokenURI) internal {
//     _tokenURIs[_tokenId] = _tokenURI;
//   }

//   function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
//     // _exists : 토큰 존재하는지 확인해주는 함수
//     require(_exists(_tokenId));
//     string memory tokenUri = _tokenURIs[_tokenId];
//     return tokenUri;
//   }

//   function getAllTokens() public view returns (RenderToken[] memory) {
//     uint latestId = _tokenIds.current();
//     uint16 counter = 0;
//     RenderToken[] memory res = new RenderToken[](latestId);
//     for (uint i = 0; i < latestId; i++) {
//       if (_exists(counter)) {
//         string memory uri = tokenURI(counter);
//         res[counter] = RenderToken(counter, uri);
//       }
//       counter++;
//     }
//     return res;
//   }

//   function mint(address recipient, string memory uri) public returns (uint) {
//     uint newId = _tokenIds.current();
//     _mint(recipient, newId);
//     _setTokenURI(newId, uri);
//     return newId;
//   }
// }
