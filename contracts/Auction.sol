//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NftContract.sol";

contract Auction {
  using Strings for uint256;

  event NftHistory(uint indexed tokenId, address from, address to, uint time, string historyType);

  NftContract public nftContractAddres;
  address payable public owner;
  uint public startBlock; // 배포당시 블록으로 설정 (block.number)
  uint public endBlock; // 시간값 입력받아 초단위 변환후  15(15sec)로 나눠 블록개수로 변환.
  uint public startBid; // 입찰 시작가

  enum State {
    Started,
    Running,
    Ended,
    Canceled
  }
  State public auctionState;

  uint public highestBindingBid; //최고 입찰 허용가
  address payable public highestBidder; // 최종 입찰자
  mapping(address => uint) public bids;
  uint bidIncrement; // 입찰가 증액량
  uint id;

  //소유자는 경매 참여시 한 번만 가장 높은 BindingBid를 얻을 수 있게
  bool public ownerFinalized = false;
  mapping(uint256 => bool) public onAuctioning;

  event PlaceBidEvent(
    uint indexed id,
    address account,
    uint currentBid,
    uint highestBindingBid,
    address highestBidder,
    uint timestamp
  );
  event Step(State step);

  constructor(
    address _eoa,
    address _nftContractAddres,
    uint _startBid,
    uint _remainedBlock,
    uint _tokenId
  ) {
    nftContractAddres = NftContract(_nftContractAddres);
    address nftTokenOwner = nftContractAddres.ownerOf(_tokenId);
    require(_eoa == nftTokenOwner, "you are not token owner!");

    owner = payable(_eoa);
    auctionState = State.Running;
    id = _tokenId;
    startBid = _startBid;
    startBlock = block.number;
    endBlock = startBlock + _remainedBlock;

    bidIncrement = 1 * 10**17; // 1*10**17 = 0.1 eth

    onAuctioning[_tokenId] = true;
  }

  modifier notOwner() {
    require(msg.sender != owner, "notOwner Error");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "onlyOwner Error");
    _;
  }

  modifier afterStart() {
    require(block.number >= startBlock, "afterStart Error");
    _;
  }

  modifier beforeEnd() {
    require(block.number <= endBlock, "beforeEnd Error");
    _;
  }

  function min(uint a, uint b) internal pure returns (uint) {
    if (a <= b) {
      return a;
    } else {
      return b;
    }
  }

  // 경매 자동 종료되기 전 소유자만 경매를 취소
  function cancelAuction(uint _tokenId) public beforeEnd onlyOwner {
    auctionState = State.Canceled;
    onAuctioning[_tokenId] = false;
  }

  // 경매 메인 함수
  // 시작가보다 낮게 입찰할 수 없게 >> 일케하니 넣은 금액에서 추가할 떄 시작가보다 높아야되서 소량추가가 안됨
  // 보완하기
  function placeBid(uint _timeStamp) public payable notOwner afterStart beforeEnd {
    require(auctionState == State.Running);
    // 보낼 수 있는 최소값
    // require(msg.value > 0.0001 ether);

    uint currentBid = bids[msg.sender] + msg.value;
    require(currentBid > startBid, "not higher than the startBid");

    // currentBid는 highBindingBid보다 더 커야됨
    require(currentBid > highestBindingBid);

    // 매핑 변수 업데이트
    bids[msg.sender] = currentBid;

    if (currentBid <= bids[highestBidder]) {
      // 최고 입찰자 변경 안 되는  경우.
      highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
    } else {
      // 최고입찰자 변경될 경우
      if (bids[highestBidder] == 0) {
        highestBindingBid = min(currentBid, startBid + bidIncrement);
      } else {
        highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
      }
      highestBidder = payable(msg.sender);
    }

    emit PlaceBidEvent(id, msg.sender, currentBid, highestBindingBid, highestBidder, _timeStamp);
  }

  // 경매 종료 후 정산 함수
  function finalizeAuction(uint _tokenId, uint _timestamp) public {
    require(auctionState == State.Canceled || block.number > endBlock);
    require(msg.sender == owner || bids[msg.sender] > 0);

    address payable recipient;
    uint value;

    if (auctionState == State.Canceled) {
      //경매 취소, 종료되지 않음
      recipient = payable(msg.sender);
      value = bids[msg.sender];
    } else {
      // 경매 종료, 취소되지 않음
      if (msg.sender == owner && ownerFinalized == false) {
        //소유자가 경매 정산.
        recipient = owner;
        value = highestBindingBid;
        ownerFinalized = true;
      } else {
        // 최종 입찰자가 경매 정산.
        if (msg.sender == highestBidder) {
          recipient = highestBidder;
          value = bids[highestBidder] - highestBindingBid;
          nftContractAddres.safeTransferFrom(owner, highestBidder, id);
        } else {
          // 일반 입찰자 경매 정산.
          recipient = payable(msg.sender);
          value = bids[msg.sender];
        }
      }
    }
    bids[recipient] = 0;
    recipient.transfer(value);
    onAuctioning[_tokenId] = false;

    // nft history 이벤트 트리거
    nftContractAddres.nftEventTrigger(_tokenId, owner, recipient, _timestamp, "Acution");
  }

  function isAuctionCheck(uint _tokenId) public view returns (bool) {
    return onAuctioning[_tokenId];
  }

  function getInitInfo()
    external
    view
    returns (
      State,
      uint,
      uint,
      uint,
      uint,
      uint
    )
  {
    return (auctionState, startBid, bidIncrement, startBlock, block.number, endBlock);
  }

  function getStartBid() external view returns (uint) {
    return startBid;
  }

  function getBidAmount() external view returns (uint) {
    return bids[msg.sender];
  }

  function isHighestBidder() external view returns (bool) {
    if (bids[msg.sender] < startBid) {
      return false;
    } else {
      return true;
    }
  }
}

/*
    경매 취소 로직
    취소하면 setOnAuction(false) 어디서 바꿔야할지
    auctionCreatorContract 에서 array 삭제
 */
