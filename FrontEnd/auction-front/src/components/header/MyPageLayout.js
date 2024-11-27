import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import {useState} from "react";
import "../../css/MyPageLayout.css";


const MyPageLayout = () => {


    return (
        <div className="mypage-layout">
            <aside className="mypage-aside">
                <ul>
                    <li><NavLink to="/mypage" activeclassname="active-link"
                                 className="mypage-center-link">마이페이지</NavLink></li>
                    <li><NavLink to="/mypage/myfar" activeclassname="active-link">즐겨찾기</NavLink></li>
                    <li><NavLink to="/mypage/myprofile" activeclassname="active-link">내 정보</NavLink></li>
                    <li><NavLink to="/mypage/myauctionitem" activeclassname="active-link">경매품</NavLink></li>
                    <li><NavLink to="/mypage/myauction" activeclassname="active-link">참여 경매 목록</NavLink></li>
                </ul>
            </aside>
            <div className="outlet-fixsize">
                <Outlet/>
            </div>
        </div>
    )
};

export default MyPageLayout;
