import { useState } from "react";

const EmailInput = ({ value, onChange }) => 
{
    const [emailId, setEmailId] = useState(value.split("@")[0] || "");
    const [domain, setDomain] = useState(value.split("@")[1] || "");
    const [isCustomDomain, setIsCustomDomain] = useState(false);

    const predefinedDomains = ["gmail.com", "naver.com", "daum.net", "hanmail.net", "직접 입력"];

    const handleEmailIdChange = (e) => 
    {
        setEmailId(e.target.value);
        onChange(`${e.target.value}@${domain}`);
    };

    const handleDomainSelectChange = (e) => 
    {
        if (!e?.target?.value)        
        {
            return;
        }
        const selectedDomain = e.target.value;
        if (selectedDomain === "직접 입력") 
        {
            setIsCustomDomain(true);
            setDomain("");
        } 
        else 
        {
            setIsCustomDomain(false);
            setDomain(selectedDomain);
            onChange(`${emailId}@${selectedDomain}`);
        }
    };

    const handleDomainChange = (e) => 
    {
        setDomain(e.target.value);
        onChange(`${emailId}@${e.target.value}`);
    };

    return (
        <div className="form-group">
            <label htmlFor="email">이메일</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {/* Email ID Input (Box 1) */}
                <input
                    type="text"
                    id="email-id"
                    name="email-id"
                    value={emailId}
                    onChange={handleEmailIdChange}
                    style={{ width: "120px"}}
                    required
                />

                <span>@</span>

                {/* Domain Input (Box 2) */}
                <input
                    type="text"
                    id="domain"
                    name="domain"
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder={isCustomDomain ? "직접 입력" : ""}
                    style={{ width: "120px"}}
                    readOnly={!isCustomDomain}
                    required
                />

                {/* Domain Select (Box 3) */}
                <select
                    id="domain-select"
                    name="domain-select"
                    value={isCustomDomain ? "직접 입력" : domain}
                    onChange={handleDomainSelectChange}
                    style={{ width: "113px", height: "33px" }}
                    required
                >
                    <option value="" disabled>도메인 선택</option>
                    {predefinedDomains.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <button className="auth-email-button">이메일 인증</button>
                <span className="input-description">인증 가능한 이메일 주소를 입력하세요.</span>
            </div>
        </div>
    );
};

export default EmailInput;
