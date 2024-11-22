/**
 * SignupContext.js
 * 
 * Nov 12,
 * [선택] 홍보 및 마케팅 목적의 정보 수신 항목에 대한 동의 여부를 다음 페이지로 전달
 * 
 * Nov 13,
 * 회원가입 진행에 따른 진행도 제어 추가
 * 
 * Nov 14,
 * 뒤로가기 등의 작업 수행 시 진행도 초기화
 */

import { createContext, useState, useContext, useEffect } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => 
{
    const [marketingPreferences, setMarketingPreferences] = useState({ sendEmail: false, sendMessage: false });
    const [currentStep, setCurrentStep] = useState(1); // Initial step

    useEffect(() => 
    {
        // Listen for back navigation
        const handlePopState = () => 
        {
            // Reset currentStep to 1 when navigating back
            setCurrentStep(1);
        };

        window.addEventListener('popstate', handlePopState);
        
        // Clean up the event listener on unmount
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <SignupContext.Provider value={{ currentStep, setCurrentStep, marketingPreferences, setMarketingPreferences }}>
            {children}
        </SignupContext.Provider>
    );
};

export const useSignupContext = () => useContext(SignupContext);
