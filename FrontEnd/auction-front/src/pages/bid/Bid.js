import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../pages/login/LoginContext';
import { connectWebSocket, sendBid, subscribeToAuction } from './Websocket';

const CurrentBid = React.memo(({ bid }) => (
    <p>현재 최고 입찰가: {bid.toLocaleString()}원</p>
));

const Bid = () => {
    const { postId } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [currentBid, setCurrentBid] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useLogin();

    const handleBidUpdate = useCallback((bidMessage) => {
        if (bidMessage.postId === postId) {
            setCurrentBid((prevBid) => Math.max(prevBid, bidMessage.bidAmount));
        }
    }, [postId]);

    useEffect(() => {
        const fetchAuctionItem = async () => {
            try {
                const response = await axios.get(`/auction/${postId}`);
                setAuctionItem(response.data);
                setCurrentBid(response.data.startCash);
            } catch (error) {
                console.error('경매 아이템을 가져오는 데 실패했습니다:', error);
            }
        };

        fetchAuctionItem();
    }, [postId]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user?.userCode > 0) {
                try {
                    const response = await axios.get(`/admin/bid/${user.userCode}`);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
                }
            }
        };

        fetchUserInfo();
    }, [user?.cash]);

    useEffect(() => {
        const setupWebSocket = async () => {
            await connectWebSocket();
            subscribeToAuction(handleBidUpdate);
        };

        setupWebSocket();

        return () => {
            // WebSocket 연결 종료
        };
    }, [handleBidUpdate]);

    const handleBidIncrease = async (amount) => {
        console.log("handleBidIncrease called with amount:", amount); // 로그 추가
        const newBid = currentBid + amount;
        if (userInfo && newBid <= userInfo.cash) {
            try {
                await sendBid({
                    postId: postId,
                    userCode: user.userCode,
                    bidAmount: newBid
                });
                alert('입찰이 성공적으로 처리되었습니다.');
            } catch (error) {
                console.error('입찰 처리 중 오류 발생:', error);
                alert('입찰 처리에 실패했습니다. 다시 시도해 주세요.');
            }
        } else {
            alert('입찰 금액이 보유 금액을 초과했습니다.');
        }
    };

    if (!auctionItem) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>{auctionItem.title}</h2>
            <CurrentBid bid={currentBid} />
            {userInfo && <p>내 보유 금액: {userInfo.cash.toLocaleString()}원</p>}
            <button onClick={() => handleBidIncrease(10000)}>+10,000원</button>
            <button onClick={() => handleBidIncrease(50000)}>+50,000원</button>
        </div>
    );
};

export default Bid;
