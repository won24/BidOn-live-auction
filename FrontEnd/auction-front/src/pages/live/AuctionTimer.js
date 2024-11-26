import { useEffect, useState } from "react";
import * as api from "../acution/common/AuctionAPIs";



const AuctionTimer = ({ startTime, postId }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false); // 경매 시작 여부

    useEffect(() => {
        const auctionDuration = 5 * 60 * 1000; // 5분
        const startTimestamp = new Date(startTime).getTime();

        const updateRemainingTime = () => {
            const now = new Date().getTime();

            if (now < startTimestamp) {
                // 경매 시작 전
                setHasStarted(false);
                setRemainingTime(startTimestamp - now);
            } else {
                // 경매 진행 중
                setHasStarted(true);
                const endTime = startTimestamp + auctionDuration;
                const timeLeft = endTime - now;
                setRemainingTime(timeLeft > 0 ? timeLeft : 0);

                const offTime = endTime + auctionDuration;
                console.log("offTime" , offTime)
                console.log("endTime 5분 후 ", endTime+ auctionDuration);
                if(offTime > endTime + auctionDuration){
                    const setStatus = async () =>{
                        try {
                            const response = await api.setPostStatus(postId);
                            console.log(response.data)
                        }catch (error){
                            console.error("라이브 방송 후 상태 변경 실패")
                        }
                    }
                }
            }
        };

        const timerInterval = setInterval(updateRemainingTime, 1000);

        // 초기 호출
        updateRemainingTime();

        // 타이머 정리
        return () => clearInterval(timerInterval);
    }, [startTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 1000 / 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}분 : ${seconds.toString().padStart(2, "0")}초`;
    };


    return (
        <div>
            {hasStarted ? (
                remainingTime > 0 ? (
                    <div>
                        <p>{formatTime(remainingTime)}</p>
                        <p>후 경매가 종료됩니다.</p>
                    </div>
                ) : (
                    <p>경매 종료</p>
                )
            ) : (
                <div>
                    <p>곧 라이브 경매가 시작됩니다.</p>
                    <p> {formatTime(remainingTime)}</p>
                </div>
            )}
        </div>
    );
};

export default AuctionTimer;
