const BirthInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="birth">생년월일</label>
        <input
            type="date"
            id="birth"
            name="birth"
            value={value}
            onChange={onChange}
            style={{ width: "100px"}}
            required
        />
    </div>
);

export default BirthInput;
