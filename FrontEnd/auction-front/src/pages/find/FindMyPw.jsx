import { useEffect, useState } from "react";
import NameInput from "../signup/formFields/NameInput";
import PhoneInput from "../signup/formFields/PhoneInput";
import EmailInput from "../signup/formFields/EmailInput";
import IdInput from "../signup/formFields/IdInput";
import { useLocation } from "react-router-dom";
import ConfirmPasswordInput from "../signup/formFields/ConfirmPasswordInput";
import PasswordInput from "../signup/formFields/PasswordInput";

// Utility functions for routes
const getRouteConfig = (formData, setFormData, handleChange) => (
{
    "/finder/pw/phone": 
    {
        inputs: [
            <IdInput value={formData.id} onChange={handleChange} validate={false} />,
            <NameInput value={formData.name} onChange={handleChange} />,
            <PhoneInput phone={formData.phone} setFormData={setFormData} formData={formData} />,
        ],
        validate: () =>
            formData.id.trim() &&
            formData.name.trim() &&
            formData.phone.areaCode.trim() &&
            formData.phone.middle.trim() &&
            formData.phone.last.trim(),
        getRelevantData: () => (
        {
            id: formData.id,
            name: formData.name,
            phone: `${formData.phone.areaCode}-${formData.phone.middle}-${formData.phone.last}`,
        }),
    },

    "/finder/pw/email": 
    {
        inputs: [
            <IdInput value={formData.id} onChange={handleChange} validate={false} />,
            <NameInput value={formData.name} onChange={handleChange} />,
            <EmailInput value={formData.email} onChange={handleChange} />,
        ],
        validate: () => formData.id.trim() && formData.name.trim() && formData.email.trim(),
        getRelevantData: () => (
        {
            id: formData.id,
            name: formData.name,
            email: formData.email,
        }),
    },
});

const ResultMessage = ({ message, onClose, formData, handleChange, handlePasswordSubmit, passwordChanged }) => 
{
    return(
        <div className="find-pw-result">
            <h3 className="subtitle">비밀번호 재설정</h3>
            <hr className="line" />
            { passwordChanged ? 
            (<>
                <span className="message">닫기 버튼을 눌러 창을 닫아주세요.</span>
                <div style={{marginTop: "50px"}}>
                    <h1 style={{ textAlign: "center", marginBottom: "60px" }}>{message}</h1>
                    <div className="button-wrapper">
                        <button className="auth-link" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </div>
            </>) : 
            (<>
                <span className="message">{message}</span>
                <div>
                    <form onSubmit={handlePasswordSubmit}>
                        <PasswordInput value={formData.password} onChange={handleChange} />
                        <ConfirmPasswordInput
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            password={formData.password}
                        />
                        <div className="button-wrapper">
                            <button type="submit" className="auth-link">
                                변경하기
                            </button>
                        </div>
                    </form>
                </div>
            </>) }
        </div>
    )
};

const FindMyPw = () => 
{
    const [formData, setFormData] = useState(
    {
        id: "",
        password: '',
        confirmPassword: '',
        name: "",
        email: "",
        phone: { areaCode: "", middle: "", last: "" },
    });
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const { pathname } = useLocation();
    const [passwordChanged, setPasswordChanged] = useState(false);

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
                `http://localhost:8080/api/finder/pw?${queryParams.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const result = await response.json();

            if (result) 
            {
                setSuccess(true);
                setResultMessage("회원정보 조회에 성공하여 비밀번호를 재설정합니다.");
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

    const handlePasswordSubmit = async (e) => 
    {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) 
        {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const dataToSend = 
        {
            id: formData.id,
            password: formData.password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/finder/pw/update", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) 
            {
                setResultMessage("비밀번호가 성공적으로 변경되었습니다.");
                setPasswordChanged(true);
            } 
            else 
            {
                setResultMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) 
        {
            setResultMessage("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    if (success || fail) 
    {
        return <ResultMessage 
                    message={resultMessage} 
                    onClose={close} 
                    formData={formData} 
                    handleChange={handleChange}
                    handlePasswordSubmit={handlePasswordSubmit}
                    passwordChanged={passwordChanged}
                />;
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

export default FindMyPw;
