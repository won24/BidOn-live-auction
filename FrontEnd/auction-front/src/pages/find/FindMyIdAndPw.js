/**
 * FindMyIdAndPw.js
 * - 아이디/비밀번호 찾기를 담당
 * react-modal 모듈 사용 (npm install 후 사용 가능)
 *
 * /member/login 페이지 내의 해당 버튼을 누르면,
 * 1) 모달 창이 열리며 4개의 선택지 안내 (완료)
 * 2) 각 선택지(버튼) 클릭 시 팝업 오픈 (완료)
 * 3) 팝업에서 요구하는 정보 입력 시,
 * 3-1) 아이디 찾기의 경우 아이디 출력 (완료)
 * 3-2) 비밀번호 재설정의 경우 비밀번호 및 비밀번호 확인 입력 후 해당 비밀번호로 DB에 update 반영 (미구현)
 */

import "../../css/FindMyIdAndPw.css";

// Utility to handle popup window logic
const openPopup = (type, way) => 
{
    const baseUrl = `${window.location.origin}/finder/${type}/${way}`;
    const popupFeatures =
        type === "id"
            ? "width=500, height=225, overflow:hidden, resize=none,noopener"
            : "width=550, height=330, overflow:hidden, resize=none,noopener";
    window.open(baseUrl, "아이디/비밀번호 찾기", popupFeatures);
};

// Reusable button component for finder actions
const FinderButton = ({ label, onClick }) => (
    <button className="finder-button" onClick={onClick}>
        {label}
    </button>
);

const FindMyIdAndPw = ({ toggle }) => 
{
    return (
        <div
            className="find-my-id-and-pw"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="title">아이디/비밀번호 찾기</h2>

            {/* Find ID Section */}
            <h3 className="subtitle">아이디 찾기</h3>
            <hr className="line" />
            <span className="message">인증을 통해 아이디를 찾을 수 있습니다.</span>
            <div>
                <FinderButton
                    label="전화번호로 찾기"
                    onClick={() => openPopup("id", "phone")}
                />
                <FinderButton
                    label="이메일로 찾기"
                    onClick={() => openPopup("id", "email")}
                />
            </div>

            {/* Reset Password Section */}
            <h3 className="subtitle">비밀번호 찾기 (재설정)</h3>
            <hr className="line" />
            <span className="message">인증을 통해 비밀번호를 재설정할 수 있습니다.</span>
            <div className="finder-button-wrapper">
                <FinderButton
                    label="전화번호로 찾기"
                    onClick={() => openPopup("pw", "phone")}
                />
                <FinderButton
                    label="이메일로 찾기"
                    onClick={() => openPopup("pw", "email")}
                />
            </div>

            {/* Close Button */}
            <img
                src="//t1.daumcdn.net/postcode/resource/images/close.png"
                id="btnCloseLayer"
                style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "-3px",
                    top: "-3px",
                    zIndex: 1,
                }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling up to modal
                    toggle(); // Close the modal
                }}
                alt="닫기 버튼"
            />
        </div>
    );
};

export default FindMyIdAndPw;
