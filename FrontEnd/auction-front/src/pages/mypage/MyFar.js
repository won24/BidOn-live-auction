import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyFar.css"; // 스타일 적용

const MyFar = () => {
    const [favorites, setFavorites] = useState([
        { id: 1, name: "오늘은 2024년 11월 18일 월요일이닷" },
        { id: 2, name: "역시나 프로젝트를 위해 계속 코딩을 한다 후후" },
    ]); // 초기 데이터 추가

    const [loginInfo, setLoginInfo] = useState({
        UserCode: 7,
        Id: "user7",
        Password: "password7",
        Name: "나야,오류",
        email: "user7@example.com",
        phone: "010-7777-7777",
        birthDate: "1996-07-07",
        address: "울산시 남구",
        cash: 7000,
        gender: "남",
        isAdult: "y",
        isAdmin: "n",
        nickName: "nickname7",
        isSuspended: "n",
    });

    useEffect(() => {
        // 서버에서 즐겨찾기 목록 가져오기
        const fetchFavorites = async () => {
            try {
                const userCode= loginInfo.UserCode;
                const response = await axios.post('/favo/favoList', {userCode});


                setFavorites(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("즐겨찾기 목록 가져오기 실패 : ", error);
            }
        };
        fetchFavorites();
    },[]);

    const handleDeleteFavorite = async (id) => {
        try {
            // 서버에 삭제 요청 보내기
            await axios.delete(`/favo/favoList/${id}`);
            setFavorites(favorites.filter((item)  => item.id !== id));
        } catch (error) {
            console.error("즐겨찾기 삭제 실패 : ", error);
        }
    };

    // const handleRequest = async () => {
    //     try {
    //         const response = await axios.post("/favo/favoList", loginInfo, {
    //             headers: { "Content-Type": "application/json" },
    //         });
    //         console.log("서버 응답:", response.data);
    //     } catch (error) {
    //         console.error("요청 중 에러 발생:", error);
    //     }
    // };
    //
    // useEffect(() => {
    //     const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    //     if (storedFavorites) {
    //         setFavorites(storedFavorites);
    //     }
    // }, []);
    //
    // const handleDeleteFavorite = (id) => {
    //     const newFavorites = favorites.filter((item) => item.id !== id);
    //     setFavorites(newFavorites);
    //     localStorage.setItem("favorites", JSON.stringify(newFavorites));
    // };

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
                        <td key={index}>{index + 1}</td>
                        <td>{favorite.name}</td>
                        <td>
                            <button
                                className={`favorite-button ${favorite.isDeleted ? 'deleted' : ''}`}
                                onClick={() => handleDeleteFavorite(favorite.id)}>별</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyFar;
