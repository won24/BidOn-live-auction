const GenderInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="gender">성별</label>
        <select
            id="gender"
            name="gender"
            value={value}
            onChange={onChange}
            style={{ width: "98px", height: "33px" }}
            required
        >
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
        </select>
    </div>
);

export default GenderInput;
