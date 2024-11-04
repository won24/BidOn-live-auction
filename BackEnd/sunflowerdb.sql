use sunflowerdb;
DROP TABLE IF EXISTS personal CASCADE;
DROP TABLE IF EXISTS notice CASCADE;
DROP TABLE IF EXISTS fna CASCADE;
DROP TABLE IF EXISTS board CASCADE;
DROP TABLE IF EXISTS users CASCADE;
-- 외래 키 제약 조건을 비활성화합니다.
SET FOREIGN_KEY_CHECKS = 0;
-- 외래 키 제약 조건을 다시 활성화합니다.
SET FOREIGN_KEY_CHECKS = 1;
-- 강제할때만 사용

CREATE TABLE users (
                       UserCode INT AUTO_INCREMENT PRIMARY KEY,
                       Id VARCHAR(50) UNIQUE NOT NULL,
                       Password VARCHAR(255) NOT NULL,
                       Name VARCHAR(15) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       phone VARCHAR(20) NOT NULL,
                       birthDate DATE UNIQUE NOT NULL,
                       address VARCHAR(255),
                       cash INT DEFAULT 0,
                       gender VARCHAR(10) NOT NULL,
                       isAdult VARCHAR(10) NOT NULL CHECK(isAdult IN ('n', 'y')) DEFAULT 'n',
                       isAdmin VARCHAR(10) NOT NULL CHECK(isAdmin IN ('n', 'y')) DEFAULT 'n',
                       nickName VARCHAR(50) UNIQUE NOT NULL,
                       isSuspended VARCHAR(10) NOT NULL CHECK(isSuspended IN ('n', 'y')) DEFAULT 'n',
                       myItem INT,
                       getItem INT
);
CREATE TABLE board (
                       PostId       INT AUTO_INCREMENT PRIMARY KEY,
                       Title        VARCHAR(255) NOT NULL,
                       categoryCode VARCHAR(50)  NOT NULL,
                       Content      TEXT         NOT NULL,
                       ImageURL     VARCHAR(255) NOT NULL,
                       userCode     INT          NOT NULL,  -- userCode를 INT로 설정하여 users 테이블의 UserCode를 참조
                       CreatedAt    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
                       PostStatus   VARCHAR(20)  NOT NULL DEFAULT 'none' CHECK (PostStatus IN ('none', 'off', 'on', 'out')),
                       StartDAY     TIMESTAMP,
                       CONSTRAINT fk_board_userCode FOREIGN KEY (userCode) REFERENCES users(UserCode)  -- 외래 키 추가
);

CREATE TABLE fna (
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE notice (
    title VARCHAR(255),
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personal(
    title VARCHAR(255),
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answer VARCHAR(255),
    userCode INT,
    CONSTRAINT fk_users_userCode FOREIGN KEY (userCode) REFERENCES users(UserCode)
);


-- users 테이블에 데이터를 삽입합니다.
INSERT INTO users (Id, Password, Name, email, phone, birthDate, address, cash, gender, isAdult, isAdmin, nickName, isSuspended, myItem, getItem)
VALUES
    ('user1', 'password1', '홍길동', 'user1@example.com', '010-1111-1111', '1990-01-01', '서울시 강남구', 1000, '남', 'y', 'n', 'nickname1', 'n', 1, 2),
    ('user2', 'password2', '이영희', 'user2@example.com', '010-2222-2222', '1991-02-02', '부산시 해운대구', 2000, '여', 'y', 'n', 'nickname2', 'n', 2, 3),
    ('user3', 'password3', '김철수', 'user3@example.com', '010-3333-3333', '1992-03-03', '대구시 수성구', 3000, '남', 'y', 'n', 'nickname3', 'n', 3, 4),
    ('user4', 'password4', '박영희', 'user4@example.com', '010-4444-4444', '1993-04-04', '인천시 남동구', 4000, '여', 'y', 'n', 'nickname4', 'n', 4, 5),
    ('user5', 'password5', '최민수', 'user5@example.com', '010-5555-5555', '1994-05-05', '광주시 북구', 5000, '남', 'y', 'n', 'nickname5', 'n', 5, 1),
    ('user6', 'password6', '정수빈', 'user6@example.com', '010-6666-6666', '1995-06-06', '대전시 서구', 6000, '여', 'y', 'n', 'nickname6', 'n', 6, 2),
    ('user7', 'password7', '한지민', 'user7@example.com', '010-7777-7777', '1996-07-07', '울산시 남구', 7000, '남', 'y', 'n', 'nickname7', 'n', 7, 3),
    ('user8', 'password8', '서지수', 'user8@example.com', '010-8888-8888', '1997-08-08', '경기도 성남시', 8000, '여', 'y', 'n', 'nickname8', 'n', 8, 4),
    ('user9', 'password9', '이준호', 'user9@example.com', '010-9999-9999', '1998-09-09', '경기도 수원시', 9000, '남', 'y', 'n', 'nickname9', 'n', 9, 5),
    ('user10', 'password10', '김민지', 'user10@example.com', '010-1010-1010', '1999-10-10', '경기도 고양시', 10000, '여', 'y', 'n', 'nickname10', 'n', 10, 1);

-- board 테이블에 데이터를 삽입합니다.
INSERT INTO board (Title, categoryCode, Content, ImageURL, userCode, PostStatus)
VALUES
    ('Post 1', 'cat001', 'Content of post 1', 'http://example.com/image1.jpg', 1, 'on'),
    ('Post 2', 'cat002', 'Content of post 2', 'http://example.com/image2.jpg', 2, 'off'),
    ('Post 3', 'cat003', 'Content of post 3', 'http://example.com/image3.jpg', 3, 'none'),
    ('Post 4', 'cat004', 'Content of post 4', 'http://example.com/image4.jpg', 4, 'out'),
    ('Post 5', 'cat005', 'Content of post 5', 'http://example.com/image5.jpg', 5, 'on'),
    ('Post 6', 'cat006', 'Content of post 6', 'http://example.com/image6.jpg', 6, 'off'),
    ('Post 7', 'cat007', 'Content of post 7', 'http://example.com/image7.jpg', 7, 'none'),
    ('Post 8', 'cat008', 'Content of post 8', 'http://example.com/image8.jpg', 8, 'out'),
    ('Post 9', 'cat009', 'Content of post 9', 'http://example.com/image9.jpg', 9, 'on'),
    ('Post 10', 'cat010', 'Content of post 10', 'http://example.com/image10.jpg', 10, 'off');

SELECT * FROM users;
SELECT * FROM board;