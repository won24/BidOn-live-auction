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
3. [주요 기술 성과](#my)
4. [프로젝트 회고](#troubleShooting)
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
  
## 3. <span id="my">주요 기술 성과</span>
#### 기획, 디자인, 프론트엔드, 백엔드

### 1. React 기반 성능 최적화 및 커스텀 훅 아키텍처

**- 문제**
대용량 경매 데이터와 복잡한 필터링 로직으로 인한 성능 저하 <br>

**- 해결**
- **커스텀 훅 패턴**을 활용한 **비즈니스 로직 분리 및 재사용성 확보**
- **useMemo 최적화**로 불필요한 렌더링 감소

### 2. 경매 상태 관리 및 자동화 시스템
- 경매 예정 → 진행 → 종료 **3단계 경매 상태의 완전 자동 전환 구현** 
- 서버 시간 동기화 기반 **타이머 시스템 (오차 ±2초 이내)**
- **상태별 조건부 UI 렌더링 및 사용자 액션 제어**

### 3. SPA 환경 브라우저 히스토리 캐시 시스템

**문제** <br> 
Single Page Application 환경에서 뒤로가기/새로고침 시 상태 손실

**해결**
- **LocalStorage + API 동기화** 하이브리드 캐싱 전략 도입
- **`popstate` 이벤트 감지**를 통한 **브라우저 히스토리 상태 추적**
- 최근 본 게시물 **캐시 및 상태 강제 갱신 로직 개발**

**성과** <br>
**사용자 페이지 이동 경험 완전한 상태 복원, UX 만족도 향상**

### 4. 권한 기반 UI 및 자동화된 후처리 시스템
- 관리자/일반 사용자 **권한 분리 및 조건부 UI 렌더링**
- 경매 종료 후 **낙찰자 모달 자동 표시** 및 **채팅 종료 처리**
- 미낙찰 참여자 대상 **자동 환불 API** 호출 시스템
- **상태 플래그** 도입으로 **중복 실행 방지** 로직 구현
- 경매 종료 → 낙찰자 결정 → 알림 발송 → 환불 처리의 **완전 자동화**

<br>

## 4. <span id="troubleShooting">프로젝트 회고</span>
#### 1. 성과
프로젝트를 통해 React, Spring Boot 기술 스택을 실제 개발에 적용하며 소중한 경험을 쌓았습니다. <br>

#### 2. 아쉬운 점
프로젝트 완성에만 급급했던 나머지, 각 기능이 어떤 원리로 동작하는지, 어떻게 최적화 할 수 있는 지에 대한 깊이 있는 고민이 부족했습니다. <br>
또한 개발 과정에서 내가 왜 이런 기술적 선택을 했는지, 어떤 의도로 설계 했는지를 체계적으로 기록하지 않아 나중에 코드를 다시 봤을 때 혼란스러웠습니다.<br>
문제가 생겼을 때도 당장 해결하는 데만 집중했지, 다양한 해결 방안이나 근본적인 원인까지는 파고들지 못했습니다.

#### 3. 개선하고 싶은 점
**- 체계적 문서화 습관 확립**
<br>
개발하면서 내린 모든 의사 결정과 기술적 선택의 이유를 기록하고, 구현 의도와 설계 배경을 명확히 문서화할 필요성을 느꼈습니다.

**- 기술적 이해도 향상**
<br>
단순히 코드가 돌아가게 만드는 것을 넘어서 왜 이렇게 동작하는지, 어떻게 하면 더 좋게 만들 수 있는 지를 생각하며 기능을 구현해야 문제를 만났을 때도 여러 해결책을 검토하고 근본적인 원인을 분석할 수 있음을 느꼈습니다.<br>
빠른 개발도 중요하지만, 그 과정에서 기술적 이해도를 높이는 것도 함께 챙기고자 합니다.

#### 4. 결론
새로운 기술 스택을 익히고 실무 경험을 쌓는 데 성공했으나, 문서화와 원리 이해라는 개선점을 발견할 수 있었습니다. 

향후 프로젝트에서는 기능 구현과 함께 체계적인 학습 기록과 깊이 있는 기술 탐구를 병행하여 더욱 의미 있는 개발 경험을 쌓아나가고자 합니다.

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

#### Architecture
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/%EC%95%84%ED%82%A4%ED%85%8C%EC%B2%98.png?raw=true" alt="Architecture" />

#### UML
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/uml.png?raw=true" alt="UML"/>

#### ERD
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/main/FrontEnd/auction-front/src/assets/ER.png?raw=true" alt="ERD" />


#### 기술 스택
<img src="https://github.com/gangnam-auction/gangnam-auction/blob/won/FrontEnd/auction-front/src/assets/readMe_%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D.png?raw=true" alt="stack" style="width:80%"/>
