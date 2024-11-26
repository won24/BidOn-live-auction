/**
 * LoginContext.js
 * 
 * 현재 로그인한 계정의 정보 제공
 * 필요한 만큼 갖다 쓰세요.
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
        }
    }, []);

    // Function to update the user in both session storage and state
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

// Custom hook for consuming the context
export const useLogin = () => 
{
    const context = useContext(LoginContext);
    if (!context) 
    {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};
