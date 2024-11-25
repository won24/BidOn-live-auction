import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyFar.css";
import { useLogin } from "../login/LoginContext";

const MyFar = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useLogin();

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);

            // console.log(user)

            try {
                if (!user || !user.userCode) {
                    console.error("user 또는 userCode가 유효하지 않습니다.");
                    return;
                }

                const response = await axios.post("http://localhost:8080/favo/favoList", {
                    userCode: user.userCode
                });

                if (!response.data) {
                    throw new Error("즐겨찾기 데이터가 비어 있습니다.");
                }

                setFavorites(response.data);
            } catch (error) {
                console.log("즐겨찾기 데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete("http://localhost:8080/mypage/myfar");
            if (response.status === 200) {
                setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== id));
            }
        } catch (error) {
            console.error("삭제 실패:", error.message || error);
            alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

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
                                <button className="favorite-button" onClick={() => handleDelete(favorite.id)}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    );
};

export default MyFar;
