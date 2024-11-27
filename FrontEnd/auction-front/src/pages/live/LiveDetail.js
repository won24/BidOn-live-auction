import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as api from "../acution/common/AuctionAPIs";
import AuctionTimer from "./AuctionTimer";
import {formatToKoreanDate} from "../acution/detail/FormatDate";
import {getPostImages} from "../acution/common/Images";
import ChatWindow from "./websocket/ChatWindow";
import ImageModal from "../acution/detail/ImageModal";
import '../../css/LiveDetail.css'


const LiveDetail = () =>{
    const {postId} = useParams();
    const [board, setBoard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userCode = sessionStorage.getItem("userCode");
    const [fav, setFav] = useState({
        userCode,
        status: false
    })
    const [img, setImg] = useState([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    // 경매품 정보 가져오기
    useEffect( () => {
        const getBoard = async () => {

            try {
                const response = await api.postDetail(postId);
                const data = response.data;
                setBoard(data);

                const imageUrls = await getPostImages(postId);
                setImg(imageUrls);
            } catch (error) {
                console.error("게시글 데이터를 불러오는 중 오류가 발생했습니다:", error);
            }finally {
                setIsLoading(false)
            }
        };

        setIsLoading(true);
        getBoard()
    },[]);


    // 이미지 슬라이드
    const handlePrev = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : img.length - 1));
    };
    const handleNext = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex < img.length - 1 ? prevIndex + 1 : 0));
    };
    // 썸네일 클릭 시 슬라이드 이미지 변경
    const handleThumbnailClick = (index) => {
        setCurrentImgIndex(index);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    // 즐겨 찾기
    const fetchFavoriteStatus = async () => {
        if (userCode !== null){
            try {
                const response = await api.getMyFav(postId, userCode);
                const data = response.data;
                if (data && data.length > 0) {
                    setFav({
                        userCode: userCode,
                        status: data[0].status,
                    });
                }
            } catch (error) {
                console.error("즐겨찾기 상태를 가져오는 중 오류:", error);
            }
        }
    };

    useEffect(() => {
        fetchFavoriteStatus();
    }, [postId, userCode]);

    const favorite = async () => {

        try {
            if (!userCode) {
                alert("로그인이 필요합니다.");
                return;
            }

            if (!fav.status) {
                await api.addFavorite(postId, userCode);
                alert("나의 즐겨찾기에 추가되었습니다.");
            } else {
                await api.deleteFavorite(postId, userCode);
                alert("나의 즐겨찾기에서 삭제되었습니다.");
            }
            setFav({ ...fav, status: !fav.status });
        } catch (error) {
            console.error("즐겨찾기 상태 변경 중 오류:", error);
        }
    };

    // 이미지 슬라이드
    const renderImageSlider = () => (
        <div>
            <div className="imageSlider">
                <button onClick={handlePrev} className="sliderButton" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#454545", fontSize: "40px" }} />
                </button>
                <img className="sliderImage"
                     src={img[currentImgIndex]}
                     alt={`슬라이드 이미지 ${currentImgIndex + 1}`}
                     onClick={openModal}
                     loading="lazy" />
                <button onClick={handleNext} className="sliderButton" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#454545", fontSize: "40px" }} />
                </button>
            </div>

            <div className="thumbnailContainer">
                {img.map((image, index) => (
                    <img
                        key={index}
                        className={`thumbnail ${index === currentImgIndex ? "activeThumbnail" : ""}`}
                        src={image}
                        alt={`썸네일 ${index + 1}`}
                        onClick={() => handleThumbnailClick(index)}
                        loading="lazy"
                    />
                ))}
            </div>
            {isModalOpen && (
                <ImageModal
                    img={img}
                    currentImgIndex={currentImgIndex}
                    onClose={closeModal}
                />
            )}
        </div>
    );

    // 목록으로
    const moveList = ()=>{
        navigate('/live')
    }

    return (
        <>
            {isLoading ? <p className="boardText">실시간 경매품을 가져오는 중입니다.</p>
                : (
                    <div className="live-detail-page">
                        <div className="live-detail-page_top">
                            <div className="live-detail-page_top_left">
                                <h2 className="live-detail-page_title">{board.title}</h2>
                                <button className="favBtn" style={{background: "none", border: "none", cursor: "pointer"}} onClick={favorite}>
                                    <FontAwesomeIcon icon={fav.status ? faStar : faStarRegular}
                                                     style={{color: fav.status ? "#FFD43B" : "#454545", fontSize: "24px"}}/>
                                </button>
                            </div>
                            <p className="detail-page_boardStatus">| 경매중 |</p>
                        </div>
                        <hr className="top_line"/>

                        <div className="live-detail-page_timer">
                            {<AuctionTimer startTime={board.startDay} postId={postId}/>}
                        </div>

                        <div className="live-detail-page_middle">

                            <div className="live-detail-page_leftSide">
                                <div className="live-detail-page_img">
                                    {renderImageSlider()}
                                </div>
                                <div className="live-detail-page_info">
                                    <div className="live-detail-page_info_text">
                                        <p className="live-detail-page_text">입찰 시작가</p>
                                        <p className="live-detail-page_text">경매 날짜</p>
                                    </div>
                                    <div className="live-detail-page_info_value">
                                        <div className="live-detail-page_cash">{board.startCash}</div>
                                        <div className="live-detail-page_date">
                                            {formatToKoreanDate(board.startDay)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="live-detail-page_rightSide">
                                <ChatWindow/>
                            </div>
                        </div>
                        <hr/>

                        <p className="live-detail-page_infoText">상세 정보</p>
                        <div className="content-display" style={{whiteSpace: "pre-wrap"}}>
                            {board.content}
                        </div>

                        <div className="live-detail-page_bottom">
                            <button onClick={moveList} className="detail-page_backButton">목록</button>
                        </div>
                    </div>
                )}
        </>
    )
}
export default LiveDetail;