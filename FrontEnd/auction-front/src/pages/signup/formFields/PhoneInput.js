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
            style={{ width: "80px", margin: "0px 0px 0px 2px" }}
            required
        />
    </div>
);

export default PhoneInput;
