import { useEffect, useState } from "react";
import NameInput from "../signup/formFields/NameInput";
import PhoneInput from "../signup/formFields/PhoneInput";
import EmailInput from "../signup/formFields/EmailInput";
import IdInput from "../signup/formFields/IdInput";
import { useNavigate, useLocation } from "react-router-dom";

const FindId2 = () => 
{
    const [formData, setFormData] = useState(
    {
        id: "",
        name: "",
        email: "",
        phone: { areaCode: "", middle: "", last: "" },
    });
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [resultMessage, setResultMessage] = useState(""); // For backend response messages
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Handle form input changes
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
    }

    // Map routes to form configurations
    const routeConfig = 
    {
        "/finder/id/phone": 
        {
            inputs: 
            [
                <NameInput value={formData.name} onChange={handleChange} />,
                <PhoneInput phone={formData.phone} setFormData={setFormData} formData={formData} />,
            ],
            validate: () =>
                formData.name.trim() !== "" &&
                formData.phone.areaCode.trim() !== "" &&
                formData.phone.middle.trim() !== "" &&
                formData.phone.last.trim() !== "",
            getRelevantData: () => ({
                name: formData.name,
                phone: `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`,
            }),
        },
        "/finder/id/email": 
        {
            inputs: 
            [
                <NameInput value={formData.name} onChange={handleChange} />,
                <EmailInput value={formData.email} onChange={handleChange} />,
            ],
            validate: () => formData.name.trim() !== "" && formData.email.trim() !== "",
            getRelevantData: () => ({
                name: formData.name,
                email: formData.email,
            }),
        },
        "/finder/pw/phone": 
        {
            inputs: 
            [
                <IdInput value={formData.id} onChange={handleChange} validate={false} />,
                <NameInput value={formData.name} onChange={handleChange} />,
                <PhoneInput phone={formData.phone} setFormData={setFormData} formData={formData} />,
            ],
            validate: () =>
                formData.id.trim() !== "" &&
                formData.name.trim() !== "" &&
                formData.phone.areaCode.trim() !== "" &&
                formData.phone.middle.trim() !== "" &&
                formData.phone.last.trim() !== "",
            getRelevantData: () => ({
                id: formData.id,
                name: formData.name,
                phone: `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`,
            }),
        },
        "/finder/pw/email": 
        {
            inputs: 
            [
                <IdInput value={formData.id} onChange={handleChange} validate={false} />,
                <NameInput value={formData.name} onChange={handleChange} />,
                <EmailInput value={formData.email} onChange={handleChange} />,
            ],
            validate: () => formData.id.trim() !== "" && formData.name.trim() !== "" && formData.email.trim() !== "",
            getRelevantData: () => ({
                id: formData.id,
                name: formData.name,
                email: formData.email,
            }),
        },
    };

    const currentRoute = routeConfig[pathname];

    // Validate form data based on the current route
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

    // Submit handler
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        
        // Get relevant data (either phone or email)
        const dataToSend = currentRoute.getRelevantData();
    
        // Build query parameters for GET request
        const queryParams = new URLSearchParams();
        if (dataToSend.phone) queryParams.append("phone", dataToSend.phone);
        if (dataToSend.email) queryParams.append("email", dataToSend.email);
        if (dataToSend.name) queryParams.append("name", dataToSend.name);
        // const encodedQueryParams = encodeURIComponent(queryParams);
    
        try {
            const response = await fetch(`http://localhost:8080/api/finder?${queryParams.toString()}`, 
            {
                method: "GET", // Changed to GET
                headers: { "Content-Type": "application/json" },
            });
    
            if (response.ok) 
            {
                const result = await response.json();
                setSuccess(true);
                setResultMessage(`${formData.name}님의 아이디는 ${result.id}입니다.`);
            } 
            else if (response.status === 404)
            {
                setSuccess(false);
                setFail(true);
                setResultMessage("정보를 찾을 수 없습니다.");
            }
        } catch (err) 
        {
            setSuccess(false);
            setResultMessage("잠시 후 다시 시도해주세요.");
        }
    };
    

    // Success UI
    if (success && (window.location.pathname === "/finder/id/phone" || window.location.pathname === "/finder/id/email"))
    {
        return (
            <div className="find-id-result">
                <h3 className="subtitle">아이디 조회 결과</h3>
                <hr className="line" />
                <span className="message">고객님의 회원 정보를 토대로 조회한 결과입니다.</span>
                <div>
                    <h3 style={{textAlign: "center"}}>{resultMessage}</h3>
                </div>
                <div className="button-wrapper">
                    <button className="auth-link" onClick={close}>닫기</button>
                </div>
            </div>
        );
    }

    if (fail)
    {
        return (
            <div className="find-id-result">
                <h3 className="subtitle">아이디 조회 결과</h3>
                <hr className="line" />
                <span className="message">고객님의 회원 정보를 토대로 조회한 결과입니다.</span>
                <div>
                    <h3 style={{textAlign: "center"}}>{resultMessage}</h3>
                </div>
                <div className="button-wrapper">
                    <button className="auth-link" onClick={close}>닫기</button>
                </div>
            </div>
        );
    }

    // Invalid route handling
    if (!currentRoute) 
    {
        return (
            <div>
                <h3 className="subtitle">잘못된 접근입니다.</h3>
                <hr className="line" />
                <div className="button-wrapper">
                    <button className="auth-link" onClick={close}>닫기</button>
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

export default FindId2;
