//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "./NftContract.sol";
 
contract Auction{
     using Strings for uint256;

    NftContract public nftContractAddres;
    address payable public owner;
    uint public startBlock; // 배포당시 블록으로 설정 (block.number)
    uint public endBlock; // 시간값 입력받아 초단위 변환후  15(15sec)로 나눠 블록개수로 변환.
    uint public startBid; // 입찰 시작가

    



    enum State {Started, Running, Ended, Canceled}
    State public auctionState;
    
    uint public highestBindingBid; //최고 입찰 허용가
    address payable public highestBidder; // 최종 입찰자
    mapping(address => uint) public bids; 
    uint bidIncrement; // 입찰가 증액량

    //소유자는 경매 참여시 한 번만 가장 높은 BindingBid를 얻을 수 있게
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
    
    function min(uint a, uint b) pure internal returns(uint){
        if (a <= b){
            return a;
        }else{
            return b;
        }
    }
    
    // 경매 자동 종료되기 전 소유자만 경매를 취소
    function cancelAuction(uint _tokenId) public beforeEnd onlyOwner{
        auctionState = State.Canceled;
        onAuctioning[_tokenId] = false;
    }
    
    
    // 경매 메인 함수
    function placeBid() public payable notOwner afterStart beforeEnd returns(bool){
        require(auctionState == State.Running);
        // 보낼 수 있는 최소값
        // require(msg.value > 0.0001 ether);
        
        uint currentBid = bids[msg.sender] + msg.value;
        
        // currentBid는 highBindingBid보다 더 커야됨
        require(currentBid > highestBindingBid);
        
        // 매핑 변수 업데이트
        bids[msg.sender] = currentBid;
        
        if (currentBid <= bids[highestBidder]){ // 최고 입찰자 변경 안 되는  경우.
            highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
        }else{ // 최고입찰자 변경될 경우
             highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
             highestBidder = payable(msg.sender);
        }
    return true;
    }
    
    
    
    function finalizeAuction(uint _tokenId) public{
       // 경매 취소 또는 종료 상태
       require(auctionState == State.Canceled || block.number > endBlock); 
       
       // 소유자 또는 입찰자만 경매를 완료 가능
       require(msg.sender == owner || bids[msg.sender] > 0);
       

       address payable recipient;
       uint value;
       
       if(auctionState == State.Canceled){ //경매 취소, 종료되지 않음
           recipient = payable(msg.sender);
           value = bids[msg.sender];
       }else{// 경매 종료, 취소되지 않음
           if(msg.sender == owner && ownerFinalized == false){ //소유자가 경매 정산.
               recipient = owner;
               value = highestBindingBid;
               ownerFinalized = true; 
           }else{// 최종 입찰자가 경매 정산.
               if (msg.sender == highestBidder){
                   recipient = highestBidder;
                   value = bids[highestBidder] - highestBindingBid;
               }else{ // 일반 입찰자 경매 정산.
                   recipient = payable(msg.sender);
                   value = bids[msg.sender];
               }
           }
       }
       
       // 동일한 수신자에게 여러 번 전송되는 것을 방지하기 위해 수신자의 입찰가 재설정
       bids[recipient] = 0;
       
       // 경매 참여 케이스별 정산 실행
       recipient.transfer(value);
       onAuctioning[_tokenId] = false;
    } 

    function isAuctionCheck(uint _tokenId) public view returns(bool) {
        return onAuctioning[_tokenId];
    }

}