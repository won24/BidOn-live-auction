/**
 * Login.js
 * react-cookie 모듈 사용 (npm install 후 사용 가능)
 * 
 * 아이디와 비밀번호를 입력하고 로그인 버튼을 누를 시 DB와 일치하는지 확인한 후
 * 일치할 경우 이전 페이지로 이동 (완료)
 * 
 * 회원가입, 아이디/비밀번호 찾기 버튼 클릭 시 해당 페이지로 이동 (일부 구현)
 * 
 * 쿠키를 이용한 아이디 저장 기능 구현 (완료)
 */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import ReactModal from "react-modal";
import FindId from "../find/FindId";

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
    const [modalSwitch, setModalSwitch] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");

    // Load cookie on initial render if `loginForm.id` is empty
    useEffect(() => 
    {
        if (!loginForm.id && cookies.rememberUserId) 
        {
            setLoginForm((prevForm) => ({ ...prevForm, id: cookies.rememberUserId }));
            setIsRemember(true);
        }
    }, [cookies.rememberUserId]);

    const toggleModal = () => 
    {
        setModalSwitch((prev) => !prev);
    };

    const handleOnChange = (e) => 
    {
        const isChecked = e.target.checked;
        setIsRemember(isChecked);
        if (isChecked) 
        {
            setCookie("rememberUserId", loginForm.id, { maxAge: 2592000 }); // 30 days
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
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", 
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
                const contentType = response.headers.get("Content-Type");
                let responseData;
    
                if (contentType && contentType.includes("application/json")) 
                {
                    responseData = await response.json();
                    // 백엔드에서 넘어오는 데이터 확인
                    // console.log("Response JSON:", responseData);
                } 
                else 
                {
                    throw new Error("Unexpected response format.");
                }
    
                // Store relevant details in sessionStorage
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("userId", loginForm.id);
                sessionStorage.setItem("userCode", responseData.userCode); // Store userCode
                sessionStorage.setItem("isAdmin", responseData.isAdmin);  // Store isAdmin flag
                sessionStorage.setItem("userNickname", responseData.nickname);
                setIsLoggedIn(true);
                navigate(-1); // Navigate to the previous page
            } 
            else 
            {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            // console.error("Error logging in:", error);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    // 로그인 된 상태에서는 로그인 페이지 진입 불가능
    if(isLoggedIn)
    {
        navigate(-1);
    }

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
                                // onClick={() => navigate(-1)}
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
                    </form>
                {!isLoggedIn && (
                    <>
                        <span className="description">아직 회원이 아니신가요?</span>
                        <div className="login-button-wrapper">
                            <button className="login-button2" onClick={() => navigate("/member/signup")}>
                                회원가입
                            </button>
                        </div>
                        <span className="description">아이디나 비밀번호를 잊어버리셨나요?</span>
                        <div className="login-button-wrapper">
                            <button className="login-button2" onClick={toggleModal}>
                                아이디/비밀번호 찾기(미구현)
                                {/* <ReactModal
                                    isOpen={modalSwitch}
                                    ariaHideApp={false}
                                    onRequestClose={toggleModal}
                                >
                                    <FindId />
                                </ReactModal> */}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;