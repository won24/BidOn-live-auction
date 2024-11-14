/**
 * SignupContext.js
 * 
 * Nov 12,
 * [선택] 홍보 및 마케팅 목적의 정보 수신 항목에 대한 동의 여부를 다음 페이지로 전달
 * 
 * Nov 13,
 * 회원가입 진행에 따른 진행도 제어 추가
 */
import { createContext, useState, useContext } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => 
{
    const [marketingPreferences, setMarketingPreferences] = useState({ sendEmail: false, sendMessage: false });
    const [currentStep, setCurrentStep] = useState(1); // Initial step

    return (
        <SignupContext.Provider value={{ currentStep, setCurrentStep, marketingPreferences, setMarketingPreferences }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignupContext = () => useContext(SignupContext);