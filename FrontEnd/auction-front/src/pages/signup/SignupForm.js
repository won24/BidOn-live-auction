/**
 * SignupForm.js
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 * 
 */

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
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        birth: '',
        gender: '',
        nickname: '',
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

        // Prepare the data to send, omitting confirmPassword
        const dataToSend = 
        { 
            id: formData.id,
            password: formData.password,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            birth: formData.birth,
            gender: formData.gender,
            nickname: formData.nickname
        };

        try {
            const response = await fetch('http://localhost:8080/signup', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
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
            <h3 className='subtitle'>회원 정보 입력</h3>
            <hr className='line' />
            
            <div className="form-group">
                <label htmlFor="id">아이디</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
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
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="birth">생년월일</label>
                <input
                    type="date"
                    id="birth"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="gender">성별</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="phone">전화번호</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
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
            <div className="button-wrapper">
                <button type="submit" className="signup-button">가입하기</button>
            </div>

            <div>
                <p>[개발용, 삭제예정] 마케팅 수신 동의 상태 확인</p>
                <ul>
                    <li>이메일 수신: {sendEmail ? "동의함" : "동의하지 않음"}</li>
                    <li>SMS 수신: {sendMessage ? "동의함" : "동의하지 않음"}</li>
                </ul>
            </div>
        </form>
    );
};

export default SignupForm;