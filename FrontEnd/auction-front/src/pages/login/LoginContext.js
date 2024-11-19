/**
 * LoginContext.js
 * 
 * 현재 로그인한 계정의 아이디 제공
 * 필요한 만큼 갖다 쓰세요.
 */
import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => 
{
    const [user, setUser] = useState(null);

    useEffect(() => 
    {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) 
        {
            setUser(
            {
                userId: sessionStorage.getItem("userId"),
                userCode: sessionStorage.getItem("userCode"),
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
