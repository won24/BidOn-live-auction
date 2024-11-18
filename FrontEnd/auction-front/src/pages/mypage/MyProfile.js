import { useEffect, useState } from "react";
import "./MyProfile.css";

const MyProfile = () => {
    // userInfo 는 로그인된 사용자의 정보를 담는 객체 (초기값은 빈 값으로 설정)
    const [userInfo, setUserInfo] = useState({
        id: "user1",
        password: "password1",
        phone: "010-1111-1111",
        address: "서울시 강남구",
        credit: "100,000,000,000", // 추가: 사용자의 보유 크레딧 정보
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            // 서버에서 사용자 정보를 불러오는 함수 정의
            try {
                const response = await fetch("http://localhost:8080/mypage/myprofile", {
                    // 서버로 GET 요청 보내기
                    method: "GET",
                });
                const data = await response.json();
                // 서버로부터 받은 응답 데이터를 JSON 형식으로 변환

                if (response.ok) {
                    // 응답이 정상적으로 처리되었으면(userInfo 업데이트)
                    setUserInfo(data); // 서버에서 받은 데이터를 userInfo 에 저장
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
    }, []); // 코드가 처음 로드할 때 한 번만 실행되게 함

    return (
        <div className="profile-container">
            <h1>내 정보</h1>
            <div className="profile-table">
                {/* 계정 이미지 */}
                <div className="profile-row">
                    <div className="profile-label">프로필 사진</div>
                    <div className="profile-image">
                        <img src="your-profile-image.png" alt="프로필 이미지" />
                    </div>
                </div><br/>

                {/* 사용자 아이디 */}
                <div className="profile-row">
                    <div className="profile-label">아이디</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.id} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 비밀번호 */}
                <div className="profile-row">
                    <div className="profile-label">비밀번호</div>
                    <div className="profile-value">
                        <input type="password" value={userInfo.password} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 휴대전화 */}
                <div className="profile-row">
                    <div className="profile-label">휴대전화</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.phone} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 주소 */}
                <div className="profile-row">
                    <div className="profile-label">주소</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.address} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 Credit */}
                <div className="profile-row">
                    <div className="profile-label">Credit</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.credit} readOnly /> (원)
                    </div>
                </div><br/>
            </div>
        </div>
    );
};

export default MyProfile;
