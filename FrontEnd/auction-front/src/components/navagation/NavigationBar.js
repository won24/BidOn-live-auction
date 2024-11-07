import {NavLink} from "react-router-dom";


const Nav = () =>{


    return(
        <div>
            <NavLink to="/live">라이브  </NavLink>
            <NavLink to="/auction">경매품  </NavLink>
            <NavLink to="/mypage">마이페이지  </NavLink>
            <NavLink to="/requestitem">경매품신청  </NavLink>
            <NavLink to="/customer">고객센터  </NavLink>
            <NavLink to="/login">로그인  </NavLink>
        </div>
    )
}
export default Nav;