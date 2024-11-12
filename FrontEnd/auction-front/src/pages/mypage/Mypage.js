// 각 섹션(내 정보, 내 글, 즐겨찾기, 참여한 경매) 을 컴포넌트로 분리

import React, {useState} from "react";

import MyFar from "./MyFar";
import MyProfile from "./MyProfile";
import MyNotice from "./MyNotice";


const Mypage = () => {

    const [selectedSection, setSelectSection] = useState(null);

    const sectionComponents = {
        MyFar: <MyFar/>,
        MyProfile: <MyProfile/>,
        MyNotice: <MyNotice/>,

    };

    return(
        <div className="Mypage">
            <h1>마이페이지</h1>
            <button onClick={() => setSelectSection("MyFar")}>즐겨찾기</button>
            <button onClick={() => setSelectSection("MyProfile")}>내 정보</button>
            <button onClick={() => setSelectSection("MyNotice")}>내 글</button>


            <div className="section-contet">
                {sectionComponents[selectedSection]}
            </div>
        </div>
    )
}
export default Mypage;
