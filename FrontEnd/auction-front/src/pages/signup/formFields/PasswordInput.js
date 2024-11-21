import { useState } from "react";

const PasswordInput = ({ value, onChange }) => 
{
    const [description, setDescription] = useState("영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 8자리 이상 입력해주세요.");
    const [descriptionColor, setDescriptionColor] = useState("#666"); // Initial color

    const validatePassword = (password) => 
    {
        if (password.length === 0) 
        {
            setDescriptionColor("#666");
            return "영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 8자리 이상 입력해주세요.";
        } 
        else if (!/(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*])/.test(password) || password.length < 8) 
        {
            setDescriptionColor("red");
            return "비밀번호 형식이 올바르지 않습니다.";
        } 
        else 
        {
            setDescriptionColor("green");
            return "사용 가능한 비밀번호입니다.";
        }
    };

    const handleChange = (e) => 
    {
        const password = e.target.value;
        onChange(e); // Pass event to parent handler
        setDescription(validatePassword(password));
    };

    return (
        <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                name="password"
                value={value}
                onChange={handleChange}
                style={{ width: "120px" }}
            />
            <span className="input-description" style={{ color: descriptionColor }}>
                {description}
            </span>
        </div>
    );
};

export default PasswordInput;
