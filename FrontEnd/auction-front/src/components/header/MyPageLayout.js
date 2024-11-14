import {NavLink, Outlet} from "react-router-dom";


const MyPageLayout = () => {

    return (
        <div className="mypage-layout">
            <h1>마이페이지</h1>
            <aside className="mypage-sidebar">
                <div className="sidebar-title"></div>
                <ul>
                    <li>
                        <NavLink to="/mypage/myfar" activeClassName="active-link">즐겨찾기</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/myprofile" activeClassName="active-link">내 정보</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/mynotice" activeClassName="active-link">내 글</NavLink>
                    </li>
                </ul>
            </aside>
            <main className="mypage">
                <Outlet/>
            </main>
        </div>
    );
};

export default MyPageLayout;
