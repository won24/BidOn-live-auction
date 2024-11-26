// 경매품 (/mypage/myauctionitem)

/*
* 내 글(1 : 1 문의)-> 정원님이 고객센터에서 이미 구현하심
* 내 글(경매품) -> 아직 안 했던 상태
* 어차피 내 글 안에는 1 : 1 문의와 경매품 2가지가 더 있기 때문에 1:1 문의를 빼면 경매품만 남으니까 아예 '내 글'을 '경매품'으로 교체(?)
* */

// 각 로그인 한 회원마다 신청한 경매품 보여주기

import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../login/LoginContext"; // 로그인 상태 가져오기
import "./MyAuctionItem.css";

const MyAuctionItem = () => {
    const [auctionItems, setAuctionItems] = useState([]);
    const { user } = useLogin(); // 로그인 정보에서 user 가져오기

    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await axios.get("http://localhost:8080/mypage/myauctionitem", {
                    params: { userCode: user.userCode } // 현재 로그인된 사용자의 userCode를 전달
                });
                setAuctionItems(response.data);
            } catch (error) {
                console.error("아이템을 불러오는 데 실패했습니다:", error);
            }
        };

        fetchAuctionItems();
    }, [user]); // user 정보가 변경될 때만 호출

    if (auctionItems.length === 0) {
        return <div>신청한 경매품이 없습니다.</div>;
    }

    return (
        <div>
            <h1>경매 품</h1>
            <table>
                <thead>
                <tr>
                    <th>목 차</th>
                    <th>경매 제목</th>
                    <th>카테고리</th>
                    <th>최종 가격</th>
                </tr>
                </thead>
                <tbody>
                {auctionItems.map((item, index) => (
                    <tr key={item.postId}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.categoryCode}</td>
                        <td>{item.finalCash || "미정"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>&gt;</button>
            </div>
        </div>
    );
};

export default MyAuctionItem;
