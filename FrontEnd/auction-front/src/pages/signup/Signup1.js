/**
 * Signup1.js (도메인 및 파일명 수정 예정)
 * - 회원가입 과정 중 필수 및 선택 사항 동의에 대한 부분을 담당
 * 
 * 약관은 terms_and_conditions.html로, 개인정보취급방침은 privacy_policy.html로
 * 두 파일 모두 public 폴더에 임시저장되어 있음 (경로 변경 예정)
 * 
 * 약관은 페이지 접근 시 <details>로 접혀있으며, 
 * <details>의 어느 부분을 클릭하여도 <embed>된 약관이 펼쳐짐. (완료)
 * 
 * <details>가 펼쳐질 때,
 * 1) 우측에 접힘/펼침을 확인할 수 있는 화살표 애니메이션 추가 (완료)
 * 2) 천천히 펼쳐지도록 애니메이션 추가 (일부 구현 - 100% 구현 불가)
 * 3) 기존에 열려있던 다른 <details>를 강제로 닫음 (완료)
 * 
 * 체크박스를 클릭할 경우 해당 사항에 동의하는 것으로 간주하며,
 * 1) [필수] 항목이 모두 채워지지 않은 상태에서는 '다음으로' 버튼이 활성화되지 않음 (완료)
 * 2) 각 <details> 내의 [필수] 항목 동의 시 해당 <details> 자동으로 닫힘 (완료)
 * 3) 각 [필수] 항목 동의 시 연결된 <details>의 테두리 두께 변경 (완료)
 * 3-1) 전체 동의 체크 시에도 테두리 두께 변경 (완료)
 * 4) 하위 체크박스를 모두 활성화할 경우 상위 체크박스를 활성화한 것으로 간주 (미구현)  
 * 
 * [선택] 항목에 마우스 오버 시, 안내 문구 출력 (완료)
 * 
 * '다음으로' 버튼 클릭 시,
 * 1) 동의한 [선택] 항목에 대한 정보를 useContext를 이용하여 다음 페이지로 전달 (미구현)
 * 2) 회원가입에 필요한 정보 입력 페이지로 이동 (완료)
 */
import { useState, useEffect } from "react";
import "./Signup1.css";

const Signup1 = () => 
{
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const [checkedDetails, setCheckedDetails] = useState({ terms: false, privacy: false });

    const handleAgreeAllChange = () => 
    {
        const newState = !agreeAll;
        setAgreeAll(newState);
        setAgreeTerms(newState);
        setAgreePrivacy(newState);
        setAgreeMarketing(newState);
        setSendEmail(newState);
        setSendMessage(newState);

        // Update the checkedDetails state based on the agreeAll state
        setCheckedDetails(
        {
            terms: newState,
            privacy: newState
        });
    };

    const handleIndividualChange = (setter, isChecked, event, detailType) => 
    {
        setter(isChecked);
        setAgreeAll(
            isChecked &&
            agreeTerms &&
            agreePrivacy &&
            agreeMarketing &&
            sendEmail &&
            sendMessage
        );

        // Close the <details> section and update border state
        if (isChecked) 
        {
            const detailsElement = event.target.closest("details");
            if (detailsElement) 
            {
                detailsElement.open = false;
            }
            setCheckedDetails(prev => ({ ...prev, [detailType]: true }));
        } 
        else 
        {
            setCheckedDetails(prev => ({ ...prev, [detailType]: false }));
        }
    };

    const handleAgreeAllMarketingChange = () => 
    {
        const newState = !agreeMarketing;
        setAgreeMarketing(newState);
        setSendEmail(newState);
        setSendMessage(newState);
    };

    const handleMarketingIndividualChange = (setter, isChecked) => 
    {
        setter(isChecked);
        setAgreeMarketing(isChecked && sendEmail && sendMessage);
    };

    useEffect(() => 
    {
        const allDetails = document.querySelectorAll("details");
        allDetails.forEach((details) => 
        {
            details.addEventListener("toggle", (e) => 
            {
                if (details.open) 
                {
                    allDetails.forEach((item) => 
                    {
                        if (item !== e.target && item.open) 
                        {
                            item.open = false;
                        }
                    });
                }
            });
        });
    }, []);

    const embedPart1 = () => (
    {
        __html: '<embed src="/terms_and_conditions.html" width="100%" height="450px" style="border: none;"/>',
    });

    const embedPart2 = () => (
    {
        __html: '<embed src="/privacy_policy.html" width="100%" height="450px" style="border: none;"/>',
    });

    return (
        <div className="signup-container">
            <h2 className="title">회원가입</h2>
            <h3 className="subtitle">약관동의</h3>

            <label className="agree-all">
                <input
                    type="checkbox"
                    name="agreeAll"
                    checked={agreeAll}
                    onChange={handleAgreeAllChange}
                />
                &nbsp; 모든 약관을 확인하였으며 전체 동의합니다.
            </label>

            <details className={checkedDetails.terms ? "checked" : ""}>
                <summary>
                    <span>온라인경매 이용약관 동의</span>
                </summary>
                <div className="agreement" dangerouslySetInnerHTML={embedPart1()} />
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        className="individual-checkbox"
                        checked={agreeTerms}
                        onChange={(e) => handleIndividualChange(setAgreeTerms, e.target.checked, e, "terms")}
                    />
                    [필수] 온라인 서비스 이용약관을 확인하였으며 이에 동의합니다.
                </label>
            </details>

            <details className={checkedDetails.privacy ? "checked" : ""}>
                <summary>
                    <span>개인정보 수집 및 이용 동의</span>
                </summary>
                <div className="agreement" dangerouslySetInnerHTML={embedPart2()} />
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        className="individual-checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => handleIndividualChange(setAgreePrivacy, e.target.checked, e, "privacy")}
                    />
                    [필수] 개인정보취급방침을 확인하였으며 이에 동의합니다.
                </label>
            </details>

            <div className="marketing-checkbox-container">
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        className="individual-checkbox"
                        checked={agreeMarketing}
                        onChange={handleAgreeAllMarketingChange}
                    />
                    [선택] 홍보 및 마케팅 목적의 정보 수신 전체 동의
                </label>
                <span className="message-hovering">
                    *거래와 관련된 정보는 수신 동의 여부와 상관없이 발신됩니다.
                </span>
                <div className="marketing-individual-checkbox-container">
                    <label className="individual-checkbox-container">
                        <input
                            type="checkbox"
                            className="individual-checkbox"
                            checked={sendEmail}
                            onChange={(e) => handleMarketingIndividualChange(setSendEmail, e.target.checked)}
                        />
                        이메일 &nbsp;
                        <input
                            type="checkbox"
                            className="individual-checkbox"
                            checked={sendMessage}
                            onChange={(e) => handleMarketingIndividualChange(setSendMessage, e.target.checked)}
                        />
                        SMS
                    </label>
                </div>
            </div>

            <div className="auth-link-wrapper">
                <a
                    href="/signup2"
                    className={`auth-link ${agreeTerms && agreePrivacy ? "" : "disabled"}`}
                    style={{ pointerEvents: agreeTerms && agreePrivacy ? "auto" : "none" }}
                >
                    다음으로
                </a>
            </div>
        </div>
    );
};

export default Signup1;
