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
