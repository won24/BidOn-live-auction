import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../pages/login/LoginContext';
import {connectWebSocket, disconnectWebSocket, sendBid} from "./Websocket";


const Bid = () => {
    const { postId } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [currentBid, setCurrentBid] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useLogin();

    useEffect(() => {
        fetchAuctionItem();
        fetchUserInfo();

        const handleBidUpdate = (bidMessage) => {
            if (bidMessage.auctionId === postId) {
                setCurrentBid(bidMessage.bidAmount);
            }
        };
        connectWebSocket(handleBidUpdate);

        return () => {
            disconnectWebSocket();
        };
    }, [postId, user]);

    const fetchAuctionItem = async () => {
        try {
            const response = await axios.get(`/auction/${postId}`);
            setAuctionItem(response.data);
            setCurrentBid(response.data.startCash);
        } catch (error) {
            console.error('경매 아이템을 가져오는 데 실패했습니다:', error);
        }
    };

    const fetchUserInfo = async () => {
        if (user.userCode > 0) {
            try {
                const response = await axios.get(`/admin/bid/${user.userCode}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
            }
        }
    };

    const handleBidIncrease = (amount) => {
        const newBid = currentBid + amount;
        if (userInfo && newBid <= userInfo.cash) {
            sendBid({
                postId: postId,
                userId: user.userCode,
                bidAmount: newBid
            });
            // 로컬 상태 업데이트는 서버로부터의 응답을 기다립니다.
        } else {
            alert('입찰 금액이 보유 금액을 초과했습니다.');
        }
    };

    if (!auctionItem) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>{auctionItem.title}</h2>
            <p>현재 최고 입찰가: {currentBid.toLocaleString()}원</p>
            {userInfo && <p>내 보유 금액: {userInfo.cash.toLocaleString()}원</p>}
            <button onClick={() => handleBidIncrease(10000)}>+10,000원</button>
            <button onClick={() => handleBidIncrease(50000)}>+50,000원</button>
        </div>
    );
};

export default Bid;