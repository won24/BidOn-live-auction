import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogin } from '../login/LoginContext';
import '../../css/MyAuction.css';

const MyAuctions = () => {
    const { user } = useLogin();
    const [wonAuctions, setWonAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 낙찰받은 경매 목록 가져오기
    const fetchWonAuctions = async () => {
        if (!user?.userCode) return;

        try {
            const response = await axios.get('http://112.221.66.174:8081/mypage/successbid', {
                params: { userCode: user.userCode },
            });
            console.log(response.data);  // 반환된 데이터 확인

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
        return <div className="auction-loading">불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    function applyTruncate(selector, maxLength) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const text = el.textContent.trim();
            if (text.length > maxLength) {
                el.textContent = text.substring(0, maxLength) + '...';
                el.setAttribute('title', text); // 전체 텍스트를 툴팁으로 표시
            }
        });
    }

// 예제: 20자 이상 잘라내기
    applyTruncate('.truncate', 20);



    return (
        <div className="auction-wrapper">
            <h1 className="auction-list-title">낙찰 경매품 목록</h1><hr />
            {wonAuctions.length > 0 ? (
                <table className="auction-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>경매품명</th>
                        <th>내용</th>
                        <th>회원코드</th>
                    </tr>
                    </thead>
                    <tbody className="auction-table-list">
                    {wonAuctions.map((auction, index) => (
                        <tr key={auction.postId}>
                            <td>{index + 1}</td>
                            <td>{auction.title}</td>
                            <td className="auction-content-truncate"
                                style={{
                                maxWidth: '500px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>{auction.content}</td>
                            <td>{auction.userCode}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-auctions">낙찰받은 경매가 없습니다.</p>
            )}
        </div>
    );

};

export default MyAuctions;
