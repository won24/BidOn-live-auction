const ConfirmPasswordInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={value}
            onChange={onChange}
            required
        />
        <span className="input-description">비밀번호를 한 번 더 입력해주세요.</span>
    </div>
);

export default ConfirmPasswordInput;
