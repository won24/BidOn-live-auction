const IdInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="id">아이디</label>
        <input
            type="text"
            id="id"
            name="id"
            value={value}
            onChange={onChange}
            required
        />
        <span className="input-description">아이디는 5-20자의 영문자, 숫자 조합이어야 합니다.</span>
    </div>
);

export default IdInput;
