// 참여 경매 (/mypage/myauction)
// 판매자가 경매품 등록 후 등록 완료 창 확인 클릭 시 이동되는 페이지

/*
* - clickedItems 상태를 사용해 열람했던 상품 정보 저장
*
* - 사용자가 '보기' 버튼을 클릭 시 해당 상품 MyAuction 섹션에 추가
*
* - 이미 저장된 상품은 addItems 에 중복 추가 되지 않도록 some() 메소드로 확인
* */

import React, { useEffect, useState } from "react";
import "./MyAuction.css";

const MyAuction = () => {
    const [addItems, setAddItems] = useState([]); // 열람한 상품 목록
    const [items, setItems] = useState([]); // 모든 상품 목록
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 표시할 아이템 개수

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/auction"); // 서버 엔드포인트
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.log("상품을 가져오지 못했습니다. : ", error);
            }
        };
        fetchItems();
    }, []);

    const handleAdd = (item) => {
        // 상품이 이미 열람된 경우 업데이트하지 않음
        if (!addItems.some((addItem) => addItem.id === item.id)) {
            const currentTime = new Date().toLocaleString(); // 현재 시간 저장
            setAddItems((prev) => [
                ...prev,
                {
                    ...item,
                    viewedAt: currentTime, // 열람 시간 추가
                },
            ]);
        }
    };

    // 페이지네이션 관련 데이터
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(items.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="my-auction-container">
            <h1>참여한 경매</h1>

            {/* 참여한 경매방 목록 테이블 */}
            <table className="auction-table">
                <thead>
                <tr>
                    <th>목 차</th>
                    <th>참여한 경매방 목록</th>
                    <th>보기</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item, index) => (
                    <tr key={item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className="view-button" onClick={() => handleAdd(item)}>
                                보기
                            </button>
                        </td>
                    </tr>
                ))}
                {/* 빈 행 추가 */}
                {Array.from({ length: Math.max(itemsPerPage - currentItems.length, 0) }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                        <td colSpan="3">&nbsp;</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 버튼 */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    이전
                </button>
                <span>
          {currentPage} / {Math.ceil(items.length / itemsPerPage)}
        </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
                >
                    다음
                </button>
            </div>

            {/* 열람한 상품 */}
            <div className="viewed-items">
                <h2>열람한 상품</h2>
                {addItems.length > 0 ? (
                    <table className="viewed-table">
                        <thead>
                        <tr>
                            <th>목 차</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>열람 시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {addItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.viewedAt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>아직 열람한 상품이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MyAuction;
