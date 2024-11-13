// 내 정보 (/mypage/myprofile)

import React from "react";
import {useState} from "react";

import './MyPage.css';

const MyProfile = () => {

    // 로그인한 사용자 정보
    const [userInfo] = useState({
        id: "user01",
        password: "pass01",
        phone: "010-8282-8282",
        address: "서울특별시 강남구 테헤란로 123"
    });

    return (
        <div className="page-container">
            <div className="content-container">
            <h2>내 정보</h2>
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