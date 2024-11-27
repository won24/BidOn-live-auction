// 참여 경매 (/mypage/myauction)
// 각 로그인한 회원이 참여했던 경매 목록 보여주기

/*
* - fetchParticipatedAuctions : 사용자가 참여한 경매 목록을 서버에서 가져옴
* - fetchWonAuctions : 사용자가 낙찰받은 경매 목록을 서버에서 가져옴
*
* - participatedAuctions 와 wonAuctions 는 각각 참여한 경매와 낙찰받은 경매 정보를 저장
* */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogin } from '../login/LoginContext';

const MyAuctions = () => {
    const { user } = useLogin();
    const [participatedAuctions, setParticipatedAuctions] = useState([]);
    const [wonAuctions, setWonAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 경매 참여 목록 가져오기
    // const fetchParticipatedAuctions = async () => {
    //     if (!user?.userCode) return;
    //
    //     try {
    //         const response = await axios.get(`http://localhost:8080/mypage/myauction`, {
    //             params: { userCode: user.userCode },
    //         });
    //         setParticipatedAuctions(response.data);
    //     } catch (err) {
    //         setError("경매 참여 목록을 가져오는 데 실패했습니다.");
    //     }
    // };

    // 낙찰받은 경매 목록 가져오기
    const fetchWonAuctions = async () => {
        if (!user?.userCode) return;

        try {
            const response = await axios.get(`http://localhost:8080/mypage/successbid`, {
                params: { userCode: user.userCode },
            });
            setWonAuctions(response.data);
        } catch (err) {
            setError("낙찰받은 경매 목록을 가져오는 데 실패했습니다.");
        }
    };

    useEffect(() => {
        if (user?.userCode) {
            fetchWonAuctions();
        }
    }, [user?.userCode]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-auctions">
            <h2>낙찰받은 경매</h2>
            <div className="auction-list">
                {wonAuctions.length > 0 ? (
                    wonAuctions.map((auction) => (
                        <div key={auction.id} className="auction-item">
                            <h3>{auction.title}</h3>
                            <p>낙찰 날짜: {auction.participationDate}</p>
                            <p>낙찰 가격: {auction.currentPrice}</p>
                        </div>
                    ))
                ) : (
                    <p>낙찰받은 경매가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MyAuctions;
