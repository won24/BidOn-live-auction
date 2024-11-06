import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientkey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString()
function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}//나중에 따로 난수로 설정
export function CheckoutPage() {
    const [amount, setAmount] = useState({
        currency: "KRW",
        value: 50000,
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);

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
                <div id="payment-method" />
                <div id="agreement" />
                <button
                    className="button"
                    disabled={!ready}
                    onClick={async () => {
                        try {
                            await widgets.requestPayment({
                                orderId: generateRandomString(),
                                orderName: "포인트",
                                successUrl: window.location.origin + "/tosspaySuccess",
                                failUrl: window.location.origin + "/tosspayFail",
                                customerEmail: "customer123@gmail.com",
                                customerName: "사용자",
                                customerMobilePhone: "01012341234",
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
    function generateRandomString() {
        return window.btoa(Math.random().toString()).slice(0, 20);
    }
}