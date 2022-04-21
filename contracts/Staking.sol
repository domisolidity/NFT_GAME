// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./NftContract.sol";
import "./GameToken.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Staking is ERC721Holder {
  event nftStakeEvent(address indexed account, uint indexed tokenId, uint time);
  event tokenStakeEvent(address indexed account, uint time);

  GameToken public gametoken;
  NftContract public nfttoken;

  // mapping(uint => address) stakingAddress;
  // mapping(address => uint) stakingTokenId;
  // mapping(address => uint) startTime;
  // mapping(address => uint) endTime;

  constructor(GameToken _gametoken, NftContract _nfttoken) {
    gametoken = _gametoken;
    nfttoken = _nfttoken;
  }

  struct StakingData {
    address ownerAddress;
    uint tokenId;
    uint startTime;
    uint endTime;
  }
  mapping(address => StakingData) public stakingData;

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
    uint ReferenceTimestamp = 1649462400; // 기준날짜 2022.04.07. 09:00
    // 기준날짜에서 현재시간의 차이를 1주일로 나눈 몫
    uint temp = (block.timestamp - ReferenceTimestamp) / 1 weeks;
    // 기준날짜에서 차이나는 주만큼 더해서 스테이킹 끝날 날짜를 반환
    return ReferenceTimestamp + temp * 1 weeks + 1 weeks;
  }

  // 대표NFT 스테이킹 하기
  function nftStake(uint _tokenId) external {
    // 스테이킹 할 nft의 주인이 본인인지 확인하기
    require(nfttoken.ownerOf(_tokenId) == msg.sender, "you are not token owner");

    // nfttoken.setApprovalForAll(address(this), true);
    // 스테이킹을 위해 본인의 nft를 컨트랙트에게 소유권 넘기기
    nfttoken.safeTransferFrom(msg.sender, address(this), _tokenId);

    // 스테이킹한 토큰의 원래 주인 표기해놓기
    stakingData[msg.sender] = StakingData(msg.sender, _tokenId, block.timestamp, setEndTime());
    // stakingAddress[_tokenId] = msg.sender;
    // stakingTokenId[msg.sender] = _tokenId;
    // // 스테이킹 시작시간, 끝나는 시간 저장
    // startTime[msg.sender] = block.timestamp;
    // endTime[msg.sender] = setEndTime();

    // 스테이킹 이벤트 기록
    emit nftStakeEvent(msg.sender, _tokenId, block.timestamp);
  }

  // 대표NFT 스테이킹 끝내기
  function exit(uint _tokenId) external {
    // 토큰 스테이킹 한 주인인지 확인
    require(stakingData[msg.sender].ownerAddress == msg.sender, "you are not token owner");
    // 스테이킹 끝날 시간 이후인지 확인
    // require(stakingData[msg.sender].endTime < block.timestamp, "Time");

    // 컨트랙트에게서 nft 소유권 돌려받기
    nfttoken.safeTransferFrom(address(this), msg.sender, _tokenId);

    // 리워드 계산 (스테이킹 시작시간부터 종료되는 시간까지 1일당 리워드 1개)
    uint reward = calcReward(_tokenId);
    gametoken.transfer(msg.sender, reward);

    // 매핑들 초기화시켜주기
    delete stakingData[msg.sender];
    // delete stakingAddress[_tokenId];
    // delete stakingTokenId[msg.sender];
    // delete startTime[msg.sender];
    // delete endTime[msg.sender];

    emit nftStakeEvent(msg.sender, _tokenId, block.timestamp);
  }

  // 스테이킹 된 토큰의 보상 계산
  function calcReward(uint _tokenId) public view returns (uint) {
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
    // uint reward = ((endTime[msg.sender] - startTime[msg.sender]) / 1 days) * classReward;
    uint reward = ((stakingData[msg.sender].endTime - stakingData[msg.sender].startTime) / 1 days) * classReward;
    return reward;
  }

  function getStakingData() public view returns (StakingData memory) {
    return stakingData[msg.sender];
  }

  // function getstakingAddress(uint _tokenId) public view returns (address) {
  //   return stakingAddress[_tokenId];
  // }

  // // 스테이킹 풀기
  // function withdraw(
  //   address _account,
  //   uint _tokenId,
  //   uint _timestamp
  // ) external updateStake(_account, _timestamp) {
  //   // 컨트랙트에게서 nft 소유권 돌려받기
  //   // nfttoken.safeTransferFrom(address(this), msg.sender, _tokenId);
  // }

  //   function tokenStake(
  //     address _account,
  //     uint _amount,
  //     uint _timestamp
  //   ) external {
  //     require(_account == msg.sender, "you are not token owner");
  //     require(_amount >= gametoken.balanceOf(_account));
  //     emit tokenStakeEvent(_account, _timestamp);
  //   }
  // 스테이크 시간
  // modifier updateStake(address _account, uint _tokenId) {
  //   // 스테이킹 하는 본인 address의 tokenId 매핑에 시간값이 담김
  //   updateTimeByNft[_account][_tokenId] = block.timestamp < setEndTime() ? block.timestamp : setEndTime();
  //   _;
  // }

  //   modifier calculateEarn(address _account, uint _tokenId, uint _timestamp){
  //       daytime = 60 * 60 * 24;
  //   }
}
