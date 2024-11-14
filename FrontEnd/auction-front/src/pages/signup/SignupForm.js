/**
 * Signup2.js (도메인 및 파일명 수정 예정)
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 * 
 */

import { useState } from 'react';
import "../../css/SignupForm.css";
import { useSignupContext } from "./SignupContext"; // Adjust the path as needed

const SignupForm = () => 
{
    const { marketingPreferences } = useSignupContext();
    const { sendEmail, sendMessage } = marketingPreferences;
    const [formData, setFormData] = useState(
    {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Handle input change
    const handleChange = (e) => 
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Form submission
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) 
        {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) 
            {
                const message = await response.json();
                setError(message.error || 'Signup failed');
            } 
            else 
            {
                setSuccess(true);
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    if (success) 
    {
        return <div className="success-message">Signup successful! You can now log in.</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="signup-form">
        <div>
            <p>[개발용, 삭제예정] 마케팅 수신 동의 상태 확인</p>
            <ul>
                <li>이메일 수신: {sendEmail ? "동의함" : "동의하지 않음"}</li>
                <li>SMS 수신: {sendMessage ? "동의함" : "동의하지 않음"}</li>
            </ul>

            {/* Other form fields or components as needed */}
        </div>
            <h3>정보입력</h3>
            <hr className='line' />
            <div className="form-group">
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">전화번호</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">주소</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-button">가입하기</button>
        </form>
    );
};

export default SignupForm;