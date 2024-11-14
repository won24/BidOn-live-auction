import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import "../../css/Postcode.css";

const Postcode = () => 
{
    const [zipCode, setZipcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const completeHandler = (data) => 
    {
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false);
    };

    const customStyles = 
    {
        overlay: 
        {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: 
        {
            position: "absolute", // Allow positioning of close button
            margin: "auto",
            width: "400px",
            height: "500px",
            padding: "30px",
            overflow: "hidden",
        },
    };

    const toggle = () => 
    {
        setIsOpen(!isOpen);
    };

    const changeHandler = (e) => 
    {
        setDetailAddress(e.target.value);
    };

    return (
        <div>
            <input value={zipCode} readOnly placeholder="우편번호" />
            <button className="find-address-button" onClick={toggle}>우편번호 검색</button>
            <br />
            <input value={roadAddress} readOnly placeholder="도로명 주소" />
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} shouldCloseOnOverlayClick={true}>
                <button
                    onClick={toggle}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "gray",
                    }}
                    >
                        ×
                    </button>
                <DaumPostcode onComplete={completeHandler}/>
            </Modal>
            <input
                type="text"
                onChange={changeHandler}
                value={detailAddress}
                placeholder="상세주소"
            />
            <br />
        </div>
    );
};

export default Postcode;
