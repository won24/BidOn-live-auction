import { useState } from "react";

const NicknameInput = ({ value, onChange }) => 
{
    const [description, setDescription] = useState("닉네임은 2-10자의 한글, 영문자만 사용 가능합니다.");
    const [descriptionColor, setDescriptionColor] = useState("#666"); // Initial color

    const handleChange = (e) => 
    {
        const nickname = e.target.value;
        onChange(e); // Pass the event to the parent handler
        setDescription(validateNickname(nickname)); // Update the description and color
    };

    const validateNickname = (nickname) => 
    {
        if (nickname.length === 0) 
        {
            setDescriptionColor("#666"); // Reset to initial color
            return "닉네임을 입력하세요.";
        }
        else if (nickname.length < 2 || nickname.length > 10) 
        {
            setDescriptionColor("red");
            return "닉네임은 2-10자여야 합니다.";
        } 
        else if (!/^[a-zA-Z가-힣]*$/.test(nickname)) 
        {
            setDescriptionColor("red");
            return "사용 불가능한 닉네임 형식입니다.";
        } 
        else 
        {
            setDescriptionColor("green");
            return "사용 가능한 닉네임 형식입니다.";
        }
    };

    return(
        <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
                type="text"
                id="nickname"
                name="nickname"
                value={value}
                onChange={handleChange}
                style={{ width: "120px"}}
                maxLength={10}
                required
            />
            <button className="check-button">중복확인</button>
            <span
                className="input-description"
                style={{ color: descriptionColor }}
            >
                {description}
            </span>
        </div>
    )
}

export default NicknameInput;
