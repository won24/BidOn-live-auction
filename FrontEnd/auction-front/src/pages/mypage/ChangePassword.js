import { useEffect, useState } from "react";
import ConfirmPasswordInput from "../signup/formFields/ConfirmPasswordInput";
import PasswordInput from "../signup/formFields/PasswordInput";

const ResultMessage = ({ message, formData, handleChange, handlePasswordSubmit, passwordChanged }) => 
{
    return(
        <div className="change-pw-result">
            <h3 className="subtitle">비밀번호 변경</h3>
            <hr className="line" />
            { passwordChanged ? 
            (<>
                <span className="message">닫기 버튼을 눌러 창을 닫아주세요.</span>
                <div style={{marginTop: "50px"}}>
                    <h1 style={{ textAlign: "center", marginBottom: "60px" }}>{message}</h1>
                    <div className="button-wrapper">
                        <button className="auth-link">
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

const ChangePassword = () => 
{
    const [formData, setFormData] = useState(
    {
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
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

    const handlePasswordSubmit = async (e) => 
    {
        e.preventDefault();

        if (formData.password !== formData.confirmNewPassword) 
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
                    formData={formData} 
                    handleChange={handleChange}
                    handlePasswordSubmit={handlePasswordSubmit}
                    passwordChanged={passwordChanged}
                />;
    }

    return (
        <div>
            <form>
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

export default ChangePassword;