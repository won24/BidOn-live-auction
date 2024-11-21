import { useEffect, useState } from "react";
import NameInput from "../signup/formFields/NameInput";
import PhoneInput from "../signup/formFields/PhoneInput";
import EmailInput from "../signup/formFields/EmailInput";
import { useLocation } from "react-router-dom";

// Utility functions for routes
const getRouteConfig = (formData, setFormData, handleChange) => (
{
    "/finder/id/phone": 
    {
        inputs: [
            <NameInput value={formData.name} onChange={handleChange} />,
            <PhoneInput phone={formData.phone} setFormData={setFormData} formData={formData} />,
        ],
        validate: () =>
            formData.name.trim() &&
            formData.phone.areaCode.trim() &&
            formData.phone.middle.trim() &&
            formData.phone.last.trim(),
        getRelevantData: () => (
        {
            name: formData.name,
            phone: `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`,
        }),
    },

    "/finder/id/email": 
    {
        inputs: [
            <NameInput value={formData.name} onChange={handleChange} />,
            <EmailInput value={formData.email} onChange={handleChange} />,
        ],
        validate: () => formData.name.trim() && formData.email.trim(),
        getRelevantData: () => (
            {
            name: formData.name,
            email: formData.email,
        }),
    },
});

// Reusable result component
const ResultMessage = ({ message, onClose }) => (
    <div className="find-id-result">
        <h3 className="subtitle">아이디 조회 결과</h3>
        <hr className="line" />
        <span className="message">고객님의 회원 정보를 토대로 조회한 결과입니다.</span>
        <div>
            <h3 style={{ textAlign: "center" }}>{message}</h3>
            <div className="button-wrapper">
                <button className="auth-link" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    </div>
);

const FindMyId = () => 
{
    const [formData, setFormData] = useState(
    {
        name: "",
        email: "",
        phone: { areaCode: "", middle: "", last: "" },
    });
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const { pathname } = useLocation();

    const handleChange = (e) => 
    {
        const { name, value } = e.target;
        setFormData((prevData) => (
        {
            ...prevData,
            [name]: value,
        }));
    };

    const close = () => 
    {
        window.close();
    };

    const routeConfig = getRouteConfig(formData, setFormData, handleChange);
    const currentRoute = routeConfig[pathname];

    useEffect(() => 
    {
        if (currentRoute) 
        {
            setFormValid(currentRoute.validate());
        } 
        else 
        {
            setFormValid(false);
        }
    }, [formData, currentRoute]);

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const dataToSend = currentRoute.getRelevantData();
        const queryParams = new URLSearchParams(dataToSend);

        try {
            const response = await fetch(
                `http://localhost:8080/api/finder/id?${queryParams.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) 
            {
                const result = await response.json();
                setSuccess(true);
                setResultMessage(`${formData.name}님의 아이디는 ${result.id}입니다.`);
            } 
            else if (response.status === 404) 
            {
                setFail(true);
                setResultMessage("일치하는 정보를 찾을 수 없습니다.");
            }
        } catch {
            setResultMessage("잠시 후 다시 시도해주세요.");
        }
    };

    if (success || fail) 
    {
        return <ResultMessage message={resultMessage} onClose={close} />;
    }

    if (!currentRoute) 
    {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>잘못된 접근입니다.</h1>
                <div className="button-wrapper">
                    <button className="auth-link" onClick={close}>
                        닫기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {currentRoute.inputs}
                <div className="button-wrapper">
                    <button
                        type="submit"
                        className={`auth-link ${formValid ? "" : "disabled"}`}
                        disabled={!formValid}
                    >
                        조회하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FindMyId;
