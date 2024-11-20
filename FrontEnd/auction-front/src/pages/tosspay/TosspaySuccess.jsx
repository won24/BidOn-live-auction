import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "../login/LoginContext";
import axios from "axios";

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useLogin();

    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            try {
                const response = await fetch("/confirm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                const json = await response.json();
                console.log(json);

                if (!response.ok) {
                    navigate(`/fail?message=${json.message}&code=${json.code}`);
                    return json;
                }

                // 결제 성공 시 /toss/save로 데이터 전송
                if (user && user.userCode) {
                    try {
                        await axios.post('/toss/save', {
                            userCode: user.userCode,
                            amount: Number(requestData.amount)
                        });
                        console.log('결제 정보가 성공적으로 저장되었습니다.');
                    } catch (error) {
                        console.error('결제 정보 저장 중 오류 발생:', error);
                    }
                } else {
                    console.error('사용자 정보가 없습니다.');
                }

            } catch (error) {
                console.error('결제 확인 중 오류 발생:', error);
                navigate('/fail?message=결제 확인 중 오류가 발생했습니다.');
            }
        }

        confirm();
    }, [navigate, searchParams, user]);

    return (
        <div className="result wrapper">
            <div className="box_section">
                <h2>결제 성공</h2>
                <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
                <p>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>
                <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
            </div>
        </div>
    );
}