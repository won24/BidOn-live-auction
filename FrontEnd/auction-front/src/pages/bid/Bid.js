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
    const [currentBid, setCurrentBid] = useState(() => {
        const savedBid = localStorage.getItem(`currentBid-${postId}`);
        return savedBid ? parseInt(savedBid, 10) : 0;
    });
    const [userInfo, setUserInfo] = useState(null);
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false); // 웹소켓 연결 상태
    const { user } = useLogin();

    // 입찰가 업데이트 핸들러 (WebSocket으로 수신한 메시지 처리)
    const handleBidUpdate = useCallback((bidMessage) => {
        if (bidMessage.postId === postId) {
            setCurrentBid((prevBid) => {
                const updatedBid = Math.max(prevBid, bidMessage.bidAmount);
                localStorage.setItem(`currentBid-${postId}`, updatedBid); // 실시간으로 로컬 스토리지 업데이트
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
                setCurrentBid(response.data.startCash);
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
            subscribeToAuction(handleBidUpdate); // 입찰 업데이트 수신 시 처리
            setIsWebSocketConnected(true); // 웹소켓 연결 성공 시 상태 업데이트
        };

        setupWebSocket();

        // 컴포넌트 언마운트 시 WebSocket 연결 종료
        return () => {
            // WebSocket 연결 종료 로직 추가 (필요에 따라 구현)
            setIsWebSocketConnected(false); // 연결 종료 시 상태 업데이트
        };
    }, [handleBidUpdate]);

    // 입찰 금액 증가 처리
    const handleBidIncrease = async (amount) => {
        const newBid = currentBid + amount;

        if (userInfo && newBid <= userInfo.cash) {
            try {
                // 입찰 후 현재 최고 입찰가 갱신
                setCurrentBid((prevBid) => {
                    const updatedBid = Math.max(prevBid, newBid);
                    localStorage.setItem(`currentBid-${postId}`, updatedBid); // 로컬 스토리지에 저장
                    return updatedBid;
                });

                // 사용자 캐시 차감
                const updatedCash = userInfo.cash - newBid;
                await axios.put(`/admin/updatecash/${user.userCode}`, { cash: updatedCash });

                // 사용자 정보 업데이트
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    cash: updatedCash,
                }));

                // 입찰 요청 보내기
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

    // 최고 입찰가 가져오기
    const fetchHighestBid = useCallback(async () => {
        try {
            const response = await axios.get(`/bid/${postId}`);
            setCurrentBid(response.data);
        } catch (error) {
            console.error('최고 입찰가를 가져오는 데 실패했습니다:', error);
        }
    }, [postId]);

    useEffect(() => {
        fetchHighestBid();
    }, [fetchHighestBid]);

    if (!auctionItem) return <div>로딩 중...</div>;

    return (
        <div>
            <CurrentBid bid={currentBid} />
            {userInfo && <p>내 보유 금액: {userInfo.cash.toLocaleString()}원</p>}
            <button onClick={() => handleBidIncrease(10000)} disabled={!isWebSocketConnected}>+10,000원</button>
            <button onClick={() => handleBidIncrease(50000)} disabled={!isWebSocketConnected}>+50,000원</button>
        </div>
    );
};

export default Bid;
