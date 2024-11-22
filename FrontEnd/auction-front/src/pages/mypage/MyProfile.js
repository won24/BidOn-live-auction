import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogin } from "../login/LoginContext"; // axios 불러오기

const MyProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useLogin(); // 로그인 정보 가져오기

    // fetchUserInfo를 axios로 처리
    const fetchUserInfo = async () => {
        if (!user?.userCode) {
            // userCode가 없으면 요청하지 않음
            return;
        }

        setLoading(true); // 요청 시작 시 로딩 상태 설정
        setError(null); // 이전 오류 초기화

        try {
            // axios를 사용한 API 요청
            const response = await axios.post("http://localhost:8080/mypage/myprofile", {
                userCode: user.userCode, // userCode 전달
            });

            setUserInfo(response.data); // 사용자 정보를 상태로 설정
        } catch (err) {
            setError(err.response?.data?.error || err.message); // 오류 메시지 설정
        } finally {
            setLoading(false); // 요청 후 로딩 상태 변경
        }
    };

    useEffect(() => {
        if (user?.userCode) {
            fetchUserInfo(); // userCode가 있을 때만 데이터 가져오기
        }
    }, [user?.userCode]); // userCode가 변경될 때마다 다시 호출

    // 로딩 상태 처리
    if (loading) {
        return <div>로그인이 필요합니다.</div>; // 로딩 중에는 로딩 메시지 출력
    }

    // 오류 처리
    if (error) {
        return <div>Error: {error}</div>; // 오류가 있을 경우 오류 메시지 출력
    }

    // 사용자 정보 화면
    return (
        <div className="profile-container">
            <h1>내 정보</h1>
            <div className="profile-table">
                {/* 사용자 정보 표시 */}
                <div className="profile-row">
                    <div className="profile-label">아이디</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.id} readOnly/>
                    </div>
                </div>
                <div className="profile-row">
                    <div className="profile-label">비밀번호</div>
                    <div className="profile-value">
                        <input type="password" value={userInfo.password} readOnly/>
                    </div>
                </div>
                <div className="profile-row">
                    <div className="profile-label">휴대전화</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.phone} readOnly/>
                    </div>
                </div>
                <div className="profile-row">
                    <div className="profile-label">주소</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.address} readOnly/>
                    </div>
                </div>
                <div className="profile-row">
                    <div className="profile-label">보유 캐시</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.cash} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
