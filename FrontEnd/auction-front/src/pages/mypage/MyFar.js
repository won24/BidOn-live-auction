// 즐겨찾기 (/mypage/myfar)

import React from "react";

const MyFar = () => {
    const fars = [
        { id: 1, name: "즐겨찾기 항목 1" },
        { id: 2, name: "즐겨찾기 항목 2" },
    ];

    return (
        <div className="fars">
            <h2>즐겨찾기</h2>
            <ul>
                {fars.map((far) => (
                    <li key={far.id}>{far.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyFar;