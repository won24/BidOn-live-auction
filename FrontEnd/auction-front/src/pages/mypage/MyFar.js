import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/MyFar.css";
import { useLogin } from "../login/LoginContext";
import { deleteFavorite } from '../acution/common/AuctionAPIs';

const MyFar = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useLogin();

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);

            try {
                if (!user || !user.userCode) {
                    console.error("user 또는 userCode 가 유효하지 않습니다.");
                    return;
                }

                const axiosreponse = await axios.get("http://localhost:8080/favo/favolist", {
                    params: { userCode: user.userCode },
                });

                // 응답 데이터 확인 및 상태 업데이트
                if (Array.isArray(axiosreponse.data)) {
                    setFavorites(axiosreponse.data);
                } else {
                    console.warn("서버 응답이 배열이 아닙니다:", axiosreponse.data);
                    setFavorites(false); // 빈 배열로 설정
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
                setFavorites([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (user && user.userCode) {
            fetchFavorites();
        }
    }, [user]);



    const handleDelete = async (postId) => {
        try {
            await deleteFavorite(postId, user.userCode); // 즐겨찾기 삭제 API 호출
            setFavorites((prevFavorites) =>
                prevFavorites.filter((fav) => fav.postId !== postId) // 상태 업데이트: 삭제된 항목 제거
            );
        } catch (error) {
            console.error("즐겨찾기 삭제에 실패했습니다:", error);
        }
    };

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">즐겨찾기</h1>
            {favorites.length > 0 ? (
                <table className="favorites-table">
                    <thead>
                    <tr>
                        <th>목 차</th>
                        <th>즐겨찾기 제목</th>
                        <th>이미지</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody className="favorites-list-table">
                    {favorites.map((favorite, index) => (
                        <tr key={favorite.postId}>
                            <td>{index + 1}</td>
                            <td>{favorite.title}</td>
                            <td>
                                {favorite.imageUrl ? (
                                    <img
                                        src={favorite.imageUrl}
                                        alt={favorite.title}
                                        className="favorites-image"
                                    />
                                ) : (
                                    "이미지 없음"
                                )}
                            </td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(favorite.postId)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-favorites">즐겨찾기 항목이 없습니다.</p>
            )}
        </div>
    );

};

export default MyFar;
