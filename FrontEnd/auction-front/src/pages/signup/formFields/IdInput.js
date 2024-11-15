import { useState } from "react";

const IdInput = ({ value, onChange }) => 
{
    const [description, setDescription] = useState("아이디는 5-15자의 영문자 혹은 영문자와 숫자의 조합이어야 합니다.");
    const [descriptionColor, setDescriptionColor] = useState("#666"); // Initial color

    const validateId = (id) => 
    {
        if (id.length === 0) 
        {
            setDescriptionColor("#666"); // Reset to initial color
            return "아이디를 입력해주세요.";
        }
        else if (id.length < 5 || id.length > 15) 
        {
            setDescriptionColor("red");
            return "아이디는 5-15자여야 합니다.";
        } 
        else if (/^\d+$/.test(id)) 
        { 
            // Check if the ID is only a number
            setDescriptionColor("red");
            return "아이디는 숫자만으로 구성될 수 없습니다.";
        }
        else if (!/^[a-zA-Z0-9][a-zA-Z0-9]*$/.test(id)) 
        {
            setDescriptionColor("red");
            return "아이디는 영문자 또는 영문자 + 숫자 조합이어야 합니다.";
        }
        else 
        {
            setDescriptionColor("green");
            return "사용 가능한 아이디 형식입니다.";
        }
    };

    const handleChange = (e) => 
    {
        const id = e.target.value;
        onChange(e); // Pass the event to the parent handler
        setDescription(validateId(id)); // Update the description and color
    };

    return (
        <div className="form-group">
            <label htmlFor="id">아이디</label>
            <input
                type="text"
                id="id"
                name="id"
                value={value}
                onChange={handleChange}
                maxLength={15}
                style={{ width: "120px" }}
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
    );
};

export default IdInput;
