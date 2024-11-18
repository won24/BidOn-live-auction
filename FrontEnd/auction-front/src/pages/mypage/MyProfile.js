// 내 정보 (/mypage/myprofile)

/*
* <h1> 로 ‘내 정보’ 타이틀 쓰고
* 로그인 한 회원이 내 정보 페이지에 들어가면 해당 회원의 아이디, 비밀번호,
* 휴대전화, 주소, 보유 캐시가 바로 보이게 구현
* (보유 캐시 보이기 (구현 예정)

* 비밀번호 변경 기능 (할지 안 할지 모름)
* */

import { useEffect, useState } from "react";

const MyProfile = () => {

    // userInfo 는 로그인된 사용자의 정보를 담는 객체 (초기값은 빈 값으로 설정)
    const [userInfo, setUserInfo] = useState({  // userInfo 는 로그인 된 사용자의 정보를 담는 객체
        id: "user1",
        password: "password1",
        phone: "010-1111-1111",
        address: '서울시 강남구',
        // 사용자의 아이디,비번,폰,주소를 임시로 설정
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            // 서버에서 사용자 정보를 불러오는 함수 정의
            try {
                const response = await fetch("http://localhost:8080/mypage/myprofile",{
                    // 서버로 GET 요청 보내가
                    method: "GET",  // 서버에서 데이터를 가져오기 위한 HTTP 멧돼지 메소드
                });
                const data = await response.json();
                // 서버로부터 받은 응답 데이터를 JSON 형식으로 변환

                if (response.ok) {
                    // 응답이 정상적으로 처리되었으면(userInfo 업데이트)
                    setUserInfo(data);  // 서버에서 받은 데이터를 userInfo 에 저장
                } else {
                    console.error("사용자 정보를 가져오지 못했습니다.", data);
                    // 응답이 실패했을 경우 에러 메시지 출력
                }
            } catch (error) {
                console.error("사용자 정보 가져오기 오류", error);
                // 요청 중 네트워크 문제 등 오류 발생 시 출력되는 에러 메시지
            }
        };
        fetchUserInfo();
        // 위에서 정의한 함수를 호출해서 사용자 정보를 가져옴
    }, []);  // 코드가 처음 로드할 때 한 번만 실행되게 함

    return (
        <div style={{padding: "20px", fontFamily: "Arial, sans-serif"}}>
            <h1>내 정보</h1>
            <div style={{marginBottom: "10px"}}>
                <strong>아이디:</strong> {userInfo.id}
            </div>
            <div style={{marginBottom: "10px"}}>
                <strong>비밀번호:</strong> {userInfo.password}
            </div>
            <div style={{marginBottom: "10px"}}>
                <strong>휴대전화:</strong> {userInfo.phone}
            </div>
            <div style={{marginBottom: "10px"}}>
                <strong>주소:</strong> {userInfo.address}
            </div>
        </div>
    );
};

export default MyProfile;