/**
 * Login.js
 * react-cookie 모듈 사용 (npm install 후 사용 가능)
 * 
 * 아이디와 비밀번호를 입력하고 로그인 버튼을 누를 시 DB와 일치하는지 확인한 후
 * 일치할 경우 메인페이지로 이동 (미구현)
 * 
 * 회원가입, 아이디/비밀번호 찾기 버튼 클릭 시 해당 페이지로 이동 (일부 구현)
 * 
 * 쿠키를 이용한 아이디 저장 기능 구현 (완료)
 */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

const Login = () => {
    const navigate = useNavigate();

    const goToSignup = () => navigate("/member/signup");

    const [loginForm, setLoginForm] = useState(
    {
        id: "",
        password: "",
    });

    const [isRemember, setIsRemember] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);

    // Load cookie on initial render if `loginForm.id` is empty
    useEffect(() => 
    {
        if (!loginForm.id && cookies.rememberUserId) 
        {
            setLoginForm((prevForm) => ({ ...prevForm, id: cookies.rememberUserId }));
            setIsRemember(true);
        }
    }, [cookies.rememberUserId]);

    const handleOnChange = (e) => 
    {
        const isChecked = e.target.checked;
        setIsRemember(isChecked);
        if (isChecked) 
        {
            setCookie("rememberUserId", loginForm.id, { maxAge: 2592000 });
        }
        else 
        {
            removeCookie("rememberUserId");
        }
    };

    const handleInputChange = (e) => 
    {
        const { name, value } = e.target;
        setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));

        // Update cookie when `isRemember` is true
        if (name === "id" && isRemember) 
        {
            setCookie("rememberUserId", value, { maxAge: 2592000 });
        }
    };

    return (
        <div className="login-form">
            <div className="login-div">
                <h3 className="subtitle">로그인</h3>
                <hr className="line" />
                <span className="message">로그인 후 이용해주세요.</span>
                <form className="login-group" id="loginForm" method="post">
                    <div className="item">
                        <input
                            type="text"
                            name="id"
                            id="usrId"
                            className="form-control"
                            placeholder="아이디"
                            value={loginForm.id}
                            onChange={handleInputChange}
                            maxLength={15}
                        />
                    </div>
                    <div className="item">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="비밀번호"
                            value={loginForm.password}
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
                    <div className="login-button-wrapper">
                        <button type="submit" className="login-button">
                            로그인
                        </button>
                    </div>
                </form>
                <div className="login-button-wrapper">
                    <button className="login-button" onClick={goToSignup}>
                        회원가입
                    </button>
                </div>
                <div className="login-button-wrapper">
                    <button className="login-button">
                        아이디/비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;