import {NavLink} from "react-router-dom";
import Main from "../../pages/main/Main";
import './NavigationBar.css'


const Nav = () =>{


    return(
        <>
            <div className="navContainer">
                <a href="/" className="logo">로고자리</a>
                <div className="menuContainer">
                    <NavLink to="/live">라이브</NavLink>
                    <NavLink to="/auction">경매품</NavLink>
                    <NavLink to="/mypage">마이페이지</NavLink>
                    <NavLink to="/requestitem">경매품신청</NavLink>
                    <NavLink to="/customer">고객센터</NavLink>
                </div>
                    <NavLink to="/login" className="login">| 로그인 |</NavLink>
            </div>
        </>
    )
}
export default Nav;