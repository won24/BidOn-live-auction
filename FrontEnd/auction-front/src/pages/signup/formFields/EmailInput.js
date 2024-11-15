const EmailInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
            type="email"
            id="email"
            name="email"
            value={value}
            onChange={onChange}
            required
        />
        <span className="input-description">사용 가능한 이메일 주소를 입력하세요.</span>
    </div>
);

export default EmailInput;
