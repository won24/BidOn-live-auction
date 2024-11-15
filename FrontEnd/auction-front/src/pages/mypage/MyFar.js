// 즐겨찾기 (/mypage/myfar)

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const MyFar = () => {
    const [favorites, setFavorites] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        UserCode: 7,
        Id: 'user7',
        Password: 'password7',
        Name: '나야,오류',
        email: 'user7@example.com',
        phone: '010-7777-7777',
        birthDate: '1996-07-07',
        address: '울산시 남구',
        cash: 7000,
        gender: '남',
        isAdult: 'y',
        isAdmin: 'n',
        nickName: 'nickname7',
        isSuspended: 'n'
    });

    // 서버에서 데이터를 가져오는데 useEffect 로 요청을 받기
    // 버튼 클릭 시 실행되는 함수
    const handleRequest = async () => {
        try {
            const response = await axios.post('' +
                '/favo/favoList', loginInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('서버 응답:', response.data); // 서버로부터 받은 응답 출력
        } catch (error) {
            console.error('요청 중 에러 발생:', error); // 오류 처리
        }
    };



    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);


    const handleAddFavorite = (name) => {
        const newItem = { id: Date.now(), name };
        setFavorites([...favorites, newItem]);
        localStorage.setItem('favorites', JSON.stringify([...favorites, newItem]));
        setIsModalOpen(false);
    };

    const handleDeleteFavorite = (id) => {
        const newFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <div>
            <h1>요청하기</h1>
            <button onClick={handleRequest}>아이템 요청하기</button>
            <h2>즐겨찾기 목록</h2>
            <ul>
                {favorites.map((favorite, index) => (
                    <li key={index}>{favorite.title}</li> // 예시로 title 속성을 출력
                ))}
            </ul>
        </div>
    );
}

export default MyFar;
