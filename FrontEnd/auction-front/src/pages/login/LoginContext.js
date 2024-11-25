/**
 * LoginContext.js
 * 
 * 현재 로그인한 계정의 정보 제공
 * 필요한 만큼 갖다 쓰세요.
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
                    userCash: data.cash, 
                    ...data,
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
        // const 변수명 = sessionStorage.getItem("컬럼명")의 방식으로 선언해서 사용하고
        // type이 boolean인 컬럼은 아래와 같이 === "true/false"로 필요에 따라 사용할 것
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) 
        {
            // users 테이블에 있는 모든 column을 사용할 수 있도록 변경
            const userData = {};
            Object.keys(sessionStorage).forEach((key) => 
            {
                userData[key] = sessionStorage.getItem(key);
            });

            const parsedUserData = 
            {
                ...userData,
                isAdmin: userData.isAdmin === "true",
                isAdult: userData.isAdult === "true",
                sendEmail: userData.sendEmail === "true",
                sendMessage: userData.sendMessage === "true",
                userCash: parseInt(userData.userCash, 10) || 0,
                userCode: parseInt(userData.userCode, 10) || 0,
            };

            setUser(parsedUserData);

            if (parsedUserData.userId) 
            {
                fetchUserData(parsedUserData.userId);
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
