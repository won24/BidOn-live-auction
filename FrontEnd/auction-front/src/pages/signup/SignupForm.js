/**
 * SignupForm.js
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 * 
 * Nov 13,
 * Signup1(가칭)에서 '다음으로' 버튼 클릭 시 해당 위치에 생성되며,
 * 각 <label>에 해당하는 요소를 입력 받음.
 * 
 * 현재 에러 메시지는 '가입하기' 버튼 위에 출력되나, 변경 예정
 * 
 * 입력 받는 순서 변경 가능
 * 1) 아이디: 
 * 2) 비밀번호: 
 * 3) 비밀번호 확인: 비밀번호와 똑같은 값이 입력되어야 하며, 불일치 시 에러 메시지 출력 (완료)
 * 
 * 피자 먹으면서 축구 봐야 되니까 내일 마저 씀
 */
import { useState } from 'react';
import "../../css/SignupForm.css";
import { useSignupContext } from "./SignupContext";
import IdInput from './formFields/IdInput';
import PasswordInput from './formFields/PasswordInput';
import ConfirmPasswordInput from './formFields/ConfirmPasswordInput';
import NameInput from './formFields/NameInput';
import EmailInput from './formFields/EmailInput';
import PhoneInput from './formFields/PhoneInput';
import AddressInput from './formFields/AddressInput';
import BirthInput from './formFields/BirthInput';
import GenderInput from './formFields/GenderInput';
import NicknameInput from './formFields/NicknameInput';

const SignupForm = () => 
{
    const { setCurrentStep, marketingPreferences } = useSignupContext();
    const { sendEmail, sendMessage } = marketingPreferences;
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: { areaCode: '', middle: '', last: '' },
        address: '',
        birth: '',
        gender: '',
        nickname: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const goToNextStep = () => 
    {
        setCurrentStep(3);
    };

    const handleChange = (e) => 
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddressSelect = (addressData) => 
    {
        setFormData(
            {
            ...formData,
            address: `[${addressData.zipCode}] ${addressData.roadAddress} ${addressData.detailAddress} (${addressData.extraAddr})`,
        });
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

        const phoneNumber = `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`;
        const dataToSend = { ...formData, phone: phoneNumber };

        try {
            const response = await fetch('http://localhost:8080/signup', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        return <div className="success-message">회원가입 완료</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="signup-form">
                <h3 className='subtitle'>정보입력</h3>
                <hr className='line' />
                <IdInput value={formData.id} onChange={handleChange} />
                <PasswordInput value={formData.password} onChange={handleChange} />
                <ConfirmPasswordInput value={formData.confirmPassword} onChange={handleChange} />
                <NameInput value={formData.name} onChange={handleChange} />
                <EmailInput value={formData.email} onChange={handleChange} />
                <PhoneInput phone={formData.phone} setFormData={setFormData} formData={formData} />
                <AddressInput onAddressSelect={handleAddressSelect} />
                {/* DB에 저장되는 주소 양식 확인용, 주석 상태로 유지하고 필요할 때만 사용할 것 */}
                {/* <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly
                    style={{ width: "400px" }}
                /> */}
                <BirthInput value={formData.birth} onChange={handleChange} />
                <GenderInput value={formData.gender} onChange={handleChange} />
                <NicknameInput value={formData.nickname} onChange={handleChange} />
                {error && <p className="error-message">{error}</p>}
                <div className="button-wrapper">
                    <button type="submit" onClick={goToNextStep} className="signup-button">가입하기</button>
                </div>
            </form>
            {/* 홍보 및 마케팅 용도의 이메일, SMS 수신 여부 useContext 확인용, 주석 상태로 유지하고 필요할 때만 사용할 것 */}
            {/* <div>
                <ul>
                    <li>이메일 수신: {sendEmail ? "동의함" : "동의하지 않음"}</li>
                    <li>SMS 수신: {sendMessage ? "동의함" : "동의하지 않음"}</li>
                </ul>
            </div> */}
        </div>
    );
};

export default SignupForm;