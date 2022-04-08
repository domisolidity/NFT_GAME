// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "./GameToken.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Claim_20 is Ownable{
  using Counters for Counters.Counter;
  using SafeMath for uint;

  ERC20 public token;
  address public admin;

  constructor(address _gameTokenAddress) {
    admin = msg.sender;
    token = ERC20(_gameTokenAddress);
  }

  struct weeklyRank {
    address account;
    uint8 ranking;
    string gameTitle;
    uint16 score;
  }

  mapping(address => weeklyRank) public rankRewardList;

  uint private constant victory = 1;
  uint private constant top1 = 100;
  uint private constant top2 = 50;
  uint private constant top3 = 30;
  uint private constant top4To10 = 10;

  mapping(address => uint) rewardToUser;

  /* Mission Reward Function */

  modifier existReward(address _account) {
    require(_account == msg.sender, "you are not owner.");
    require(getRewardAmount(_account) > 0, "not exist reward");
    _;
  }

  // function test() external view returns(address){
  //   return token._msgSender();
  // }

  // 승리 보상 클레임
  function victoryClaim(address _account) external payable existReward(_account) {
    //계정의 리워드 초기화
    rewardToUser[_account].sub(getRewardAmount(_account));
    // 리워드 받기 //임의로 _transfer안되서 transferFrom 넣어놓은 상태
    token.transferFrom(admin, _account, rewardToUser[_account]);
  }

  // DB에서 받은 리워드양 set
  function setRewardAmount(address _account, uint _amount) public {
    require(_account == msg.sender, "you are not account owner");
    require(_amount > 0, "not exist reward");
    rewardToUser[_account] = _amount;
  }

  function getRewardAmount(address _account) public view returns (uint) {
    return rewardToUser[_account];
  }

  /* Ranking Reward Function */

  // 게임 랭커 클레임 허용
  function approveClaim(weeklyRank[] memory result) external onlyOwner{
    // 제약 조건 추가하기
    for (uint i = 0; i < result.length; i++) {
      if (result[i].ranking == 1) {
        token.increaseAllowance(result[i].account, top1);
      } else if (result[i].ranking == 2) {
        token.increaseAllowance(result[i].account, top2);
      } else if (result[i].ranking == 3) {
        token.increaseAllowance(result[i].account, top3);
      } else {
        token.increaseAllowance(result[i].account, top4To10);
      }
    }
  }

  // 랭킹 보상 클레임
  function rankClaim(address _account) external {
    uint rewardAmount = token.allowance(admin, _account);
    token.transferFrom(admin, _account, rewardAmount);
  }

}
//["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",1,"보물찾기",21]
