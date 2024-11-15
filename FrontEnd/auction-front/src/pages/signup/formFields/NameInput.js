const NameInput = ({ value, onChange }) => (
    <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
            type="text"
            id="name"
            name="name"
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

export default NameInput;
