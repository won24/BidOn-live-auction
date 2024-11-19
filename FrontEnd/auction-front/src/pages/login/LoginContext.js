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

    useEffect(() => 
    {
        // 이런 식으로 선언해서 사용할 것
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) 
        {
            setUser(
            {
                // 사용 가능한 데이터 목록
                userId: sessionStorage.getItem("userId"),
                userCode: sessionStorage.getItem("userCode"),
                userNickname: sessionStorage.getItem("userNickname"),
                isAdmin: sessionStorage.getItem("isAdmin") === "true",
            });
        }
    }, []);

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
