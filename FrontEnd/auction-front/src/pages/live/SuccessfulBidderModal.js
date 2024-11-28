


const SuccessfulBidderModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button onClick={onClose} className="modal-close-button">
                    닫기
                </button>
            </div>
        </div>
    );
};

export default SuccessfulBidderModal;