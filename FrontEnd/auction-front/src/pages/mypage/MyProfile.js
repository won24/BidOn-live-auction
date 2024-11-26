import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogin } from "../login/LoginContext";

const MyProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState("");                      // 새 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState("");              // 비밀번호 확인 상태
    const [passwordChangeMessage, setPasswordChangeMessage] = useState("");  // 비밀번호 변경 메시지
    const [showCurrentPassword, setShowCurrentPassword] = useState(false); // 기존 비밀번호 보기 상태
    const [showNewPassword, setShowNewPassword] = useState(false);         // 새 비밀번호 보기 상태
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 보기 상태
    const { user } = useLogin();

    const fetchUserInfo = async () => {
        // if (!user?.userCode) {
        //     return;
        // }

        setLoading(true);
        // setError(null);

        try {
            const response = await fetch("http://localhost:8080/mypage/myprofile");
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
        fetchUserInfo();
    };



    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordChangeMessage("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/mypage/changePassword", {
                userCode: user.userCode,
                newPassword,
            });

            setPasswordChangeMessage("비밀번호가 성공적으로 변경되었습니다.");
        } catch (err) {
            setPasswordChangeMessage(err.response?.data?.error || "비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (user?.userCode) {
        }

    }, [user?.userCode]);

    if (loading) {
        return <div>사용자 정보를 불러오는 중입니다...</div>;
    }

    return (
        <div className="profile-container">
            <h1>내 정보</h1>
            <div className="profile-table">
                {/* 아이디 */}
                <div className="profile-row">
                    <div className="profile-label">아이디</div>
                    <div className="profile-value">
                        <input type="text" value={user?.id} readOnly />
                    </div>
                </div>

                {/* 사용자 비밀번호 */}
                {/* <div className="profile-row">
                    <div className="profile-label">비밀번호</div>
                    <div className="profile-value">
                        <input type="password" value={user?.password} readOnly />
                    </div>
                </div><br/> */}

                {/* 사용자 이름 */}
                <div className="profile-row">
                    <div className="profile-label">이름</div>
                    <div className="profile-value">
                        <input type="text" value={user?.name} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 닉네임 */}
                <div className="profile-row">
                    <div className="profile-label">닉네임</div>
                    <div className="profile-value">
                        <input type="text" value={user?.nickname} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 생년월일 */}
                <div className="profile-row">
                    <div className="profile-label">생년월일</div>
                    <div className="profile-value">
                        <input type="text" value={user?.birth} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 생년월일 */}
                <div className="profile-row">
                    <div className="profile-label">이메일</div>
                    <div className="profile-value">
                        <input type="text" value={user?.email} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 휴대전화 */}
                <div className="profile-row">
                    <div className="profile-label">휴대전화</div>
                    <div className="profile-value">
                        <input type="text" value={user?.phone} readOnly />
                    </div>
                </div><br/>

                {/* 사용자 주소 */}
                {/* 주소 */}
                <div className="profile-row">
                    <div className="profile-label">주소</div>
                    <div className="profile-value">
                        <input type="text" value={user?.address} readOnly />
                    </div>
                </div>

                {/* 캐시는 우측 상단에서 보는 걸로 합시다 */}
                {/* <div className="profile-row">
                    <div className="profile-label">Credit</div>
                    <div className="profile-value">
                        <input type="text" value={user?.cash} readOnly /> (원)
                    </div>
                </div> */}
                {/* 휴대전화 */}
                <div className="profile-row">
                    <div className="profile-label">휴대전화</div>
                    <div className="profile-value">
                        <input type="text" value={userInfo.phone} readOnly />
                    </div>
                </div>

                {/* 기존 비밀번호 */}
                <div className="profile-row">
                    <div className="profile-label">기존 비밀번호</div>
                    <div className="profile-value">
                        <input
                            type={showCurrentPassword ? "text" : "password"} // 보기 상태에 따라 input type 변경
                            value={userInfo.password}
                            readOnly
                        />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? "숨기기" : "보기"}</button>
                    </div>
                </div>

                {/* 새 비밀번호 입력 */}
                <div className="profile-row">
                    <div className="profile-label">새 비밀번호</div>
                    <div className="profile-value">
                        <input
                            type={showNewPassword ? "text" : "password"} // 보기 상태에 따라 input type 변경
                            placeholder="새 비밀번호 입력"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}/>
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? "숨기기" : "보기"}</button>
                    </div>
                </div>

                {/* 새 비밀번호 확인 */}
                <div className="profile-row">
                    <div className="profile-label">새 비밀번호 확인</div>
                    <div className="profile-value">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // 보기 상태에 따라 input type 변경
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "숨기기" : "보기"}</button>
                    </div>
                </div>

                {/* 비밀번호 변경 버튼 */}
                <div className="profile-row">
                    <div className="profile-value">
                        <button onClick={handleChangePassword}>비밀번호 변경</button>
                    </div>
                </div>

                {/* 비밀번호 변경 메시지 */}
                {passwordChangeMessage && (
                    <div className="profile-row">
                        <div className="profile-message">{passwordChangeMessage}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
