// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// import "./NftContract.sol";
// import "./GameToken.sol";

contract Staking {
  event nftStakeEvent(address indexed account, uint indexed tokenId, uint time);
  event tokenStakeEvent(address indexed account, uint time);

  // GameToken public gametoken;
  // NftContract public nfttoken;

  uint daytime;
  mapping(uint => address) stakingAsset;
  mapping(address => uint) earn;
  mapping(address => mapping(uint => uint)) updateTimeByNft;

  mapping(address => uint) startTime;
  mapping(address => uint) endTime;

  // constructor(GameToken _gametoken, NftContract _nfttoken) {
  //   gametoken = _gametoken;
  //   nfttoken = _nfttoken;
  // }

  // uint ReferenceTimestamp = 1649808000; // 기준날짜 2022.04.13. 09:00
  // uint endTime = block.timestamp / ReferenceTimestamp;

  // 보상은 스테이킹 기간 하루 당 1~3개 (red, green, purple)
  //   보상 = ((스테이킹끝나는날짜 - 스테이킹시작날짜) / 하루(24hour))의 몫
  // 스테이킹 끝나는 날짜 = getEndTime()

  //   보상 = ((getEndTime() - 스테이킹시작날짜) / 하루(24hour))의 몫
  /*
    modifier
  */

  // 스테이킹 할때는 스테이킹하는 시점의 시간,
  // 보상 받을 때는 스테이킹 끝나는 시간

  // 스테이킹 끝나는 날 반환기
  function setEndTime() public view returns (uint) {
    uint ReferenceTimestamp = 1649808000; // 기준날짜 2022.04.13. 09:00
    // 기준날짜에서 현재시간의 차이를 1주일로 나눈 몫
    uint temp = (block.timestamp - ReferenceTimestamp) / 1 weeks;
    // 기준날짜에서 차이나는 주만큼 더해서 스테이킹 끝날 날짜를 반환

    return ReferenceTimestamp + temp * 1 weeks + 1 weeks;
  }

  // 스테이크 시간
  modifier updateStake(address _account, uint _tokenId) {
    // 스테이킹 하는 본인 address의 tokenId 매핑에 시간값이 담김
    updateTimeByNft[_account][_tokenId] = block.timestamp < setEndTime() ? block.timestamp : setEndTime();
    _;
  }

  //   modifier calculateEarn(address _account, uint _tokenId, uint _timestamp){
  //       daytime = 60 * 60 * 24;
  //   }

  // 대표NFT 스테이킹 하기
  function nftStake(uint _tokenId) external {
    // require(nfttoken.ownerOf(_tokenId) == msg.sender, "you are not token owner");

    // 스테이킹을 위해 본인의 nft를 이 컨트랙트에게 소유권 넘기기
    // nfttoken.safeTransferFrom(msg.sender, address(this), _tokenId);
    // 스테이킹한 토큰의 원래 주인임을 표기해놓기
    stakingAsset[_tokenId] = msg.sender;

    startTime[msg.sender] = block.timestamp;
    endTime[msg.sender] = setEndTime();

    // emit nftStakeEvent(_account, _tokenId, _timestamp);
  }

  // 대표NFT 스테이킹 끝내기
  function exit(uint _tokenId) external {
    // require(nfttoken.ownerOf(_tokenId) == msg.sender, "you are not token owner");

    // 컨트랙트에게서 nft 소유권 돌려받기
    // nfttoken.safeTransferFrom(address(this), msg.sender, _tokenId);
    // 해당 토큰 매핑에 들어있던 사용자address 초기화시켜주기
    stakingAsset[_tokenId] = address(0);

    delete startTime[msg.sender];
    delete endTime[msg.sender];

    // emit nftStakeEvent(_account, _tokenId, _timestamp);
  }

  function getStartTime() public view returns (uint) {
    return startTime[msg.sender];
  }

  function getEndTime() public view returns (uint) {
    return endTime[msg.sender];
  }

  // 스테이킹 풀기
  function withdraw(
    address _account,
    uint _tokenId,
    uint _timestamp
  ) external updateStake(_account, _timestamp) {
    // 컨트랙트에게서 nft 소유권 돌려받기
    // nfttoken.safeTransferFrom(address(this), msg.sender, _tokenId);
  }

  //   function tokenStake(
  //     address _account,
  //     uint _amount,
  //     uint _timestamp
  //   ) external {
  //     require(_account == msg.sender, "you are not token owner");
  //     require(_amount >= gametoken.balanceOf(_account));
  //     emit tokenStakeEvent(_account, _timestamp);
  //   }
}
