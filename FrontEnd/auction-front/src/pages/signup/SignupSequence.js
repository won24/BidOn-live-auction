/**
 * SignupSequence.js
 * - 회원가입 페이지 상단 진행도 부분을 담당
 * 
 * SignupContext.js의 useContext를 이용하여,
 * 1) 버튼을 눌러 다음 단계로 진행할 때마다 진행도 1 증가 (완료)
 */

import { useSignupContext } from "./SignupContext";
import "../../css/SignupSequence.css";

export const SignupSequence = () => {
    const { currentStep } = useSignupContext();

    return (
        <div className="sequence-container">
            <div className={`step seq_1 ${currentStep === 1 ? "current-step" : ""}`}>
                <span>1<br/>약관동의</span>
            </div>
            <div className="arrow-right"></div>
            <div className={`step seq_2 ${currentStep === 2 ? "current-step" : ""}`}>
                <span>2<br/>정보입력</span>
            </div>
            <div className="arrow-right"></div>
            <div className={`step seq_3 ${currentStep === 3 ? "current-step" : ""}`}>
                <span>3<br/>가입완료</span>
            </div>
        </div>
    );
};
