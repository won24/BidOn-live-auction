/**
 * Signup1.js (도메인 및 파일명 수정 예정)
 * - 회원가입 과정 중 필수 및 선택 사항 동의에 대한 부분을 담당
 * 
 * Nov 11,
 * 약관은 terms_and_conditions.html로, 개인정보취급방침은 privacy_policy.html로
 * 두 파일 모두 public 폴더에 임시저장되어 있음 (경로 변경 예정)
 * 
 * 약관은 페이지 접근 시 <details>로 접혀있으며, 
 * <details>의 어느 부분을 클릭하여도 <embed>된 약관이 펼쳐짐. (완료)
 * 
 * <details>가 펼쳐질 때,
 * 1) 우측에 접힘/펼침을 확인할 수 있는 화살표 애니메이션 추가 (완료)
 * 2) 천천히 펼쳐지도록 애니메이션 추가 (완료)
 * 3) 기존에 열려있던 다른 <details>를 강제로 닫음 (완료)
 * 
 * 체크박스를 클릭할 경우 해당 사항에 동의하는 것으로 간주하며,
 * 1) [필수] 항목이 모두 채워지지 않은 상태에서는 '다음으로' 버튼이 활성화되지 않음 (완료)
 * 2) 각 <details> 내의 [필수] 항목 동의 시 해당 <details> 자동으로 닫힘 (완료)
 * 3) 각 [필수] 항목 동의 시 연결된 <details>의 테두리 두께 변경 (완료)
 * 3-1) 전체 동의 체크 시에도 테두리 두께 변경 (완료)
 * 4) 하위 체크박스를 모두 활성화할 경우 상위 체크박스를 활성화한 것으로 간주 (완료)  
 * 
 * [선택] 항목에 마우스 오버 시, 안내 문구 출력 (완료)
 * 
 * Nov 13,
 * '다음으로' 버튼 클릭 시,
 * 1) 동의한 [선택] 항목에 대한 정보를 useContext를 이용하여 SignupForm.js 파일로 전달 (완료)
 * 2) 다음으로 버튼이 사라지며 정보입력 폼이 하단에 등장 (완료)
 * 3) 정보입력 폼이 한 화면에 보이도록 자동 스크롤 (완료)
 * X) 회원가입에 필요한 정보 입력 페이지로 이동 (취소)
 */

import { useState, useEffect, useRef } from "react";
import "../../css/Signup1.css";
import { useSignupContext } from './SignupContext';
import { SignupSequence } from "./SignupSequence";
import SignupForm from "./SignupForm";

const Signup1 = () => 
{
    // States for checkbox control
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [sendMessage, setSendMessage] = useState(false);
    const [checkedDetails, setCheckedDetails] = useState({ terms: false, privacy: false });
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const { setCurrentStep, setMarketingPreferences } = useSignupContext();
    const formContainerRef = useRef(null);

    const goToNextStep = () => 
    {
        setMarketingPreferences({ sendEmail, sendMessage });
        setButtonClicked(true);
        setIsDisabled(true);
        setCurrentStep(2);
    };

    const handleAgreeAllChange = () => 
    {
        const newState = !agreeAll;
        setAgreeAll(newState);
        setAgreeTerms(newState);
        setAgreePrivacy(newState);
        setAgreeMarketing(newState);
        setSendEmail(newState);
        setSendMessage(newState);
        setCheckedDetails({ terms: newState, privacy: newState });
    };

    const handleIndividualChange = (setter, isChecked, event, detailType) => 
    {
        setter(isChecked);
        setCheckedDetails(prev => ({ ...prev, [detailType]: isChecked }));

        if (isChecked) 
        {
            const detailsElement = event.target.closest("details");
            if (detailsElement) 
            {
                detailsElement.open = false;
            }
        }
    };

    const handleMarketingChange = () => 
    {
        const newState = !agreeMarketing;
        setAgreeMarketing(newState);
        setSendEmail(newState);
        setSendMessage(newState);
    };

    const handleMarketingIndividualChange = (setter, isChecked) => 
    {
        setter(isChecked);
    };

    // Synchronize related checkboxes
    useEffect(() => 
    {
        setAgreeMarketing(sendEmail && sendMessage);
    }, [sendEmail, sendMessage]);

    useEffect(() => 
    {
        setAgreeAll(agreeTerms && agreePrivacy && agreeMarketing);
    }, [agreeTerms, agreePrivacy, agreeMarketing]);

    // Close other open <details> elements when one is expanded
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

    // Scroll to the signup form container when the button is clicked
    useEffect(() => 
    {
        if (buttonClicked) 
        {
            const timeoutId = setTimeout(() => 
            {
                formContainerRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 1); // 1ms delay

            // Clear the timeout on cleanup
            return () => clearTimeout(timeoutId);
        }
    }, [buttonClicked]);

    const embedHtml = (src) => (
    {
        __html: `<embed src="${src}" width="100%" height="450px" style="border: none;"/>`,
    });

    return (
        <div className="signup-container">
            <h2 className="title">회원가입</h2>
            <SignupSequence />
            <h3 className="subtitle">약관동의</h3>
            <hr className="line" />
            <span className="message">회원가입을 위해 아래의 필수 약관에 모두 동의해주세요.</span>
            <label className="agree-all">
                <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={handleAgreeAllChange}
                    disabled={isDisabled}
                />
                <span>모든 약관을 확인하였으며 전체 동의합니다.</span>
            </label>

            <details className={checkedDetails.terms ? "checked" : ""}>
                <summary>온라인경매 이용약관 동의</summary>
                <div className="agreement" dangerouslySetInnerHTML={embedHtml("/terms_and_conditions.html")} />
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => handleIndividualChange(setAgreeTerms, e.target.checked, e, "terms")}
                        disabled={isDisabled}
                    />
                    <span>[필수] 온라인 서비스 이용약관을 확인하였으며 이에 동의합니다.</span>
                </label>
            </details>

            <details className={checkedDetails.privacy ? "checked" : ""}>
                <summary>개인정보 수집 및 이용 동의</summary>
                <div className="agreement" dangerouslySetInnerHTML={embedHtml("/privacy_policy.html")} />
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => handleIndividualChange(setAgreePrivacy, e.target.checked, e, "privacy")}
                        disabled={isDisabled}
                    />
                    <span>[필수] 개인정보취급방침을 확인하였으며 이에 동의합니다.</span>
                </label>
            </details>

            <div className="marketing-checkbox-container">
                <label className="individual-checkbox-container">
                    <input
                        type="checkbox"
                        checked={agreeMarketing}
                        onChange={handleMarketingChange}
                        disabled={isDisabled}
                    />
                    <span>[선택] 홍보 및 마케팅 목적의 정보 수신 전체 동의</span>
                </label>
                <span className="message-hovering">
                    *거래와 관련된 정보는 수신 동의 여부와 상관없이 발신됩니다.
                </span>
                <div className="marketing-individual-checkbox-container">
                    <label>
                        <input
                            type="checkbox"
                            checked={sendEmail}
                            onChange={(e) => handleMarketingIndividualChange(setSendEmail, e.target.checked)}
                            disabled={isDisabled}
                        />
                        <span>이메일</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={sendMessage}
                            onChange={(e) => handleMarketingIndividualChange(setSendMessage, e.target.checked)}
                            disabled={isDisabled}
                        />
                        <span>SMS</span>
                    </label>
                </div>
            </div>

            <div className="auth-link-wrapper">
                {!buttonClicked ? (
                    <button
                        className={`auth-link ${agreeTerms && agreePrivacy ? "" : "disabled"}`}
                        disabled={!agreeTerms || !agreePrivacy}
                        onClick={goToNextStep}
                    >
                        <span>다음으로</span>
                    </button>
                ) : (
                    <div className="signup-form-container" ref={formContainerRef}>
                        <SignupForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup1;
