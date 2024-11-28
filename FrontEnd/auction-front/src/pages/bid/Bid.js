import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLogin } from '../../pages/login/LoginContext';
import { connectWebSocket, sendBid, subscribeToAuction } from './Websocket';
import { useParams } from 'react-router-dom';

const Bid = () => {
    const { postId } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [currentBid, setCurrentBid] = useState(() => {
        const savedBid = localStorage.getItem(`currentBid-${postId}`);
        return savedBid ? parseInt(savedBid, 10) : 0;
    });
    const [userInfo, setUserInfo] = useState(null);
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

    const { user } = useLogin();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userCode = sessionStorage.getItem("userCode");

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!isLoggedIn) return;
            try {
                const { data } = await axios.get(`/admin/bid/${userCode}`);
                setUserInfo(data);
            } catch (error) {
                console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
            }
        };
        fetchUserInfo();
    }, [isLoggedIn, userCode]);

    // 경매 아이템 데이터 가져오기
    useEffect(() => {
        const fetchAuctionItem = async () => {
            try {
                const { data } = await axios.get(`/auction/${postId}`);
                setAuctionItem(data);
                setCurrentBid(data.startCash);
            } catch (error) {
                console.error('경매 아이템을 가져오는 데 실패했습니다:', error);
            }
        };
        fetchAuctionItem();
    }, [postId]);

    // 웹소켓 연결
    useEffect(() => {
        const setupWebSocket = async () => {
            await connectWebSocket();
            subscribeToAuction(handleBidUpdate);
            setIsWebSocketConnected(true);
        };

        setupWebSocket();
    }, []);

    // 입찰 업데이트 핸들러
    const handleBidUpdate = useCallback((bidMessage) => {
        if (bidMessage.postId === postId) {
            setCurrentBid((prevBid) => {
                const updatedBid = Math.max(prevBid, bidMessage.bidAmount);
                localStorage.setItem(`currentBid-${postId}`, updatedBid);
                return updatedBid;
            });
        }
    }, [postId]);

    // 최고 입찰가 가져오기
    useEffect(() => {
        const fetchHighestBid = async () => {
            try {
                const { data } = await axios.get(`/bid/${postId}`);
                setCurrentBid(data);
            } catch (error) {
                console.error('최고 입찰가를 가져오는 데 실패했습니다:', error);
            }
        };
        fetchHighestBid();
    }, [postId]);

    // 입찰 처리 함수
    const handleBidIncrease = async (amount) => {
        const newBid = currentBid + amount;

        if (userInfo && newBid > userInfo.cash) {
            alert('입찰 금액이 보유 금액을 초과했습니다.');
            return;
        }

        try {
            const { data: userBidData } = await axios.get(`/bid/check/${postId}/${userCode}`);
            const isFirstBid = userBidData === null;

            const updatedCash = userInfo.cash - (isFirstBid ? newBid : amount);

            await sendBid({
                postId,
                userCode,
                bidAmount: newBid,
            });

            await axios.put(`/admin/updatecash/${userCode}`, { cash: updatedCash });

            setUserInfo((prev) => ({
                ...prev,
                cash: updatedCash,
            }));

            setCurrentBid(newBid);
            localStorage.setItem(`currentBid-${postId}`, newBid);
            alert('입찰이 성공적으로 처리되었습니다.');
        } catch (error) {
            console.error('입찰 처리 중 오류 발생:', error);
            alert('입찰 처리에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    if (!auctionItem) return <div>로딩 중...</div>;

    // 현재 입찰가 컴포넌트
    const CurrentBid = React.memo(({ bid }) => (
        <div className="bid-currentBid">
            <div className="bid-text">현재 최고 입찰가:</div>
            <div className="bid-value">{bid.toLocaleString()}원</div>
        </div>
    ));

    return (
        <div className="bid-container">
            <div className="bid-live">
                <CurrentBid bid={currentBid} />
                <div className="bid-button-container">
                    {userInfo && (
                        <>
                            <button
                                className="bid-button"
                                onClick={() => handleBidIncrease(10000)}
                                disabled={!isWebSocketConnected}
                            >
                                +10,000원
                            </button>
                            <button
                                className="bid-button"
                                onClick={() => handleBidIncrease(50000)}
                                disabled={!isWebSocketConnected}
                            >
                                +50,000원
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="bid-info">
                {userInfo && (
                    <>
                        <p className="bid-info-text">내 보유 금액</p>
                        <p className="bid-info-value">{userInfo.cash.toLocaleString()}원</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Bid;
