//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "./NftContract.sol";
 
contract Auction{
     using Strings for uint256;

    NftContract public nftContractAddres;
    address payable public owner;
    uint public startBlock; // 배포당시 블록으로 설정 (block.number)
    uint public endBlock; // 시간값 입력받아 초단위 변환후  15(15sec)로 나눠 블록개수로 입력한다.
    uint public startBid; // 입찰 시작가

    



    enum State {Started, Running, Ended, Canceled}
    State public auctionState;
    
    uint public highestBindingBid; //최고 입찰 허용가
    address payable public highestBidder; // 최종 입찰자
    mapping(address => uint) public bids; 
    uint bidIncrement; // 입찰가 증액량
    //소유자는 경매를 완료하고 한 번만 가장 높은 BindingBid를 얻을 수 있습니다.
    bool public ownerFinalized = false;

    mapping(uint256 => bool) public onAuctioning;
 
    
    constructor(address payable eoa, address _nftContractAddres, uint _startBid, uint _remainedBlock,uint _tokenId){
        nftContractAddres = NftContract(_nftContractAddres);
        address nftTokenOwner = nftContractAddres.ownerOf(_tokenId);
        require(eoa == nftTokenOwner,"you are not token owner!");

        owner = eoa;
        auctionState = State.Running;
        
        startBid = _startBid; 
        startBlock = block.number;
        endBlock = startBlock + _remainedBlock;

        bidIncrement = 1*10**17; // 1*10**17 = 0.1 eth

        onAuctioning[_tokenId] = true;
    }
    
    // declaring function modifiers
    modifier notOwner(){
        require(msg.sender != owner);
        _;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    modifier afterStart(){
        require(block.number >= startBlock);
        _;
    }
    
    modifier beforeEnd(){
        require(block.number <= endBlock);
        _;
    }
    
    
    //a helper pure function (it neither reads, nor it writes to the blockchain)
    function min(uint a, uint b) pure internal returns(uint){
        if (a <= b){
            return a;
        }else{
            return b;
        }
    }
    
    // 경매가 종료되기 전에 소유자만 경매를 취소할 수 있습니다.
    function cancelAuction(uint _tokenId) public beforeEnd onlyOwner{
        auctionState = State.Canceled;
        onAuctioning[_tokenId] = false;
    }
    
    
    // 입찰을 하기 위해 호출되는 주요 기능
    function placeBid() public payable notOwner afterStart beforeEnd returns(bool){
        // 입찰을 하려면 경매가 실행되어야 합니다.
        require(auctionState == State.Running);
        // 보낼 수 있는 최소값
        // require(msg.value > 0.0001 ether);
        
        uint currentBid = bids[msg.sender] + msg.value;
        
        // currentBid는 highBindingBid보다 커야 합니다
        // 그렇지 않으면 할 일이 없습니다.
        require(currentBid > highestBindingBid);
        
        // 매핑 변수 업데이트
        bids[msg.sender] = currentBid;
        
        if (currentBid <= bids[highestBidder]){ // 최고 입찰자는 변경되지 않습니다.
            highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
        }else{ // 최고입찰자가 변경될 경우
             highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
             highestBidder = payable(msg.sender);
        }
    return true;
    }
    
    
    
    function finalizeAuction(uint _tokenId) public{
       // 경매가 취소되었거나 종료되었습니다.
       require(auctionState == State.Canceled || block.number > endBlock); 
       
       // 소유자 또는 입찰자만 경매를 완료할 수 있습니다
       require(msg.sender == owner || bids[msg.sender] > 0);
       
       // 받는 사람은 값을 얻을 것입니다
       address payable recipient;
       uint value;
       
       if(auctionState == State.Canceled){ //경매 취소, 종료되지 않음
           recipient = payable(msg.sender);
           value = bids[msg.sender];
       }else{// 경매 종료, 취소되지 않음
           if(msg.sender == owner && ownerFinalized == false){ //소유자가 경매를 종료
               recipient = owner;
               value = highestBindingBid;
               
               //소유자는 경매를 완료하고 한 번만 가장 높은 BindingBid를 얻을 수 있습니다.
               ownerFinalized = true; 
           }else{// 다른 사용자(소유자가 아님)가 경매를 완료합니다.
               if (msg.sender == highestBidder){
                   recipient = highestBidder;
                   value = bids[highestBidder] - highestBindingBid;
               }else{ //이것은 소유자도 아니고 최고 입찰자도 아닙니다(일반 입찰자입니다)
                   recipient = payable(msg.sender);
                   value = bids[msg.sender];
               }
           }
       }
       
       // 동일한 수신자에게 여러 번 전송되는 것을 방지하기 위해 수신자의 입찰가 재설정
       bids[recipient] = 0;
       
       //받는 사람에게 값을 보냅니다
       recipient.transfer(value);
       onAuctioning[_tokenId] = false;
    } 

    function isAuctionCheck(uint _tokenId) public view returns(bool) {
        return onAuctioning[_tokenId];
    }

}