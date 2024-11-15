const PasswordInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
            type="password"
            id="password"
            name="password"
            value={value}
            onChange={onChange}
            style={{ width: "120px"}}
            required
        />
        <span className="input-description">영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 8자리 이상 입력해주세요.</span>
    </div>
);

export default PasswordInput;
