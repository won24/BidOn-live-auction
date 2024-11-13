import { useLocation } from "react-router-dom";
import "../../css/SignupSequence.css";

export const SignupSequence = () => 
{
    const location = useLocation();
    const currentPath = location.pathname;

    const isCurrentStep = (stepPath) => currentPath.includes(stepPath);

    return (
        <div className="sequence-container">
            <div className={`step seq_1 ${isCurrentStep("signup1") ? "current-step" : ""}`}>
                <span>1
                    <br/>
                    약관동의</span>
            </div>
            <div className="arrow-right"></div>
            <div className={`step seq_2 ${isCurrentStep("signup2") ? "current-step" : ""}`}>
                <span>2
                    <br/>
                    정보입력</span>
            </div>
            <div className="arrow-right"></div>
            <div className={`step seq_3 ${isCurrentStep("signup3") ? "current-step" : ""}`}>
                <span>3
                    <br/>
                    가입완료</span>
            </div>
        </div>
    );
};
