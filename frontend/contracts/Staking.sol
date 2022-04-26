// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./NftContract.sol";
import "./GameToken.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Staking is ERC721Holder {
  event RewardEvent(address indexed account, uint tokenId, uint startTime, uint endTime, uint reward);

  GameToken public gametoken;
  NftContract public nfttoken;

  constructor(GameToken _gametoken, NftContract _nfttoken) {
    gametoken = _gametoken;
    nfttoken = _nfttoken;
  }

  struct StakingData {
    address ownerAddress;
    uint tokenId;
    uint startTime;
    uint endTime;
    uint reward;
  }

  //wook
  struct tokenStaking {
    uint amount;
    uint startTime;
    uint endTime;
  }

  // 스테이킹 정보 담을 매핑
  mapping(address => StakingData) public stakingData;

  /* 스테이킹 끝나는 날 반환기 */
  function setEndTime() public view returns (uint) {
    uint ReferenceTimestamp = 1649462400; // 기준날짜 2022.04.07. 09:00
    // 기준날짜에서 현재시간의 차이를 1주일로 나눈 몫
    uint temp = (block.timestamp - ReferenceTimestamp) / 1 weeks;
    // 기준날짜에서 차이나는 주만큼 더해서 스테이킹 끝날 날짜를 반환
    return ReferenceTimestamp + temp * 1 weeks + 1 weeks;
  }

  /* 대표NFT 스테이킹 하기 */
  function nftStake(uint _tokenId) external {
    // 스테이킹 할 nft의 주인이 본인인지 확인하기
    require(nfttoken.ownerOf(_tokenId) == msg.sender, "you are not token owner");

    // 스테이킹을 위해 본인의 nft를 컨트랙트에게 소유권 넘기기
    nfttoken.safeTransferFrom(msg.sender, address(this), _tokenId);

    uint startTime = block.timestamp; // 스테이킹 시작 시간
    uint endTime = setEndTime(); // 스테이킹 마감시간 계산
    // 리워드 계산 (스테이킹 시작시간부터 종료되는 시간까지 1일당 리워드 1개)
    uint reward = calcReward(_tokenId, startTime, endTime);
    // 스테이킹한 토큰의 원래 주인 표기해놓기 (주인address, 토큰id, 스테이킹 시간, 스테이킹 마감시간, 받게 될 보상)
    stakingData[msg.sender] = StakingData(msg.sender, _tokenId, startTime, endTime, reward);
  }

  /* 대표NFT 스테이킹 끝내기 */
  function exit(uint _tokenId) external {
    // 토큰 스테이킹 한 주인인지 확인
    require(stakingData[msg.sender].ownerAddress == msg.sender, "you are not token owner");
    // 스테이킹 끝날 시간 이후인지 확인
    // require(stakingData[msg.sender].endTime < block.timestamp, "it's not time yet");

    // 컨트랙트에게서 nft 소유권 돌려받기
    nfttoken.safeTransferFrom(address(this), msg.sender, _tokenId);

    // 이벤트 기록
    emit RewardEvent(
      stakingData[msg.sender].ownerAddress,
      stakingData[msg.sender].tokenId,
      stakingData[msg.sender].startTime,
      stakingData[msg.sender].endTime,
      stakingData[msg.sender].reward
    );
    // 리워드 지급
    gametoken.transfer(msg.sender, stakingData[msg.sender].reward);

    // 매핑들 초기화시켜주기
    delete stakingData[msg.sender];
  }

  /* 스테이킹 된 토큰의 보상 계산 */
  function calcReward(
    uint _tokenId,
    uint _startTime,
    uint _endTime
  ) public pure returns (uint) {
    require(_tokenId > 0 && _tokenId <= 100, "token id 1~100");
    uint classReward; // NFT 등급에 따라 reward 차등
    if (_tokenId >= 1 && _tokenId <= 60) {
      classReward = 1;
    } else if (_tokenId >= 61 && _tokenId <= 90) {
      classReward = 2;
    } else if (_tokenId >= 91 && _tokenId <= 100) {
      classReward = 3;
    }
    // 스테이킹 시작시간부터 종료되는 시간까지 1일당 리워드로 DGT 1개,
    // NFT 등급(red, green, purple)에 따라 1, 2, 3배
    uint reward = ((_endTime - _startTime) / 1 days) * classReward;
    return reward;
  }

  /* 스테이킹 정보 조회 */
  function getStakingData() public view returns (StakingData memory) {
    return stakingData[msg.sender];
  }
}
