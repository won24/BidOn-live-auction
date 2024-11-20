import {NavLink, useNavigate} from "react-router-dom";
import './NavigationBar.css'


const Nav = () =>
{
    const username = sessionStorage.getItem("userId");
    const userCode = sessionStorage.getItem("userCode");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const navigate = useNavigate();

    const openCheckoutPopup = () => 
    {
        const url = `${window.location.origin}/checkout`;
        const popupFeatures = "width=600,height=600,scrollbars=yes,resizable=yes";
        window.open(url, "결제하기", popupFeatures);
    };
    

    const handleLogout = () => 
    {
        sessionStorage.clear(); // Clear all session storage
        navigate("/");
    };

    return(
            <div className="navContainer">
                <a href="/" className="logo">로고자리</a>
                <div className="menuContainer">
                    <NavLink to="/live">라이브</NavLink>
                    <NavLink to="/auction">경매품</NavLink>
                    <NavLink to="/mypage">마이페이지</NavLink>
                    <NavLink to="/requestitem">경매품신청</NavLink>
                    <NavLink to="/customer/faq">고객센터</NavLink>
                </div>
                    {isLoggedIn ? (
                        <div>
                            <span className="user-welcome">
                                {/* {userCode} */}
                                {isAdmin ? "[관리자] " : ""}{username}님, 환영합니다.
                            </span>
                            <button className="login-button2" onClick={handleLogout}>
                                로그아웃
                            </button>
                            <button onClick={openCheckoutPopup}>충전하기</button>
                        </div>
                ) : (
                    <button className="login-button2" onClick={() => navigate("/member/login")}>로그인</button>
                )}
            </div>
    )
}
export default Nav;