// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "./GameToken.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GameToken.sol";

contract Claim_20 is Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint;

  event ClaimEvent(string rewardType, address indexed account, uint amount, uint time);

  GameToken public gametoken;
  address public admin;

  constructor(GameToken _token) {
    admin = msg.sender;
    gametoken = _token;
  }

  struct WeeklyRank {
    address account;
    uint8 ranking;
    bool isApproved;
    bool isRewarded;
    string gameTitle;
  }
  struct DailyAchiever {
    address account;
    uint8 count;
  }

  mapping(address => WeeklyRank[]) public getRankReward;
  mapping(address => uint8) public missionRewardList;

  uint private constant top1 = 100;
  uint private constant top2 = 50;
  uint private constant top3 = 30;
  uint private constant top4To10 = 10;

  modifier onlyRewarder(address _account) {
    require(_account == msg.sender, "you are not owner.");
    require(gametoken.allowance(admin, _account) > 0, "not exist reward");
    _;
  }
  modifier onlyRangker(address _account) {
    require(_account == msg.sender, "you are not owner.");
    require(gametoken.allowance(admin, _account) > 0, "not exist reward");
    _;
  }

  /* 
    Mission Reward Function 
  */

  // 미션 보상 클레임 허용
  function approveClaim_mission(DailyAchiever[] memory result) external onlyOwner {
    for (uint256 i = 0; i < result.length; i++) {
      require(result[i].count > 0, "not exist reward");
      gametoken.increaseAllowance(result[i].account, result[i].count * 10);
    }
  }

  // 미션 보상 클레임
  function claim_mission(address _account) external {
    uint _reward = gametoken.allowance(address(this), _account);
    gametoken.transferFrom(address(this), _account, _reward);

    emit ClaimEvent("Mission", _account, _reward, block.timestamp);
  }

  /* 
    Ranking Reward Function 
  */

  function approveClaim_rank(WeeklyRank[] memory result) external onlyOwner {
    for (uint i = 0; i < result.length; i++) {
      require(result[i].isApproved == false, "has already been approved");

      if (result[i].ranking == 1) {
        gametoken.increaseAllowance(result[i].account, top1);
      } else if (result[i].ranking == 2) {
        gametoken.increaseAllowance(result[i].account, top2);
      } else if (result[i].ranking == 3) {
        gametoken.increaseAllowance(result[i].account, top3);
      }
      result[i].isApproved = true;
    }
  }

  // @ 랭킹 클레임 리팩토링
  function claim_rank(WeeklyRank[] memory result, uint currentTime) external {
    require(gametoken.allowance(address(this), msg.sender) > 0, "no reward");

    for (uint i = 0; i < result.length; i++) {
      require(result[i].isApproved == true, "not approved");
      require(result[i].isRewarded == false, "has already been rewarded");

      uint _reward;
      if (result[i].ranking == 1) {
        _reward = top1;
        gametoken.transferFrom(address(this), result[i].account, _reward);
      } else if (result[i].ranking == 2) {
        _reward = top2;
        gametoken.transferFrom(address(this), result[i].account, _reward);
      } else if (result[i].ranking == 3) {
        _reward = top3;
        gametoken.transferFrom(address(this), result[i].account, _reward);
      }
      result[i].isRewarded = true;
      emit ClaimEvent("Ranking", result[i].account, _reward, currentTime);
    }
  }
}

//["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",3]
//["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",1,"보물찾기",21]
//[["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",3,false,false,"보물찾기"],["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",1,false,false,"보물찾기"]]
