import {useState} from "react";


const ImageModal = ({ img, currentImgIndex, onClose }) => {
    const [modalScale, setModalScale] = useState(1);

    const handleZoomIn = () => setModalScale((prev) =>
        Math.min(prev + 0.2, 3));

    const handleZoomOut = (e) => {
        e.preventDefault(); // 우클릭 방지
        setModalScale((prev) => Math.max(prev - 0.2, 1))
    };


    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img
                    className="modal-image"
                    src={img[currentImgIndex]}
                    alt="확대 이미지"
                    style={{
                        transform: `scale(${modalScale})`,
                        transition: "transform 0.3s ease",
                    }}
                    onClick={handleZoomIn} // 클릭으로 확대
                    onContextMenu={handleZoomOut} // 우클릭으로 축소
                />
                <span className="close" onClick={onClose}>&times;</span>
            </div>
        </div>
    );
};

export default ImageModal;