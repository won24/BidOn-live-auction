# 실시간 경매 BID ON
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/logo.png?raw=true"/>  
<br>

<summary>목차</summary>

1. [프로젝트 소개](#intro)
2. [요구사항](#reqirements)
3. [팀원 소개](#members)
4. [페이지별 기능](#page)
5. [개발 환경](#env)
6. [프로젝트 구조](#tree)


## 1. <span id="intro">프로젝트 소개</span>

✔ 비드온은 온라인 실시간 경매 사이트 입니다.

✔ 모든 사용자는 실시간 경매 참관, 경매품 리스트를 볼 수 있습니다.

✔ 경매 참여는 회원만 가능하며, 홈페이지 전용 캐쉬를 충전하여 경매에 참여합니다.

✔경매에 참여하지 않더라도 회원이라면 실시간 경매 중 채팅을 통해 경매 참여자, 시청자들과 소통 할 수 있습니다.

✔ 회원은 직접 경매품을 신청 할 수 있습니다.

<br>

## 2. <span id="reqirements">요구사항</span>

📁 인증: 로그인, 회원가입, 유효성 평가

📁 결제: 토스페이를 이용해 캐쉬 충전

📁 라이브 경매: 실시간 입찰, 실시간 채팅, 경매품 상세보기

📁 경매품: 경매품 검색, 경매 상태 선택 보기, 상세 정보 안내, 즐겨찾기

📁 경매품 신청: 게시글 등록, 다중 이미지 파일 업로드/미리보기

📁 고객센터: 자주 하는 질문,  1:1 문의, 공지사항

📁 마이페이지: 즐겨찾기 모아보기, 내가 신청한 경매품, 내가 낙찰한 경매품, 내 정보

📁 관리자페이지: 1:1 문의 답변, 게시글 관리, 회원 관리

<br>
  
## 3. <span id="members">팀원</span>
| **장근우** | **손정원** | **진원** | **김수아** |
| :-------: | :-------: | :-------: | :-------: |
| 로그인 <br>회원가입 <br>이이디/비밀번호 찾기 <br>실시간 채팅 | 결제 <br> 경매품 신청 <br>고객센터 <br>관리자페이지 <br>실시간 입찰 | 메인페이지 <br> 라이브 게시판 <br> 경매품 게시판 <br>게시판 관리자모드 | 마이페이지 | 

<br>

## 4. <span id="page">페이지별 기능</span>


<br>

## 5. <span id="env">개발 기간 및 환경</span>

#### 개발기간 
24.11.11 ~ 24. 11. 29

#### 시스템 구성도
<img src="" alt="Architecture" />

#### UML
<img src="https://private-user-images.githubusercontent.com/177177917/391394944-4cc92004-6e82-4c08-ab5b-b21a4db6a14e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMxMDgyMzEsIm5iZiI6MTczMzEwNzkzMSwicGF0aCI6Ii8xNzcxNzc5MTcvMzkxMzk0OTQ0LTRjYzkyMDA0LTZlODItNGMwOC1hYjViLWIyMWE0ZGI2YTE0ZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIwMlQwMjUyMTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02M2U5MzhkZWQxYzUxNzk4MGQ4NDM3MWQ0ZWMxYzA5MTYxNTU3NmI4ZmIzNWRiYjU1MGFhMTcwZmYwYjdkN2U5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.1Hyh4A85NncQvhdSJmaPrkEQplZ8kUzgh6OebOU8GAA"/>

#### 데이터베이스
<img src="" alt="ERD" />


#### 기술 스택
<p>
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white" alt="spring"/>
  <img src="https://img.shields.io/badge/WebSocket-61DAFB?style=for-the-badge&logo=WebSocket&logoColor=white" alt="websocket" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" alt="React" />
</p>

<br>

## 6. <sapn id="tree">프로젝트 구조</span>

#### Back-end

```
├── src
│     ├── faq
│     │     ├── FaqController
│     │     ├── FaqDAO
│     │     ├── FaqDTO
│     │     └── FaqService
│     ├── notice
│     │     ├── NoticeController
│     │     ├── NoticeDTO
│     │     ├── NoticeMapper
│     │     └── NoticeService
│     ├── personal
│           ├── PersonalController
│     │     ├── PersonalDAO
│     │     ├── PersonalDTO
│     │     └── PersonaleService
│     ├── user
│     │     ├── LoginController
│     │     ├── LoginRequest
│     │     ├── PasswordController
│     │     ├── PasswordUpdateRequest
│     │     ├── SignupRequest
│     │     ├── UserController
│     │     ├── UserDAO
│     │     ├── UserDTO
│     │     ├── UserNotFoundException
│     │     ├── UserRepository
│     │     └── UserService.java
│     ├── admin
│     │     ├── userDetail
│     │     │     ├── UserDetailController
│     │     │     ├── UserDetailDAO
│     │     │     ├── UserDetailDTO
│     │     │     └── UserDetailService
│     │     ├── AdminController
│     │     ├── AdminDAO
│     │     ├── AdminDTO
│     │     └── AdminService
│     ├── auction
│     │     ├── AuctionController
│     │     ├── AuctionDAO
│     │     ├── AuctionDTO
│     │     ├── AuctionService
│     │     └── GlobalExceptionHandler
│     ├── common
│     │     ├── config
│     │     │     ├── WebConfig
│     │     │     └── WebSocketConfig
│     │     ├── tossPay
│     │     │     ├── PaymentException
│     │     │     ├── TossController
│     │     │     ├── TossDAO
│     │     │     ├── TossDTO
│     │     │     ├── TossService
│     │     │     └── TosspaymentConfig
│     ├── mypage
│     │     ├── auctionItem
│     │     │     ├── ItemController
│     │     │     ├── ItemDAO
│     │     │     ├── ItemDTO
│     │     │     └── ItemService
│     │     ├── favorite
│     │     │     ├── FavoController
│     │     │     ├── FavoDAO
│     │     │     ├── FavoDTO
│     │     │     └── FavoService
│     │     ├── myinfo
│     │     │     ├── InfoController
│     │     │     ├── InfoDAO
│     │     │     ├── InfoDTO
│     │     │     └── InfoService
│     │     ├── participate
│     │     │     ├── ParticipateController
│     │     │     ├── ParticipateDAO
│     │     │     ├── ParticipateDTO
│     │     │     └── ParticipateService
│     ├── payment
│     │     └── WidgetController
│     ├── requestItem
│     │     ├── ImageUpload
│     │     │     ├── image
│     │     │     │     ├── ImageController
│     │     │     │     ├── ImageDTO
│     │     │     │     └── ImageService
│     │     │     └── mapper
│     │     │           └── ImageMapper
│     │     ├── RequestItemController
│     │     ├── RequestItemDAO
│     │     ├── RequestItemDTO
│     │     └── RequestItemService
│     └── websocket
│          └── Globalstyled.jsx
│              
└── resources
      ├── mapper
      │     ├── BidMapper.xml
      │     ├── adminMapper.xml
      │     ├── auctionMapper.xml
      │     ├── faqMapper.xml
      │     ├── favoMapper.xml
      │     ├── infoMapper.xml
      │     ├── itemMapper.xml
      │     ├── participateMapper.xml
      │     ├── requestItemMapper.xml
      │     └── userMapper.xml
      └── application.yml 
  
