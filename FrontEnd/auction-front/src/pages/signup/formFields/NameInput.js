import { useState } from "react";

const NameInput = ({ value, onChange }) => 
{
    const [description, setDescription] = useState("외국인의 경우 공백 없이 영어로 입력해주세요.");
    const [descriptionColor, setDescriptionColor] = useState("#666"); // Initial color

    const validateName = (name) => 
    {
        if (name.length === 0) 
        {
            setDescriptionColor("#666");
            return "이름을 입력해주세요.";
        }
        else if (!/^[a-zA-Z가-힣][a-zA-Z가-힣]*$/.test(name)) 
        {
            setDescriptionColor("red");
            return "한글과 영문자만 입력할 수 있습니다.";
        }
        else 
        {
            return "";
        }
    };

    const handleChange = (e) => 
    {
        const name = e.target.value;
        onChange(e); 
        setDescription(validateName(name));
    };

    return(
        <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
                type="text"
                id="name"
                name="name"
                value={value}
                onChange={handleChange}
                style={{ width: "120px"}}
                required
            />
            <span
                className="input-description"
                style={{ color: descriptionColor }}
            >
                {description}
            </span>
        </div>
    )
};

export default NameInput;
