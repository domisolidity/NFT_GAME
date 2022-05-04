# Doremi Games - Ethereum Testnet 기반 P2E 게임 프로젝트


##### - Nft 홀더들이 게임에 참여하고, 게임 참여자들이 Token을 보상으로 얻을 수 있는 시스템 구현
![doremi_games](https://user-images.githubusercontent.com/90792916/166610784-0c71db7b-3c4d-45f6-b63c-94182cadd558.gif)

  
  

## Schedule / 개발일정
  
  
![image](https://user-images.githubusercontent.com/88923210/166204271-ca6a6adb-12a9-486c-8fcc-cdb3f5d05fbf.png)

  
  
## Built With / [김동욱](https://github.com/pier101) , [이상민](https://github.com/KimchiChamchi), [이민주](https://github.com/codecocos)
  
  
![image](https://user-images.githubusercontent.com/88923210/166203609-ac6e57be-85f4-4743-8c12-31337e7367c5.png)



## Architecture & Deployment / 앱 시스템 구조도 및 배포
  
  
  

* web3.js로 작성한 내용들을  json-rpc 통신을 통해 인퓨라 노드에 의해 채굴됨. 
* 그 결과 발생한 트랙잭션에 해당하는 내용들을 응답받아 클라이언트와 상호작용
* erc-721기반으로 만들어진 nft의 메타데이터 정보는 ipfs에 저장 axios요청으로 저장 데이터 수신
* ipfs저장 서비스는 피나타를 이용

![image](https://user-images.githubusercontent.com/88923210/166205086-60131970-6fb1-4856-b9af-265a19a68b7b.png)

  
  
  
## Contract / 컨트랙트 구성
  
**메인 컨트랙트 : ERC-20 , ERC-721**
**기능단위 컨트랙트 : Claim, Staking, Sale, Auction 기능**

* 오픈제플린에서 제공하는 표준 컨트랙트를 메인으로 두고 전역적으로 사용하는 메소드들만 메인컨트랙트에 작성

![image](https://user-images.githubusercontent.com/88923210/166207162-cd09293b-d63e-41f4-8431-28f70220d6f4.png)
  
  
## DB Schema / ERD
  
  
  
![image](https://user-images.githubusercontent.com/88923210/166346038-68e7ffb0-5d25-498c-a2df-10ea47fde472.png)

* 회원정보는 컨트랙트에서 관리하기엔 블록체인의 지연시간과 가스비용 영향이 크기 때문에 db를 통해 관리
* 회원정보는 별도의 가입 절차 없이 메타마스크의 address를 하나의 id로 가입 되도록 함.
* 로그아웃을 하지 않으면 재접속시 jwt토큰을 통해 로그인 상태가 유지 됨.
* 스테이킹된 nft에 따라 부여받은 게임 참여횟수와 아이템, 미션, 랭킹 등을 관리할 수 있도록 관계설정

## Details
* 민팅
  
![image](https://user-images.githubusercontent.com/88923210/166195022-3144f240-5e99-4c65-a6f0-b128b8bea565.png)
![image](https://user-images.githubusercontent.com/88923210/166346784-dd3dcfd4-b0f5-4408-9d49-9de942b28bcc.png)

* 스테이킹
  
![image](https://user-images.githubusercontent.com/88923210/166390083-22da9c5a-a03f-4b6e-997b-3bcfd788d826.png)
![image](https://user-images.githubusercontent.com/88923210/166347827-4b552789-3810-4b92-bc75-0f2209538d82.png)
![image](https://user-images.githubusercontent.com/88923210/166350425-04e5d0d3-31e9-4e93-a20e-11b1c1912f5a.png)

* 게임과 미션, 아이템 적용
  
![image](https://user-images.githubusercontent.com/88923210/166374479-c9fc2ce7-396f-4d65-a89d-b7b66e58b263.png)

* 토큰으로 아이템 상점 이용
  
![image](https://user-images.githubusercontent.com/88923210/166380355-2bbb0c7e-1167-4e51-ada2-2710e69de59b.png)

* 클레임
  
![image](https://user-images.githubusercontent.com/88923210/166390942-6f10730f-dc73-4d50-b9d3-64c99245ef85.png)

* NFT 판매 및 구매
  
![image](https://user-images.githubusercontent.com/88923210/166390195-91d1e55a-9a3a-465f-8e96-db594cf91711.png)
![image](https://user-images.githubusercontent.com/88923210/166390352-c1267286-6e72-49b2-bc53-d1d68b54bd83.png)
![image](https://user-images.githubusercontent.com/88923210/166390452-81ac350f-16ea-41fc-9574-b7139cec1588.png)

* NFT 경매 
  
![image](https://user-images.githubusercontent.com/88923210/166390539-57add4af-e0a4-4117-8789-661e19b877d3.png)
![image](https://user-images.githubusercontent.com/88923210/166390727-db0bc1de-f1c6-4d85-9918-b4414f2ceee6.png)







