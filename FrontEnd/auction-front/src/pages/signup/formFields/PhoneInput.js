const PhoneInput = ({ phone, setFormData, formData }) => (
    <div className="form-group">
        <label htmlFor="phone">휴대전화</label>
        <select
            id="areaCode"
            name="areaCode"
            value={phone.areaCode}
            onChange={(e) => setFormData({
                ...formData,
                phone: { ...phone, areaCode: e.target.value }
            })}
            style={{ width: "98px", height: "33px" }}
            required
        >
            <option value="">선택</option>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
        </select>
        <input
            type="tel"
            name="middle"
            value={phone.middle}
            onChange={(e) => setFormData({
                ...formData,
                phone: { ...phone, middle: e.target.value }
            })}
            placeholder="1234"
            maxLength={4}
            style={{ width: "80px", margin: "0px 0px 0px 2px" }}
            required
        />
        <input
            type="tel"
            name="last"
            value={phone.last}
            onChange={(e) => setFormData({
                ...formData,
                phone: { ...phone, last: e.target.value }
            })}
            placeholder="5678"
            maxLength={4}
            style={{ width: "80px", margin: "0px 0px 0px 2px" }}
            required
        />
        <button className="auth-phone-button">전화번호 인증</button>
        <span className="input-description">인증 가능한 전화번호를 입력하세요.</span>
    </div>
);

export default PhoneInput;
