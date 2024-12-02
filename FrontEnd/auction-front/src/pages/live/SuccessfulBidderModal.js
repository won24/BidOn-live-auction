


const SuccessfulBidderModal = ({ isOpen, onClose, bidFinalCash }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>축하합니다!</h2>
                <p>경매에서 낙찰되었습니다.</p>
                <p>최종 낙찰가는 {bidFinalCash.toLocaleString()}원 입니다.</p>
                <p>배송 방법은 택배배송, 방문수거 두 가지 입니다.</p>
                <p>자세한 안내사항은 공지사항을 확인해주세요.</p>
                <button onClick={() => {onClose()}} className="modal-close-button">
                    확인
                </button>
            </div>
        </div>
    );
};

export default SuccessfulBidderModal;