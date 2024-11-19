import { useState, useEffect } from "react";

const EmailInput = ({ value, onChange }) => 
{
    const [emailId, setEmailId] = useState("");
    const [domain, setDomain] = useState("");
    const [isCustomDomain, setIsCustomDomain] = useState(false);

    const predefinedDomains = ["gmail.com", "naver.com", "hanmail.net", "직접 입력"];

    // Split the initial value (if provided)
    useEffect(() => 
    {
        if (value) 
        {
            const [initialId, initialDomain] = value.split("@");
            setEmailId(initialId || "");
            setDomain(initialDomain || "");
        }
    }, [value]);

    // Update parent only when emailId or domain changes
    useEffect(() => 
    {
        if (emailId && domain) 
        {
            const newEmail = `${emailId}@${domain}`;
            if (newEmail !== value) 
            {
                onChange({ target: { name: "email", value: newEmail } });
            }
        }
    }, [emailId, domain, onChange, value]);

    const handleEmailIdChange = (e) => setEmailId(e.target.value);

    const handleDomainSelectChange = (e) => 
    {
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
        }
    };

    const handleDomainChange = (e) => setDomain(e.target.value.trim());

    return (
        <div className="form-group">
            <label htmlFor="email">이메일</label>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <input
                    type="text"
                    id="email-id"
                    name="email-id"
                    value={emailId}
                    onChange={handleEmailIdChange}
                    style={{ width: "120px" }}
                    required
                />
                <span>@</span>
                <input
                    type="text"
                    id="domain"
                    name="domain"
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder={isCustomDomain ? "직접 입력" : ""}
                    style={{ width: "120px" }}
                    readOnly={!isCustomDomain}
                    required
                />
                <select
                    id="domain-select"
                    name="domain-select"
                    value={isCustomDomain ? "직접 입력" : domain}
                    onChange={handleDomainSelectChange}
                    style={{ width: "113px", height: "33px" }}
                    required
                >
                    <option value="" disabled>
                        도메인 선택
                    </option>
                    {predefinedDomains.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <button className="auth-email-button">이메일 인증</button>
            </div>
        </div>
    );
};

export default EmailInput;
