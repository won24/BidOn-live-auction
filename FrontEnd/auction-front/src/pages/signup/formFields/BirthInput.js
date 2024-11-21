const BirthInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="birth">생년월일</label>
        <input
            type="date"
            id="birth"
            name="birth"
            value={value}
            onChange={onChange}
            style={{ width: "120px"}}
            required
        />
        {/* <span className="input-description">법정 생년월일을 입력해주세요.</span> */}
    </div>
);

export default BirthInput;
