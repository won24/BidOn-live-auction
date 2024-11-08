import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => 
{
    const navigate = useNavigate();

    const toSignup = () => 
    {
        navigate("/signup1");
    }

    const [loginForm, setLoginForm] = useState(
    {
        userId: "",
        userPassword: "",
    });
      
    /* 아이디 기억하기 */
    const [isRemember, setIsRemember] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
    
    // Load cookie on initial render if `loginForm.userId` is empty
    useEffect(() => 
    {
        if (!loginForm.userId && cookies.rememberUserId) 
        {
            setLoginForm((prevForm) => ({ ...prevForm, userId: cookies.rememberUserId }));
            setIsRemember(true);
        }
    }, [cookies.rememberUserId]);  // Dependency on cookie to ensure it updates when cookie changes

    const handleOnChange = (e) => 
    {
        // Toggle checkbox state
        setIsRemember(e.target.checked);
        if (e.target.checked) 
        {
            // Save userId in cookie with 30-day expiration
            setCookie("rememberUserId", loginForm.userId, { maxAge: 2592000 });
        }
        else
        {
            // Remove cookie if unchecked
            removeCookie("rememberUserId");
        }
    };

    const handleInputChange = (e) => 
    {
        const { name, value } = e.target;
        setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));

        // Update cookie when `isRemember` is true
        if (name === "userId" && isRemember) 
        {
            setCookie("rememberUserId", value, { maxAge: 2592000 });
        }
    };

    return (
        <>
            <h1>로그인</h1>
            <div className="login-div">
                <form className="login-group" id="loginForm" method="post">
                    <div className="item">
                        <input 
                            type="text" 
                            name="userId" 
                            id="usrId" 
                            className="form-control" 
                            placeholder="아이디" 
                            value={loginForm.userId} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <input 
                            type="password" 
                            id="password" 
                            name="userPassword" 
                            className="form-control" 
                            placeholder="비밀번호" 
                            value={loginForm.userPassword} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="check-item">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="saveId" 
                            onChange={handleOnChange} 
                            checked={isRemember}
                        />
                        <label htmlFor="saveId">아이디 저장</label>
                    </div>
                    <div className="btn-item">
                        <button type="submit" className="login-btn">로그인</button>
                    </div>
                </form>
            </div>
            <div className="btn-item">
                <button className="signup-btn" onClick={toSignup}>회원가입</button>
            </div>
            <div className="btn-item">
                <button type="submit" className="find-my-idpw-btn">아이디/비밀번호 찾기</button>
            </div>
        </>
    );
}

export default Login;
