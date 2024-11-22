import { useEffect, useState } from "react";


const AuctionTimer = ({ startTime }) => {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        const auctionDuration = 5 * 60 * 1000; // 5분
        const endTime = new Date(startTime).getTime() + auctionDuration;

        const updateRemainingTime = () => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);
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
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div>
            {remainingTime > 0 ? (
                <p>{formatTime(remainingTime)}</p>
            ) : (
                <p>경매 종료</p>
            )}
        </div>
    );
};

export default AuctionTimer;
