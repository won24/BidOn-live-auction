import {NavLink, useLocation, useNavigate} from "react-router-dom";
import '../../css/NavigationBar.css'
import {useEffect} from "react";
import { useLogin } from "../../pages/login/LoginContext";

const Nav = () =>
{
    const id = sessionStorage.getItem("id");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;

    const { user, fetchUserData } = useLogin();

    useEffect(() => 
    {
        if (isLoggedIn && id) 
        {
            fetchUserData(id);
        }
    }, [isLoggedIn, id, fetchUserData]);

    const openCheckoutPopup = () => {
        const url = `${window.location.origin}/checkout`;
        const popupFeatures = "width=600,height=600,scrollbars=yes,resizable=yes";
        window.open(url, "결제하기", popupFeatures);
    };
    
    // 충전된 캐시 새로고침(전체 새로고침 아님)
    // const refresh = () => 
    // {
    //     if (id) 
    //     {
    //         fetchUserData(id);
    //     }
    // };
    

    const handleLogout = () => 
    {
        sessionStorage.clear();
        navigate(current, { replace: true });
    };

    return(
            <div className="navContainer">
                <a href="/" className="logo">로고자리</a>
                <div className="menuContainer">
                    <NavLink to="/live">라이브</NavLink>
                    <NavLink to="/auction">경매품</NavLink>
                    <NavLink to="/requestitem">경매품신청</NavLink>
                    <NavLink to="/customer/faq">고객센터</NavLink>
                </div>
                    {isLoggedIn ? (
                        <div>
                            <div style={{ marginBottom: "3px" }}>
                                <span className="user-welcome">
                                    {/* {userCode} */}
                                    {user?.isAdmin ? "[관리자] " : ""}{user?.nickname}님, 환영합니다.
                                    <button className="login-button2"
                                            onClick={() => navigate("/admin")}>관리자페이지</button>
                                </span>
                                <button className="login-button2" onClick={() => navigate("/mypage/myprofile")}>마이페이지</button>
                                <button className="login-button2" onClick={handleLogout}>로그아웃</button>
                            </div>

                            <div>
                                <span className="user-welcome">
                                    충전된 캐시: {user?.cash} 캐시
                                </span>
                                {/* 코드 고치면서 충전 즉시 반영되게 변경 */}
                                {/* <button className="login-button2" onClick={refresh}>새로고침</button> */}
                                <button className="login-button2" onClick={openCheckoutPopup}>충전하기</button>
                            </div>
                        </div>
                ) : (
                    <button className="login-button2" onClick={() => navigate("/member/login")}>로그인</button>
                )}
            </div>
    )
}

export default Nav;
