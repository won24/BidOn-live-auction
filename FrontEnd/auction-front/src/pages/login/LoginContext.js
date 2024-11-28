/**
 * LoginContext.js
 * 
 * 현재 로그인한 계정의 정보 제공
 * 1) sessionStorage.getItem("컬럼명");
 * 2) useLogin();
 * 두 가지 방식 모두 유효함
 */

import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

const parseSessionUserData = () => 
{
    const userData = {};
    Object.keys(sessionStorage).forEach((key) => 
    {
        userData[key] = sessionStorage.getItem(key);
    });

    return {
        ...userData,
        isLoggedIn: userData.isLoggedIn === "true",
        isAdmin: userData.isAdmin === "true",
        isAdult: userData.isAdult === "true",
        sendEmail: userData.sendEmail === "true",
        sendMessage: userData.sendMessage === "true",
        cash: parseInt(userData.userCash, 10) || 0,
        userCode: parseInt(userData.userCode, 10) || 0,
        birth: userData.birth
        ? new Date(userData.birth.replace(" ", "T")) 
        : null,
        isSuspended: userData.isSuspended 
            ? new Date(Date(userData.isSuspended[0], userData.isSuspended[1], userData.isSuspended[2], userData.isSuspended[3], userData.isSuspended[4], userData.isSuspended[5])) 
            : null
    };
};

export const LoginProvider = ({ children }) => 
{
    const [user, setUser] = useState(null);

    useEffect(() => 
    {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) 
        {
            const parsedUserData = parseSessionUserData();
            setUser(parsedUserData);
            console.log(parsedUserData);
        }
    }, []);

    const updateUser = (updatedData) => 
    {
        const updatedUser = { ...user, ...updatedData };
        Object.entries(updatedData).forEach(([key, value]) => 
        {
            sessionStorage.setItem(key, value);
        });
        setUser(updatedUser);
    };

    return (
        <LoginContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => 
{
    const context = useContext(LoginContext);
    if (!context) 
    {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};
