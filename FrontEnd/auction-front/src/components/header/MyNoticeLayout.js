// 사실상 필요없는 클래스 ...

import { NavLink, Outlet } from "react-router-dom";

const MyNoticeLayout = () => {
    

    return (
        <div className="mynotice-layout">
            <aside className="mynotice-sidebar">
                <div className="sidebar-title">내 글 레이아웃</div>
                <ul>
                    <li>
                        <NavLink to="/mypage/auction" activeclassname="active-link">경매품</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/inquiry" activeclassname="active-link">1 : 1 문의</NavLink>
                    </li>
                </ul>
            </aside>
            <main className="mynotice">
                <Outlet/>
            </main>
        </div>
    )
}

export default MyNoticeLayout();