/**
 * Signup.js
 * - SignupTerms.js, SignupForm.js, SignupSequence.js, SignupContext.js 를 이용
 * 회원가입 과정 전체를 담당
 */

import SignupTerms from "./SignupTerms";
import { useSignupContext } from "./SignupContext";
import { SignupSequence } from "./SignupSequence";
import "../../css/SignupTerms.css";
import { useNavigate } from "react-router-dom";

const Signup = () =>
{
    const { currentStep, setCurrentStep } = useSignupContext();
    const navigate = useNavigate();

    const goToLogin = () =>
    {
        navigate("/member/login");
        setCurrentStep(1);
    }

    if(currentStep === 3)
    {
        return (
            <div className="signup-container">
                <h2 className="title">회원가입</h2>
                <SignupSequence/>
                <h3 className="subtitle">가입완료</h3>
                <hr className="line" />
                <span className="message">버튼을 눌러 로그인 화면으로 이동해주세요.</span>
                <h1 style={{textAlign: "center", margin: "175px"}}>회원가입이 완료되었습니다.</h1>
                <div className="auth-link-wrapper">
                    <button className="auth-link" onClick={goToLogin}>로그인 화면으로</button>
                </div>
            </div>
        );
    }

    return(
        <div>
            <h2 className="title">회원가입</h2>
            <SignupSequence/>
            <SignupTerms/>
        </div>
    )

}
export default Signup;