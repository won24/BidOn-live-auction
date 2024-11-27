import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../css/NavigationBar.css";
import { useLogin } from "../../pages/login/LoginContext";

const Nav = () => 
{
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;

    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    const cash = sessionStorage.getItem("cash");
    const nickname = sessionStorage.getItem("nickname");
    const id = sessionStorage.getItem("id");

    const { user, setUser } = useLogin();

    const openCheckoutPopup = () => {
        const url = `${window.location.origin}/checkout`;
        const popupFeatures = "width=600,height=600,scrollbars=yes,resizable=yes";
        window.open(url, "결제하기", popupFeatures);
    };

    const handleLogout = () => 
    {
        if(window.confirm("로그아웃 하시겠습니까?"))
        {
            sessionStorage.clear();
            localStorage.clear();
            setUser(null);
            // navigate(current, { replace: true });
            navigate(0);
        }
        else return;
    };

    const updateCash = async () => 
    {
        if (!id) return;
    
        try {
            const response = await fetch(`http://localhost:8080/api/id/${id}`);
            if (response.ok) 
            {
                const userData = await response.json(); // Assuming the API returns the full user object
                const updatedCash = userData.cash; // Extract the `cash` field
                sessionStorage.setItem("cash", updatedCash); // Update sessionStorage
                setUser((prev) => ({ ...prev, cash: updatedCash })); // Update context with only the cash value
            } 
            else 
            {
                console.error("Failed to fetch updated cash.");
            }
        } catch (error) {
            console.error("Error fetching updated cash:", error);
        }
    };

    const truncateNickname = (nickname, maxLength) => 
    {
        if (nickname && nickname.length > maxLength) 
        {
            return nickname.substring(0, maxLength) + "...";
        }
        return nickname;
    };

    return (
        <div className="navContainer">
            <a href="/" className="logo"></a>
            <div className="menuContainer">
                <NavLink to="/live" className="nav-link">
                    라이브
                </NavLink>
                <NavLink to="/auction" className="nav-link">
                    경매품
                </NavLink>
                <NavLink to="/requestitem" className="nav-link">
                    경매품신청
                </NavLink>
                <NavLink to="/customer/faq" className="nav-link">
                    고객센터
                </NavLink>
                {isLoggedIn && isAdmin ? (
                    <NavLink to="/admin" className="nav-link">
                        관리자페이지
                    </NavLink>
                ) : (
                    <NavLink to="/mypage/myprofile" className="nav-link">
                        마이페이지
                    </NavLink>
                )}
            </div>
            {isLoggedIn ? (
                <div>
                    <div style={{ marginBottom: "3px" }}>
                        <span className="user-welcome">
                            {isAdmin ? "[관리자] " : ""}
                            {truncateNickname(nickname, 50)}님, 환영합니다.
                        </span>
                        <button className="login-button2" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                    {!isAdmin && (
                        <div className="user-info-container">
                            <span className="user-welcome">
                                충전된 캐시: {user?.cash || cash} 캐시
                            </span>
                            <button className="login-button2" onClick={updateCash}>
                                새로고침
                            </button>
                            <button className="login-button2" onClick={openCheckoutPopup}>
                                충전하기
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className="login-button2"
                    onClick={() => navigate("/member/login")}
                >
                    로그인
                </button>
            )}
        </div>
    );
};

export default Nav;
