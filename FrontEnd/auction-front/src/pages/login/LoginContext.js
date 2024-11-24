/**
 * LoginContext.js
 * 
 * 현재 로그인한 계정의 정보 제공
 */

import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => 
{
    const [user, setUser] = useState(null);

    const fetchUserData = async (userId) => 
    {
        try {
            const response = await fetch(`http://localhost:8080/api/id/${userId}`);
            if (response.ok) 
            {
                const data = await response.json();
                setUser((prevUser) => (
                {
                    ...prevUser,
                    userCash: data.cash, // Update cash
                    ...data, // Merge other user properties
                }));
            } 
            else 
            {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    useEffect(() => 
    {
        // 대충 이런 식으로 선언해서 사용하면 됨
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) 
        {
            const userData = 
            {
                // 조회할 수 있는 column 목록(패스워드 제외 전체)
                userId: sessionStorage.getItem("userId"),
                userCode: sessionStorage.getItem("userCode"),
                userName: sessionStorage.getItem("userName"),
                userNickname: sessionStorage.getItem("userNickname"),
                userEmail: sessionStorage.getItem("userEmail"),
                userPhone: sessionStorage.getItem("userPhone"),
                userBirth: sessionStorage.getItem("userBirth"),
                userAddress: sessionStorage.getItem("userAddress"),
                userCash: sessionStorage.getItem("userCash"),
                isAdult: sessionStorage.getItem("isAdult"),
                isAdmin: sessionStorage.getItem("isAdmin") === "true",
                isSuspended: sessionStorage.getItem("isSuspended"),
                sendEmail: sessionStorage.getItem("sendEmail"),
                sendMessage: sessionStorage.getItem("sendMessage"),
            };
            setUser(userData);
    
            // Fetch the latest data from the database using userId
            if (userData.userId) 
            {
                fetchUserData(userData.userId);
            }
        }
    }, []);

    return (
        <LoginContext.Provider value={{ user, setUser, fetchUserData }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
