// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";

contract Claim_20 is Ownable {
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
    string gameTitle;
    bool isApproved;
    bool isRewarded;
  }
  struct DailyAchiever {
    address account;
    uint8 count;
    bool isApproved;
    bool isRewarded;
  }

  uint private constant top1 = 50;
  uint private constant top2 = 30;
  uint private constant top3 = 10;

  mapping(address => DailyAchiever[]) missionRewardList;

  /* 
    Mission Reward Function 
  */

  function approveClaim_mission(DailyAchiever[] memory result) external onlyOwner {
    for (uint256 i = 0; i < result.length; i++) {
      require(result[i].isApproved == false, "has already been approved");
      require(result[i].count > 0, "not exist reward");
      gametoken.increaseAllowance(result[i].account, result[i].count);

      result[i].isApproved = true;
    }
  }

  function claim_mission(
    address _account,
    uint _amount,
    uint _currentTime
  ) external {
    gametoken.transferFrom(address(this), _account, _amount);

    emit ClaimEvent("Mission", _account, _amount, _currentTime);
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
      require(result[i].account == msg.sender, "you are not recipient");

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
