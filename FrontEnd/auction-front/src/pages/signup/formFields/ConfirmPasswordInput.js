import { useState, useEffect } from "react";

const ConfirmPasswordInput = ({ value, onChange, password }) => 
{
    const [description, setDescription] = useState("비밀번호를 한 번 더 입력해주세요.");
    const [descriptionColor, setDescriptionColor] = useState("#666"); // Initial color

    useEffect(() => 
    {
        if (value === "") 
        {
            setDescription("비밀번호를 한 번 더 입력해주세요.");
            setDescriptionColor("#666");
        } 
        else if (value !== password) 
        {
            setDescription("비밀번호가 일치하지 않습니다.");
            setDescriptionColor("red");
        } 
        else 
        {
            setDescription("비밀번호가 일치합니다.");
            setDescriptionColor("green");
        }
    }, [value, password]); // Re-run whenever value or password changes

    return (
        <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={value}
                onChange={onChange}
                style={{ width: "120px" }}
            />
            <span className="input-description" style={{ color: descriptionColor }}>
                {description}
            </span>
        </div>
    );
};

export default ConfirmPasswordInput;
