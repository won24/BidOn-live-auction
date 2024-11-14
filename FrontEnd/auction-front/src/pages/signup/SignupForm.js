/**
 * SignupForm.js
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 */

import { useState } from 'react';
import "../../css/SignupForm.css";
import { useSignupContext } from "./SignupContext";
import Postcode from './Postcode';

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
        address: '', // This will now be set by AddressSearch
        birth: '',
        gender: '',
        nickname: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => 
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) 
        {
            setError("Passwords do not match");
            return;
        }

        const dataToSend = {...formData};

        try {
            const response = await fetch('http://localhost:8080/signup', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
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
        return <div className="success-message">회원가입 완료</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h3 className='subtitle'>정보입력</h3>
            <hr className='line' />
            
            {/* Other form fields */}
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
                <span className="input-description">아이디는 5-20자의 영문자, 숫자 조합이어야 합니다.</span>
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
                <span className="input-description">8-20자의 영문, 숫자, 특수문자 조합을 사용하세요.</span>
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
                <span className="input-description">비밀번호를 한 번 더 입력해주세요.</span>
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
                <span className="input-description"></span>
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
                <span className="input-description">사용 가능한 이메일 주소를 입력하세요.</span>
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
                <span className="input-description">예: 010-1234-5678 형식으로 입력하세요.</span>
            </div>

            <div className="form-group">
                <label htmlFor="address">주소</label>
                    <Postcode />
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
                <span className="input-description"></span>
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
                <span className="input-description">성별을 선택해주세요.</span>
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
                <span className="input-description">8자 이내로 입력하세요.</span>
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
