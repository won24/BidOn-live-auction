import {useEffect, useRef} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "../login/LoginContext";
import axios from "axios";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useLogin();
    const hasRun = useRef(false);
    const handleClose = () => {
        window.close(); // 현재 창을 닫습니다.
    };


    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function saveTossPayment() {
            if (hasRun.current) return; // 이미 실행되었다면 종료
            hasRun.current = true; // 실행 플래그 설정

            console.log("Current user:", user);
            console.log("User code:", user?.userCode);

            if (user && user.userCode > 0) {
                try {
                    await axios.post('http://112.221.66.174:8081/toss/save', {
                        userCode: user.userCode,
                        amount: Number(requestData.amount)
                    });
                    console.log('결제 정보가 성공적으로 저장되었습니다.');
                } catch (error) {
                    console.error('결제 정보 저장 중 오류 발생:', error);
                    navigate('/fail?message=결제 정보 저장 중 오류가 발생했습니다.');
                }
            } else {
                console.error('사용자 정보가 없습니다.');
                navigate('/fail?message=사용자 정보를 찾을 수 없습니다.');
            }
        }

        if (user && searchParams) {
            saveTossPayment();
        }
    }, [navigate, searchParams, user]);

    return (
        <div className="result-wrapper">
            <div className="box-section">
                <h2>결제 성공</h2>
                <h3>{`주문번호: ${searchParams.get("orderId")}`}</h3>
                <h3>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</h3>
                <button className="main-page_button" onClick={handleClose}>닫기</button>
            </div>
        </div>
    );
}