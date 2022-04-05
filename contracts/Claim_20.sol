// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./GameToken.sol";

contract Claim_20  {
     using SafeMath for uint256;

    GameToken public gameTokenAddress;

    constructor(address _gameTokenAddress){
        gameTokenAddress = GameToken(_gameTokenAddress);
    } 
    
    struct weeklyRank {
        address _account;
        uint8 ranking;
        string gameTitle;
        uint16 score;
    }

    uint private constant victory = 1;
    uint private constant top1 = 100;
    uint private constant top2 = 50;
    uint private constant top3 = 30;
    uint private constant top4To10 = 10;

    mapping(address=>uint) rewardToUser;

    // 계정이 클레임할 토큰이 존재하는지
    modifier isReward(address _account) {
        require(_account == msg.sender,"you are not owner.");
        require(getRewardAmount(_account) > 0,"not exist reward");
        _;
    }

    // 승리 보상 클레임
    function victoryClaim(address _account) external payable isReward(_account){
        //계정의 리워드 초기화
        rewardToUser[_account].sub(getRewardAmount(_account));
        // 리워드 받기 //임의로 _transfer안되서 transferFrom 넣어놓은 상태 
        gameTokenAddress.transferFrom(gameTokenAddress.owner(), _account, rewardToUser[_account]);   
    }
    
    // db에서 받은 리워드양 set
    function setRewardAmount(address _account, uint _amount) public {
        require(_account == msg.sender ,"you are not account owner");
        require(_amount > 0 , "not exist reward");
        rewardToUser[_account] = _amount;
    }
    // 리워드
    function getRewardAmount(address _account) public view returns(uint) {
        return rewardToUser[_account];
    }

    function test(weeklyRank[] memory result) public pure returns(weeklyRank[] memory) {
        return result;
    }
    function test1() public view returns(address) {
        return msg.sender;
    }

    // 게임 랭커 클레임 허용
    function approveClaim(weeklyRank[] memory result) external{
        // 제약 조건 추가하기
        for(uint i = 0; i < result.length; i++){
            if(result[i].ranking == 1){
                gameTokenAddress.increaseAllowance(result[i]._account,top1);
            } else if (result[i].ranking == 2){
                gameTokenAddress.increaseAllowance(result[i]._account,top2);
            } else if (result[i].ranking == 3){
                gameTokenAddress.increaseAllowance(result[i]._account,top3);
            } else {
                gameTokenAddress.increaseAllowance(result[i]._account,top4To10);
            }
        }
    }

    // 랭킹 보상 클레임
    function rankClaim(address _account) external {
        require(_account == msg.sender, "you are not ranker");

        uint rewardAmount = gameTokenAddress.allowance(gameTokenAddress.owner(),_account);
        gameTokenAddress.transferFrom(gameTokenAddress.owner(),_account,rewardAmount);
    }
}

// [["0x3bfa24aa222b623f91dde9b02cb97452c84daa98",1,"tetris"],
// ["0xf3a183692d886b2e3f4578e8f27a2ba79051bdaa",2,"tetris"],
// ["0xdc9412c646837792c4d75edf99eade051452d8c6",3,"tetris"],
// ["0xdab40e9c5c55ae3dc74aa7946cb823b72531b457",4,"tetris"]]

    // // 아이템 구매
    // function buyItem() external {

    // }
    
    /*
        게임 승리시 토큰 보상 (1개)
        토큰으로 아이템 구매
        랭킹 보상

    */
