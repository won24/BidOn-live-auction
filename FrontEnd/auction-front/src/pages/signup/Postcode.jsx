/**
 * Postcode.jsx
 * 회원가입 페이지 정보입력 과정 중 주소를 담당
 * 
 * Nov 14,
 * 상세주소를 제외한 입력부는 read-only로, 사용자가 입력할 수 없도록 설정 (완료)
 * required 설정을 추가하여 반드시 '우편번호 검색' 버튼을 눌러 주소를 입력하도록 유도 (완료)
 * 
 * '우편번호 검색' 버튼을 누르면,
 * X) 팝업 형태로 주소 검색창을 띄움 (취소)
 * 1) <iframe> 형태로 페이지 바로 위에 플랫한 주소 검색창을 띄움 (완료)
 * 
 * 사용자가 주소를 입력하면, (도로명, 지번 검색 가능)
 * 1) 검색 결과에 따라 도로명, 지번 주소 중 하나를 선택할 수 있음
 * 2) 현재는 선택 결과와 무관하게 도로명주소가 결과로 입력됨 (변경 가능하지만 굳이?)
 * 3) [우편번호] + 도로명주소 + 상세주소 + 참고항목(지번주소의 '동' 부분)의 형태로 DB에 저장 (완료)
 * 
 * Shout out to DAUM KAKAO API
 */

import { useState, useEffect } from "react";
import "../../css/Postcode.css";

const Postcode = ({ onAddressSelect }) => 
{
    const [zipCode, setZipcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [extraAddr, setExtraAddr] = useState("");
    const [isLayerOpen, setIsLayerOpen] = useState(false);

    // Function to handle postcode completion
    const completeHandler = (data) => 
    {
        let extra = "";
        if (data.userSelectedType === "R") 
        {
            if (data.bname && /[동|로|가]$/g.test(data.bname)) 
            {
                extra += data.bname;
            }
            if (data.buildingName && data.apartment === "Y") 
            {
                extra += (extra ? ", " : "") + data.buildingName;
            }
        }

        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setExtraAddr(extra);

        // Send structured address data to parent component
        onAddressSelect(
        {
            zipCode: data.zonecode,
            roadAddress: data.roadAddress,
            extraAddr: extra,
            detailAddress: detailAddress
        });
        setIsLayerOpen(false);
    };

    const handleDetailAddressChange = (e) => 
    {
        const updatedDetailAddress = e.target.value;
        setDetailAddress(updatedDetailAddress);
        onAddressSelect(
        {
            zipCode: zipCode,
            roadAddress: roadAddress,
            extraAddr: extraAddr,
            detailAddress: updatedDetailAddress
        });
    };

    // Function to toggle the postcode search layer
    const toggleLayer = () => setIsLayerOpen((prev) => !prev);

    // Close the postcode search layer
    const closeLayer = () => setIsLayerOpen(false);

    // Initialize and position the postcode layer
    const initLayerPosition = () => 
    {
        const elementLayer = document.getElementById("layer");
        const width = 300;
        const height = 400;
        const borderWidth = 5;

        elementLayer.style.width = `${width}px`;
        elementLayer.style.height = `${height}px`;
        elementLayer.style.border = `${borderWidth}px solid`;
        elementLayer.style.left = `${(window.innerWidth || document.documentElement.clientWidth) / 2 - width / 2 - borderWidth}px`;
        elementLayer.style.top = `${(window.innerHeight || document.documentElement.clientHeight) / 2 - height / 2 - borderWidth}px`;
    };

    useEffect(() => 
    {
        if (isLayerOpen) 
        {
            new window.daum.Postcode(
            {
                oncomplete: completeHandler,
                width: "100%",
                height: "100%",
                maxSuggestItems: 5,
            }).embed(document.getElementById("layer"));
            initLayerPosition();
        }
    }, [isLayerOpen]);

    return (
        <div className="address-input-container">
            <input
                className="zipCode"
                value={zipCode}
                readOnly
                required
                placeholder="우편번호"
                style={{ width: "280px", margin: "0px 6px 2px 0px" }}
            />
            <button className="find-address-button" onClick={toggleLayer}>
                우편번호 검색
            </button>
            <br />
            <input 
                value={roadAddress}
                readOnly
                placeholder="도로명 주소"
                style={{ width: "280px", margin: "0px 6px 2px 0px" }}
            />
            <input
                type="text"
                value={extraAddr}
                placeholder="참고항목"
                style={{ width: "96px", margin: "-2px 0px 2px 0px" }}
                readOnly
            />
            <br />
            <input
                type="text"
                onChange={handleDetailAddressChange}
                value={detailAddress}
                placeholder="상세주소"
                style={{ margin: "0px 0px 5px 0px" }}

                required
            />
            <br />

            {/* Postcode layer */}
            {isLayerOpen && (
                <div
                    id="layer"
                    style={{
                        display: "block",
                        position: "fixed",
                        overflow: "hidden",
                        zIndex: 1,
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <img
                        src="//t1.daumcdn.net/postcode/resource/images/close.png"
                        id="btnCloseLayer"
                        style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "-3px",
                            top: "-3px",
                            zIndex: 1,
                        }}
                        onClick={closeLayer}
                        alt="닫기 버튼"
                    />
                </div>
            )}
        </div>
    );
};

export default Postcode;
