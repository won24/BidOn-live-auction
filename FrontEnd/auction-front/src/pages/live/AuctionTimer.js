import { useEffect, useState } from "react";

const AuctionTimer = ({ startTime }) => {
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
                    <p>{formatTime(remainingTime)}</p>
                ) : (
                    <p>경매 종료</p>
                )
            ) : (
                <p>경매 시작 전 남은 시간: {formatTime(remainingTime)}</p>
            )}
        </div>
    );
};

export default AuctionTimer;
