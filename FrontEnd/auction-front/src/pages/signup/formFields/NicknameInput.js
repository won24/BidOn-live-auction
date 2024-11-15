const NicknameInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="nickname">닉네임</label>
        <input
            type="text"
            id="nickname"
            name="nickname"
            value={value}
            onChange={onChange}
            required
        />
        <span className="input-description">닉네임은 2-8자의 한글, 영문자만 사용 가능합니다.</span>
    </div>
);

export default NicknameInput;
