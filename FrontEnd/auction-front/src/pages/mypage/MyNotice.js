// 내가 쓴 글 (/mypage/mynotice)

import React from "react";

const MyNotice = () => {
    const notices = [
        { id: 1, title: "첫 번째 글" },
        { id: 2, title: "두 번째 글" },
        { id: 3, title: "세 번째 글" },
    ];

    return (
        <div className="myNotice">
            <h2>내가 쓴 글</h2>
            <ul>
                {notices.map((notice) => {
                    <li key={notice.id}>{notice.title}</li>
                })}
            </ul>
        </div>
    );
}