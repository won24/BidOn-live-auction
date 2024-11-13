// 각 섹션(내 정보, 내 글, 즐겨찾기, 참여한 경매) 을 컴포넌트로 분리

/*
* selectSection 은 사용자가 선택한 섹션을 저장하며, 선택한 섹션에 따라 다른 컴포넌트르 표시함
*
* selectComponents 객체는 각 섹션의 키와 컴포넌트를 연결하여 selectedSection 의 값에 따라 해당 컴포넌트를 표시함
*
* 각 버튼에 클릭 이벤트 핸들러를 적용해 사용자가 섹션을 선택할 때마다 selectedSection 의 값이 업데이트 되게 함
*
* section-content div 는 selectedSection 에 맞는 컴포넌트를 동적으로 렌더링하여 해당 섹션의 내용 표시함
* */

import React, {useState} from "react";

import MyFar from "./MyFar";
import MyProfile from "./MyProfile";
import MyNotice from "./MyNotice";


const Mypage = () => {

    // 사용자가 선택한 섹션을 상태로 관리(초기값 : null)
    const [selectedSection, setSelectSection] = useState(null);

    // 각 섹션에 해당하는 컴포넌트를 매핑하는 객체
    const sectionComponents = {
        MyFar: <MyFar/>,          // 즐겨찾기 컴포넌트
        MyProfile: <MyProfile/>,  // 내 정보 컴포넌트
        MyNotice: <MyNotice/>,    // 내 글 컴포넌트

    };

    return(
        <div className="Mypage">
            <h1>마이페이지</h1>
            <button onClick={() => setSelectSection("MyFar")}>즐겨찾기</button>
            <button onClick={() => setSelectSection("MyProfile")}>내 정보</button>
            <button onClick={() => setSelectSection("MyNotice")}>내 글</button>

            {/* 선택된 섹션에 따라 해당 컴포넌트를 표시하는 컨테이너 */}
            <div className="section-contet">
                {sectionComponents[selectedSection]}  {/* 선택된 섹션 컴포넌트를 렌더링 */}
            </div>
        </div>
    )
}
export default Mypage;
