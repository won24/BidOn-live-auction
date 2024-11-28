import { useEffect, useState } from "react";
import * as api from "../acution/common/AuctionAPIs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Bid from "../bid/Bid";
import '../../css/LiveDetail.css'
import SuccessfulBidderModal from "./SuccessfulBidderModal";

const AuctionTimer = ({ startTime, postId, onUpdate }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [started, setStarted] = useState(false); // 경매 시작 여부
    const [ended, setEnded] = useState(false); // 경매 종료 여부
    const [postStatusChanged, setPostStatusChanged] = useState(false); // 상태 변경 여부
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userCode = sessionStorage.getItem("userCode");
    const [finalBid, setFinalBid] = useState(0);
    const [requestSent, setRequestSent] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fiveMinute = 5 * 60 * 1000;
        const startTimestamp = new Date(startTime).getTime();
        const endTimestamp = startTimestamp + fiveMinute;

        const updateRemainingTime = async () => {
            const now = Date.now();

            if (now < startTimestamp) { // 경매 시작 전
                setStarted(false);
                setRemainingTime(startTimestamp - now);
            } else if (now < endTimestamp) { // 경매 시작 후
                setStarted(true);
                setRemainingTime(endTimestamp - now);
            } else if (now >= endTimestamp && now < endTimestamp + fiveMinute) { //경매 끝 ~ 끝+5분
                setStarted(true);
                setEnded(true);
                setRemainingTime(endTimestamp + fiveMinute - now);
            } else if (!postStatusChanged) {  // 경매끝 + 5분
                setRemainingTime(0);
                setPostStatusChanged(true);

                try {
                    await api.setPostStatus(postId);
                    alert('실시간 경매가 종료되었습니다.');
                    navigate('/auction');
                } catch (error) {
                    console.error('경매 상태 변경 실패:', error);
                }
            }
        };

        const timerInterval = setInterval(updateRemainingTime, 1000);
        updateRemainingTime();

        return () => clearInterval(timerInterval);
    }, [startTime, postId, ended, postStatusChanged, requestSent, onUpdate]);


    useEffect(() => {
        if (ended && !requestSent) {
            setRequestSent(true);

            const executeRequests = async () => {
                try {
                    // 낙찰자 정보
                    const response = await axios.get(`http://localhost:8080/bid/top/${postId}`);
                    const data = response.data;
                    setFinalBid(data.currentCash);

                    if(userCode===data.userCode){
                        setIsModalOpen(true);
                    }

                    const formData = {
                        postId: postId,
                        finalCash: data.currentCash,
                        endDay: new Date().toISOString(),
                    };

                    // 경매 정보 업데이트
                    await axios.post('http://localhost:8080/auction/final', formData, {
                        headers: { 'Content-Type': 'application/json' },
                    });

                    // 낙찰자 외 환불 요청
                    await axios.get(`http://localhost:8080/bid/end/${postId}`);

                } catch (error) {
                    console.error('요청 실행 실패', error);
                }
            };

            executeRequests();
        }
    }, [remainingTime, ended, postId, requestSent]);



    const formatTime = (time) => {
        const minutes = Math.floor(time / 1000 / 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div>
            {started ? (
                    ended ? (
                        postStatusChanged ? (
                            <p className="live-detail-page_timer_text">경매가 종료되었습니다.</p>
                        ) : (
                            <div className="live-detail-page_after_timer">
                                <p className="live-detail-page_after_timer_time">{formatTime(remainingTime)}</p>
                                <p className="live-detail-page_after_timer_text">후에 채팅이 종료됩니다.</p>
                            </div>
                        )
                    ) : (
                        <div className="liveOn_container">
                            <div className="live-detail-page_timer">
                                <div className="live-detail-page_timer_text">경매 종료</div>
                                <div className="live-detail-page_timer_time">{formatTime(remainingTime)}</div>
                            </div>
                            <div className="liveOn-detail-page_bid">
                                {isLoggedIn ? <Bid/> : <></> }
                            </div>
                        </div>
                    )
                ) : (
                    <div className="live-detail-page_timer">
                        <p className="live-detail-page_timer_text">곧 라이브 경매가 시작됩니다.</p>
                        <p className="live-detail-page_timer_time">{formatTime(remainingTime)}</p>
                    </div>
                )}

            {/* 낙찰자 모달 */}
            <SuccessfulBidderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>축하합니다!</h2>
                <p>경매에서 낙찰되었습니다.</p>
                <p>최종 낙찰가는 {finalBid.toLocaleString()}원 입니다.</p>
                <p>배송 방법은 택배배송, 방문수거 두 가지 입니다.</p>
                <p>자세한 안내사항은 공지사항을 확인해주세요.</p>
            </SuccessfulBidderModal>
        </div>
    );
};

export default AuctionTimer;
