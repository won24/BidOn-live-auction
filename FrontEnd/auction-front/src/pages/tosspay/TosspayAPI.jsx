import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientkey = process.env.REACT_APP_TOSS_CLIENT_KEY;
const customerKey = generateRandomString();
function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

export function CheckoutPage() {
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 0,
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [inputValue, setInputValue] = useState(amount.value);

    useEffect(() => {
        async function fetchPaymentWidgets() {
            const tossPayments = await loadTossPayments(clientkey);
            const widgets = tossPayments.widgets({
                customerKey,
            });
            setWidgets(widgets);
        }
        fetchPaymentWidgets();
    }, [clientkey, customerKey]);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                console.log("위젯이 아직 로드되지 않았습니다.");
                return;
            }
            try {
                await widgets.setAmount(amount);

                await Promise.all([
                    widgets.renderPaymentMethods({
                        selector: "#payment-method",
                        variantKey: "DEFAULT",
                    }),
                    widgets.renderAgreement({
                        selector: "#agreement",
                        variantKey: "AGREEMENT",
                    }),
                ]);

                console.log("위젯이 성공적으로 렌더링되었습니다.");
                setReady(true);
            } catch (error) {
                console.error("위젯 렌더링 중 오류 발생:", error);
            }
        }

        renderPaymentWidgets();
    }, [widgets]);

    useEffect(() => {
        if (widgets == null) {
            return;
        }
        widgets.setAmount(amount);
    }, [widgets, amount]);

    return (
        <div className="wrapper">
            <div className="box_section">
                <div id="payment-method"/>
                <div id="agreement"/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '30px', gap: '5px'}}>
                    <input
                        className="tossinput"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            width: '200px',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        className="main-page_button"
                        disabled={!ready}
                        onClick={async () => {
                            try {
                                setAmount((prevAmount) => ({
                                    ...prevAmount,
                                    value: parseInt(inputValue, 10),
                                }));
                                await widgets.requestPayment({
                                    orderId: generateRandomString(),
                                    orderName: "포인트",
                                    successUrl: window.location.origin + "/tosspaySuccess",
                                    failUrl: window.location.origin + "/tosspayFail",
                                });
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                        style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );

    function generateRandomString() {
        return window.btoa(Math.random().toString()).slice(0, 20);
    }
}