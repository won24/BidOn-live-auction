import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyFar.css";
import { useLogin } from "../login/LoginContext";

const MyFar = () => {
    const [favorites, setFavorites] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loginInfo, setLoginInfo] = useState({
        // UserCode: 7,
        // Id: "user7",
        // Password: "password7",
        // Name: "나야,오류",
        // email: "user7@example.com",
        // phone: "010-7777-7777",
        // birthDate: "1996-07-07",
        // address: "울산시 남구",
        // cash: 7000,
        // gender: "남",
        // isAdult: "y",
        // isAdmin: "n",
        // nickName: "nickname7",
        // isSuspended: "n",
    });
    const { user } = useLogin();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const userCode = loginInfo.UserCode; // 사용자 코드
                const response = await axios.post(`/favo/favoList`, {
                    userCode: user.userCode
                });

                // 데이터 복사하여 원본 보호
                const dataCopy = [...response.data];

                // [수정 전 코드] 중복 제거
                // const uniqueFavorites = response.data.filter(
                //     (item, index, self) => index === self.findIndex(fav => fav.id === item.id)
                // );

                // [수정 후 코드] 중복 제거(Set 사용)
                const uniqueIds = new Set(dataCopy.map(item => item.id));
                const uniqueFavorites = dataCopy.filter(item => uniqueIds.has(item.id));

                setFavorites(uniqueFavorites); // 상태 업데이트
                console.log("중복 제거 후 데이터:", uniqueFavorites);
            } catch (error) {
                console.error("즐겨찾기 목록 가져오기 실패:", error);
            }
        };

        fetchFavorites();
    }, []);  // 최초 한 번만 실행되도록.


    return (
        <div className="favorites-container">
            <h1 className="favorites-title">즐겨찾기</h1>
            <table className="favorites-table">
                <thead>
                <tr>
                    <th>목 차</th>
                    <th>즐겨찾기 목록</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {favorites.map((favorite, index) => (
                    <tr key={favorite.id}>
                        <td>{index + 1}</td>
                        <td>{favorite.name}</td>
                        <td>
                            <button
                                className={`favorite-button ${favorite.isDeleted ? 'deleted' : ''}`}
                                onClick={() => (favorite.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyFar;
