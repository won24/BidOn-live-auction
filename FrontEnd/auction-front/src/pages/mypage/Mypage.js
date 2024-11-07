// 각 섹션(내 정보, 내 글, 즐겨찾기, 참여한 경매) 을 컴포넌트로 분리

import React from "react";

import myFar from "./MyFar";
import myProfile from "./MyProfile";
import myNotice from "./MyNotice";


const Mypage = () => {

    return(
        <div className="Mypage">
            <h1>Mypage</h1>
            <button onClick={myFar}>즐겨찾기</button>
            <button onClick={myProfile}>내 정보</button>
            <button onClick={myNotice}>내 글</button>
            <p>마이페이지 표시 안 됩니다 ㅠ</p>
        </div>
    )
}
export default Mypage;
