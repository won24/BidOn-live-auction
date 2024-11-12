import {NavLink} from "react-router-dom";
import './NavigationBar.css'


const Nav = () =>{

    const openCheckoutPopup = () => {
        const url = "/checkout"; // 결제 페이지의 경로
        const popupFeatures = "width=600,height=600,scrollbars=yes,resizable=yes";
        window.open(url, "결제하기", popupFeatures);
    };
    return(
            <div className="navContainer">
                <a href="/" className="logo">로고자리</a>
                <div className="menuContainer">
                    <NavLink to="/live">라이브</NavLink>
                    <NavLink to="/auction">경매품</NavLink>
                    <NavLink to="/mypage">마이페이지</NavLink>
                    <NavLink to="/requestitem">경매품신청</NavLink>
                    <NavLink to="/customer">고객센터</NavLink>
                    <button onClick={openCheckoutPopup}>충전하기</button>
                </div>
                <NavLink to="/login" className="login">| 로그인 |</NavLink>
            </div>
    )
}
export default Nav;