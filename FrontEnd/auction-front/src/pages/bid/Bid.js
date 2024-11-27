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
    const [currentBid, setCurrentBid] = useState(0); // 초기 입찰가를 0으로 설정
    const [userInfo, setUserInfo] = useState(null);
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
    const { user } = useLogin();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // 입찰가 업데이트 핸들러
    const handleBidUpdate = useCallback((bidMessage) => {
        if (bidMessage.postId === postId) {
            setCurrentBid((prevBid) => {
                const updatedBid = Math.max(prevBid, bidMessage.bidAmount);
                localStorage.setItem(`currentBid-${postId}`, updatedBid);
                return updatedBid;
            });
        }
    }, [postId]);

    // 경매 아이템 데이터 가져오기
    useEffect(() => {
        const fetchAuctionItem = async () => {
            try {
                const response = await axios.get(`/auction/${postId}`);
                setAuctionItem(response.data);
                const savedBid = localStorage.getItem(`currentBid-${postId}`);
                // 경매 시작 금액을 초기값으로 설정
                setCurrentBid(savedBid ? parseInt(savedBid, 10) : response.data.startCash);
            } catch (error) {
                console.error('경매 아이템을 가져오는 데 실패했습니다:', error);
            }
        };

        fetchAuctionItem();
    }, [postId]);

    // 사용자 정보 가져오기
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

    // WebSocket 연결 및 입찰 업데이트 처리
    useEffect(() => {
        const setupWebSocket = async () => {
            await connectWebSocket();
            subscribeToAuction(handleBidUpdate);
            setIsWebSocketConnected(true);
        };

        setupWebSocket();

        return () => {
            setIsWebSocketConnected(false);
        };
    }, [handleBidUpdate]);

    // 입찰 금액 증가 처리
    const handleBidIncrease = async (amount) => {
        const newBid = currentBid + amount;

        if (userInfo && newBid <= userInfo.cash) {
            try {
                const updatedCash = userInfo.cash - amount;

                // 캐시 업데이트
                const cashUpdatePromise = axios.put(`/admin/updatecash/${user.userCode}`, { cash: updatedCash });

                // 입찰 금액 업데이트 (상태 직접 업데이트)
                const updatedBid = Math.max(currentBid, newBid);
                localStorage.setItem(`currentBid-${postId}`, updatedBid);
                setCurrentBid(updatedBid);

                // 사용자 정보 업데이트
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    cash: updatedCash,
                }));

                // WebSocket을 통해 입찰 정보 전송
                await Promise.all([cashUpdatePromise]);

                // 입찰 전송
                await sendBid({
                    postId: postId,
                    userCode: user.userCode,
                    bidAmount: updatedBid
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
            <button onClick={() => handleBidIncrease(10000)} disabled={!isWebSocketConnected&&isLoggedIn}>+10,000원</button>
            <button onClick={() => handleBidIncrease(50000)} disabled={!isWebSocketConnected&&isLoggedIn}>+50,000원</button>
        </div>
    );
};

export default Bid;
