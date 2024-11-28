import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogin } from '../login/LoginContext';
import "../../css/Auction.css";

const MyAuctions = () => {
    const { user } = useLogin();
    const [wonAuctions, setWonAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 낙찰받은 경매 목록 가져오기
    const fetchWonAuctions = async () => {
        if (!user?.userCode) return;

        try {
            const response = await axios.get('http://localhost:8080/mypage/successbid', {
                params: { userCode: user.userCode },
            });
            if (response.data) {
                setWonAuctions(response.data); // 서버에서 반환된 데이터 할당
            } else {
                setError("경매 목록이 없습니다.");
            }
        } catch (err) {
            setError('낙찰받은 경매 목록을 가져오는 데 실패했습니다.');
        } finally {
            setLoading(false); // 데이터 로딩 끝내기
        }
    };

    useEffect(() => {
        // user가 있는지 확인하고 낙찰받은 경매 목록을 가져옴
        if (user?.userCode) {
            fetchWonAuctions();
        } else {
            setLoading(false); // user가 없으면 loading 상태 종료
        }
    }, [user]); // user 값이 변경될 때마다 경매 목록을 다시 가져옴

    if (loading) {
        return <div>불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="auction-wrapper">
            <h1>낙찰받은 경매</h1>
            <div className="auction">
                {wonAuctions.length > 0 ? (
                    wonAuctions.map((auction) => (
                        <div key={auction.postId} className="auctionpostid">
                            <h3 className="auctiontitle">{auction.title}</h3>
                            <div className="auctiondescription">
                                <p>경매품 : {auction.postId}</p>
                            </div>
                            <div className="auctioninfo">
                                <p>내용: {auction.content}</p>
                            </div>
                            <div className="auctionlistuser">
                                <p>작성자 ID: {auction.userCode}</p>
                            </div>
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
