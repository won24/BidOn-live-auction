import Postcode from '../Postcode';

const AddressInput = ({ onAddressSelect }) => (
    <div className="form-group">
        <label htmlFor="address">주소</label>
        <Postcode onAddressSelect={onAddressSelect} />
    </div>
);

export default AddressInput;
