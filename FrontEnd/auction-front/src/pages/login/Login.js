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

const Login = () => 
{
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState(
    {
        id: "",
        password: "",
    });
    const [isRemember, setIsRemember] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
    const [errorMessage, setErrorMessage] = useState("");

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

        if (name === "id" && isRemember) 
        {
            setCookie("rememberUserId", value, { maxAge: 2592000 });
        }
    };

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/login", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm),
            });

            if (response.ok) 
            {
                const data = await response.json();
                // Redirect or save authentication token
                navigate("/dashboard"); // Example redirection
            } 
            else 
            {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "로그인에 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <div className="login-form">
            <div className="login-div">
                <h3 className="subtitle">로그인</h3>
                <hr className="line" />
                <span className="message">로그인 후 이용해주세요.</span>
                <form className="login-group" id="loginForm" method="post" onSubmit={handleSubmit}>
                    <div className="item">
                        <div className="inputs-wrapper">
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
                        <button 
                            type="submit" 
                            className="login-button" 
                            disabled={!loginForm.id || !loginForm.password}
                        >
                            로그인
                        </button>
                    </div>
                    <label htmlFor="saveId" className="check-item">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="saveId"
                            onChange={handleOnChange}
                            checked={isRemember}
                        />
                        <span>아이디 저장</span>
                    </label>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
                <span className="description">회원가입 안내 메시지</span>
                <div className="login-button-wrapper">
                    <button className="login-button2" onClick={() => navigate("/member/signup")}>
                        회원가입
                    </button>
                </div>
                <span className="description">아이디/비밀번호 찾기 안내 메시지</span>
                <div className="login-button-wrapper">
                    <button className="login-button2">
                        아이디/비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
 