/**
 * Signup2.js (도메인 및 파일명 수정 예정)
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 * 
 */
import { useSignupContext } from "./SignupContext"; // Adjust the path as needed

const Signup2 = () => 
{
    const { marketingPreferences } = useSignupContext();
    const { sendEmail, sendMessage } = marketingPreferences;

    return (
        <div>
            <h2>회원가입</h2>
            <h3>정보입력</h3>
            <p>마케팅 수신 동의 상태:</p>
            <ul>
                <li>이메일 수신: {sendEmail ? "동의함" : "동의하지 않음"}</li>
                <li>SMS 수신: {sendMessage ? "동의함" : "동의하지 않음"}</li>
            </ul>
        </div>
    );
};

export default Signup2;