// 즐겨찾기 (/mypage/myfar)

import React  from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const MyFar = () => {
    const [favorites, setFavorites] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <button onClick={() => setIsModalOpen(true)}>즐겨찾기 추가</button>
            <modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddFavorite} />
            <ul>
                {favorites.map((favorite) => (
                    <favoriteItem key={favorite.id} item={favorite} onDelete={handleDeleteFavorite} />
                ))}
            </ul>
        </div>
    );
}

export default MyFar;
