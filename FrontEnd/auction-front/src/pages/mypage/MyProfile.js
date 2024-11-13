// 내 정보 (/mypage/myprofile)

/*
* MyProfile 컴포넌트는 useState 를 사용하여 로그인한 사용자 정보를 설정하고 이를 렌더링 함
*
* 비밀번호는 직접 표시하지 않고 '******' 로 숨겨 보안 처리 함
*
* page-container 와 content-container 는 CSS 로 전체 페이지, 내용 중앙 정렬함
* */

import React from "react";
import {useState} from "react";

import './MyPage.css';

const MyProfile = () => {

    // 로그인한 사용자 정보를 useState 훅으로 설정(상태를 한 번만 설정하므로 업데이트는 X)
    const [userInfo] = useState({
        id: "user01",            // 사용자 아이디
        password: "pass01",      // 사용자 비밀번호 (실제 비밀번호는 숨김 처리할 예정)
        phone: "010-8282-8282",  // 사용자 전화번호
        address: "서울특별시 강남구 테헤란로 123"  // 사용자 주소
    });

    return (
        // 전체 페이지 컨테이너에 대한 div (증앙 정렬 및 페이지 스타일링에 사용)
        <div className="page-container">
            {/* 내 정보 페이지 콘텐츠 컨테이너 */}
            <div className="content-container">
            <h2>내 정보</h2>
                {/* 사용자 정보 목록을 포함한 div */}
                <div className="user-info">
                    <ul>
                        <li><strong>아이디 : </strong>{userInfo.id}</li>
                        <li><strong>비밀번호 : </strong > ****** </li>
                        <li><strong>휴대전화 : </strong>{userInfo.phone}</li>
                        <li><strong>주소 : </strong>{userInfo.address}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;