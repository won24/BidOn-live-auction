// 즐겨찾기 (/mypage/myfar)

import React, {useState} from "react";

const MyFar = () => {

    // 즐겨찾기 항목 목록
    const [favorites, setFavorites] = useState([]);

    // 즐겨찾기에 항목 추가하는 함수
    // addFavorite : 사용자가 클릭한 항목을 즐겨찾기 목록에 추가함. 새로운 항목은 이전 목록 뒤에 추가됨.
    const addFavorite = (item) => {
        setFavorites((prevFavorites) => [...prevFavorites, item]);
    };

    // 즐겨찾기에서 항목 제거하는 함수
    // removeFavorite : 사용자가 제거 버튼을 클릭했을 때 해당 항목을 목록에서 제거.
    // 우선 목록 제거는 버튼 클릭 방식으로 구현 (추후 별 표시 해제 시 제거하는 것으로 구현 예정)
    const removeFavorite = (item) => {
        setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite !== item)
        );
    };


    return (
        <div>
            <h2>즐겨찾기</h2>

            {/* 항목 추가 */}
            <button onClick={() => addFavorite()}>목록 추가</button>
            <button onClick={() => addFavorite()}>목록 추가</button>
            <button onClick={() => addFavorite()}>목록 추가</button>

            {/* 즐겨찾기 목록 표시 */}
            <ul>
                {favorites.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeFavorite(item)}>제거</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyFar;