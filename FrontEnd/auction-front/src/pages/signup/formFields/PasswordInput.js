const PasswordInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
            type="password"
            id="password"
            name="password"
            value={value}
            onChange={onChange}
            required
        />
        <span className="input-description">8-20자의 영문, 숫자, 특수문자 중 두 가지 이상을 조합해주세요.</span>
    </div>
);

export default PasswordInput;
