import { useEffect, useState } from "react";
import * as api from "../acution/common/AuctionAPIs";
import {useNavigate} from "react-router-dom";

const AuctionTimer = ({ startTime, postId, onUpdate }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false); // 경매 시작 여부
    const [hasEnded, setHasEnded] = useState(false); // 경매 종료 여부
    const [postStatusChanged, setPostStatusChanged] = useState(false); // 상태 변경 여부
    const navigate = useNavigate();

    useEffect(() => {
        const auctionDuration = 5 * 60 * 1000; // 경매 시간: 5분
        const postStatusDelay = 5 * 60 * 1000; // 상태 변경 지연: 5분
        const startTimestamp = new Date(startTime).getTime();
        const endTimestamp = startTimestamp + auctionDuration;

        const updateRemainingTime = async () => {
            const now = Date.now();

            if (now < startTimestamp) {
                // 경매 시작 전
                setHasStarted(false);
                setRemainingTime(startTimestamp - now);
            } else if (now < endTimestamp) {
                // 경매 진행 중
                setHasStarted(true);
                setRemainingTime(endTimestamp - now);
            } else if (now >= endTimestamp && now < endTimestamp + postStatusDelay) {
                // 경매 종료 후 5분 대기 중
                setHasStarted(true);
                setHasEnded(true);
                setRemainingTime(endTimestamp + postStatusDelay - now);
            } else if (!postStatusChanged) {
                // 경매 종료 후 5분 뒤 상태 변경 요청
                setRemainingTime(0);
                setPostStatusChanged(true); // 중복 요청 방지

                try {
                    await api.setPostStatus(postId);
                    alert("실시간 경매가 종료되었습니다.");
                    navigate(`auction/${postId}`);

                    // 데이터 갱신 로직 실행
                    if (typeof onUpdate === "function") {
                        onUpdate(); // 부모 컴포넌트에 갱신 요청
                    }
                } catch (error) {
                    console.error("경매 상태 변경 실패:", error);
                }
            }
        };

        const timerInterval = setInterval(updateRemainingTime, 1000);

        // 초기 호출
        updateRemainingTime();

        // 타이머 정리
        return () => clearInterval(timerInterval);
    }, [startTime, postId, hasEnded, postStatusChanged, onUpdate]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 1000 / 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}분 : ${seconds.toString().padStart(2, "0")}초`;
    };

    return (
        <div>
            {hasStarted ? (
                hasEnded ? (
                    postStatusChanged ? (
                        <>경매가 종료되었습니다.</>
                    ) : (
                        <div>
                            <p>{formatTime(remainingTime)}</p>
                            <p>후 채팅이 종료됩니다.</p>
                        </div>
                    )
                ) : (
                    <div>
                        <p>{formatTime(remainingTime)}</p>
                        <p>후 경매가 종료됩니다.</p>
                    </div>
                )
            ) : (
                <div>
                    <p>곧 라이브 경매가 시작됩니다.</p>
                    <p>{formatTime(remainingTime)}</p>
                </div>
            )}
        </div>
    );
};

export default AuctionTimer;
