/*
* mypage/mynotice 경로에서 내 글 페이지에 들어가면 [ 즐겨찾기 | 내 정보 | 내 글 ] 목록이 숨겨지고
* [ 경매품 | 1 : 1 문의 ] 텍스트만 보임
* 경매품 텍스트를 클릭하면 경매품 신청(/requestitem) 에서
* '/mypage/mynotice/auction' 경로인가
* '/mypage/auction' 경로인가
* 아닌가 뭔가 맞는 게 있는건가 으악
* */



import { NavLink, Outlet } from "react-router-dom";

const MyNoticeLayout = () => {
    

    return (
        <div className="mynotice-layout">
            <aside className="mynotice-sidebar">
                <div className="sidebar-title">내 글 레이아웃</div>
                <ul>
                    <li>
                        <NavLink to="/mypage/auction" activeClassName="active-link">경매품</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/inquiry" activeClassName="active-link">1 : 1 문의</NavLink>
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