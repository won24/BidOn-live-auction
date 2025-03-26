# 실시간 경매 BID ON
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/logo.png?raw=true"/>  
<br>

> 본 README는 BID ON 프로젝트에서 제가 맡은 기능에 한해 포트폴리오 용도로 일부 수정하였습니다.
전체 프로젝트는 아래 원본 저장소에서 확인할 수 있습니다.
> [원본 GitHub Repository](https://github.com/gangnam-auction/gangnam-auction)
>

<summary>목차</summary>

1. [프로젝트 소개](#intro)
2. [요구사항](#reqirements)
3. [맡은 기능](#my)
4. [트러블 슈팅](#troubleShooting)
5. [페이지별 기능](#page)
6. [개발 환경](#env)

<br>

## 1. <span id="intro">프로젝트 소개</span>
**BID ON**은 실시간 입찰과 채팅이 가능한 온라인 경매 플랫폼입니다.  
사용자는 경매 품목을 등록하고, 실시간으로 입찰에 참여하며, 낙찰 여부에 따라 금액이 처리되는 실시간 시스템을 경험할 수 있습니다.

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
  
## 3. <span id="my">맡은 기능</span>
#### 기획, 디자인, 프론트엔드, 백엔드
| **기능 페이지** | **주요 내용** |
| :-------: | :-------: |
| 메인페이지 | 최근 본 게시글 구현 <br> 배너를 통해 해당 아이템 상세보기 <br> 홈페이지 전체 레이아웃 |
| 라이브 경매 게시판 | 시간에 따른 채팅/입찰/낙찰 후 환불 기능 활성화 <br> 낙찰자 안내 모달창 |
| 경매품 게시판 | 경매 목록 <br> 필터링 <br> 검색 <br> 즐겨찾기 <br> 경매품 상세보기 페이지 |
| 관리자 모드 | 게시글 승인/수정/삭제 기능 <br> 권한 분리 |

<br>

## 4. <span id="troubleShooting">트러블 슈팅</span>

#### 최근 본 게시물 – 브라우저 뒤로가기 시 상태 미반영 문제

- 로컬스토리지를 기반으로 게시물을 보여주도록 구현했으나, 브라우저 뒤로가기 시 `useEffect`가 재실행되지 않아 상태가 갱신되지 않는 문제 발생  
- `window.addEventListener('popstate', ...)`를 통해 뒤로가기 이벤트 감지 후 상태를 업데이트하여 해결  
- **SPA 라우팅과 상태 관리 간의 연결을 명확히 이해하고 대응할 수 있었던 경험**

#### 경매 종료 후 환불 로직 반복 실행 문제

- 경매 종료 후, 낙찰자를 제외한 사용자에게 금액을 환불하는 로직이 타이머가 작동하는 5분간 계속 반복되어 **중복 환불 발생**  
- `requestSent` 상태 플래그를 도입해 로직을 최초 1회만 실행하도록 조건 분기하여 API 호출 중복을 방지  
- **실시간 로직에서의 비동기 제어와 상태 플래그 사용의 중요성을 체감**

<br>

## 5. <span id="page">페이지별 기능</span>
| **메인페이지** | **로그인** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png?raw=true" alt="mainpage" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EB%A1%9C%EA%B7%B8%EC%9D%B8.png?raw=true" alt="login" /> |
| 최근 본 게시글/ 메인 이미지를 통해 해당 아이템 상세보기/<br> 캐쉬충전/ 로그인/ 로그아웃 | 아이디 저장/ 회원가입/ 아이디, 비밀번호 찾기 |

| **회원가입** | **회원가입 정보입력** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png?raw=true" alt="signup" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%20%EC%A0%95%EB%B3%B4%EC%9E%91%EC%84%B1.png?raw=true" alt="signup input" /> |
| 약관동의 후 정보입력 | 정보 입력/ 유효성 평가 후 회원가입 |

| **게시글 리스트** | **상세페이지** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EB%A6%AC%EC%8A%A4%ED%8A%B8.png?raw=true" alt="board" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png?raw=true" alt="board detail"/> |
| 검색/ 카테고리별 보기/ 상태별 보기 | 해당 경매품 이미지/ 상세 정보/ 즐겨찾기/ 경매상태 확인 |

| **라이브 경매** | **라이브 경매 후** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EB%9D%BC%EC%9D%B4%EB%B8%8C.png?raw=true" alt="live auction" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EB%82%99%EC%B0%B0.png?raw=true" alt="after live auction"/> |
| 경매 10분 전부터 라이브 게시판에 업로드 되어 채팅 활성화 <br> 경매 시작 후 5분 동안 입찰버튼 활성화로 실시간 입찰 가능 <br> 현재 가진 캐쉬보다 입찰가가 높다면 입찰 불가능 <br>채팅과 입찰은 로그인 후 가능 | 낙찰자에겐 낙찰 안내, 그 외 입찰자에겐 환불처리 <br> 라이브 경매가 끝난 직후에 입찰 버튼 비활성화, 채팅만 가능 <br> 경매 종료 5분 후에 게시글 상태 변경으로 채팅도 불가능 하며 카테고리에서 정보만 확인가능  |

| **게시글 작성** | **게시글 수정** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%9E%91%EC%84%B1.png?raw=true" alt="write post" /> |  <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%88%98%EC%A0%95.png?raw=true" alt="edit post" /> |
| 카테고리, 경매 날짜, 입찰 시작가, 상세 설명, 이미지를 모두 작성해야 업로드 가능 <br> 날짜는 현재로부터 7일 후 부터 선택가능 <br> 이미지는 개별 삭제, 전체삭제 가능 | 관리자로 로그인 후 수정 가능/ 수정, 삭제, 승인 |

| **고객센터** | **1:1문의** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%9E%91%EC%84%B1.png?raw=true" alt="write post" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B12.png?raw=true" alt="write post"/> |
| 카테고리, 경매 날짜, 입찰 시작가, 상세 설명, 이미지를 모두 작성해야 업로드 가능 | 날짜는 현재로부터 7일 후 부터 선택가능 <br> 이미지는 개별 삭제, 전체삭제 가능 |

| **마이페이지** | **관리자페이지** |
| :------------: | :------------: |
| <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png?raw=true" alt="mypage" /> | <img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B4%80%EB%A6%AC%EC%9E%90%ED%8E%98%EC%9D%B4%EC%A7%80.PNG?raw=true" alt="admin page"/> |
| 즐겨찾기/ 정보 확인, 수정/ 신청 경매품/ 낙찰 경매품 확인 | 1:1문의 확인 후 답변/경매품 신청으로 들어 온 게시글 확인/ 유저 정보 확인 |

<br>

## 6. <span id="env">개발 기간 및 환경</span>

#### 프로젝트 기간
24.11.11 ~ 24. 11. 29
(4인 팀 프로젝트)

#### 시스템 구성도
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/%EC%95%84%ED%82%A4%ED%85%8C%EC%B2%98.png?raw=true" alt="Architecture" />

#### UML
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/uml.png?raw=true" alt="UML"/>

#### 데이터베이스
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/ER.png?raw=true" alt="ERD" />


#### 기술 스택
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D.png?raw=true" alt="stack" style="width:80%"/>
