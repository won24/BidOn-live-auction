/**
 * Signup2.js -> SignupForm.js
 * - 회원가입 과정 중 회원 정보 입력 부분을 담당
 * 
 * Nov 13,
 * Signup1(가칭)에서 '다음으로' 버튼 클릭 시,
 * 1) 버튼이 있던 위치에 생성되며, (완료)
 * 2) 각 <label>에 해당하는 요소를 입력 받을 수 있는 <form> 표시 (완료)
 * 3) useRef 이용, <form>의 전체적인 모습이 한 화면에 담기도록 자동 스크롤 (완료)
 * 
 * <form> 내 각 <input>의 대략적인 요구사항은 아래와 같음
 * 1) <input> 우측에 dynamic 메시지를 통해 시스템이 요구하는 값 표시 (완료)
 * 2) 우측의 <button>을 통한 <input>과의 상호작용 (미구현)
 * 
 * Nov 15,
 * 효율적인 유지보수를 위해 formFields 폴더 생성 후 <label> 별로 파일 분리 
 */
import { useState } from 'react';
import "../../css/SignupForm.css";
import { useSignupContext } from "./SignupContext";
import IdInput from './formFields/IdInput';
import PasswordInput from './formFields/PasswordInput';
import ConfirmPasswordInput from './formFields/ConfirmPasswordInput';
import NameInput from './formFields/NameInput';
import NicknameInput from './formFields/NicknameInput';
import BirthInput from './formFields/BirthInput';
import EmailInput from './formFields/EmailInput';
import PhoneInput from './formFields/PhoneInput';
import AddressInput from './formFields/AddressInput';
// import GenderInput from './formFields/GenderInput';

const SignupForm = () => 
{
    const { setCurrentStep, marketingPreferences } = useSignupContext();
    const { sendEmail, sendMessage } = marketingPreferences;
    const [formData, setFormData] = useState(
    {
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: { areaCode: '', middle: '', last: '' },
        address: '',
        birth: '',
        // gender: '',
        nickname: '',
    });
    const [success, setSuccess] = useState(false);

    const goToNextStep = () => 
    {
        if(success)
        {
            setCurrentStep(3);
        }
    };

    const handleChange = (e) => 
    {
        if (!e || !e.target)
        {
            return;
        }
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    
        const phoneNumber = `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`;
        const dataToSend = 
        { 
            ...formData, 
            phone: phoneNumber, 
            marketingPreferences: 
            {
                sendEmail,
                sendMessage,
            },
        };
    
        try {
            const response = await fetch('http://localhost:8080/signup', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) 
            {
                setSuccess(true);
            }
        } catch (err) {
            console.error("DB에 데이터를 저장하는 데 실패했을 때 F12 콘솔에 띄울 에러 메시지", err);
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
                <span className="message">타인의 명의를 도용할 경우 관련 법에 따라 처벌을 받을 수 있으며, 당사는 이에 대해 어떠한 책임도 지지 않습니다.</span>
                <IdInput value={formData.id} onChange={handleChange} />
                <PasswordInput value={formData.password} onChange={handleChange} />
                <ConfirmPasswordInput 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    password={formData.password} 
                />
                <NameInput value={formData.name} onChange={handleChange} />
                <NicknameInput value={formData.nickname} onChange={handleChange} />
                <BirthInput value={formData.birth} onChange={handleChange} />
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
                {/* <GenderInput value={formData.gender} onChange={handleChange} /> */}
                <div className="button-wrapper">
                    <button type="submit" onClick={goToNextStep} className="auth-link">가입하기</button>
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