// 각 섹션(내 정보, 내 글, 즐겨찾기, 참여한 경매) 을 컴포넌트로 분리

import React from "react";
import {NavLink} from "react-router-dom";
import MyProfile from "./MyProfile";
import MyNotice from "./MyNotice";
import MyFar from "./MyFar";


const Mypage = () => {

    return(
        <div className="Mypage">
            <h2>Mypage</h2>
            <p>마이페이지가 잘 표시됩니다.</p>
            <NavLink to={MyProfile}>내 정보</NavLink>
            <NavLink to={MyNotice}>내 글</NavLink>
            <NavLink to={MyFar}>즐겨찾기</NavLink>
        </div>
    )
}
export default Mypage;