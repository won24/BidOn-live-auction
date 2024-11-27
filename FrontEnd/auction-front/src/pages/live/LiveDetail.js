import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as api from "../acution/common/AuctionAPIs";
import AuctionTimer from "./AuctionTimer";
import {formatToKoreanDate} from "../acution/detail/FormatDate";
import Bid from "../bid/Bid";
import {getPostImages} from "../acution/common/Images";
import TestPage from "./websocket/TestPage";
import ChatWindow from "./websocket/ChatWindow";


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


    // 즐겨 찾기
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
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
        };

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
                setFav({ userCode, status: true });
            } else {
                await api.deleteFavorite(postId, userCode);
                alert("나의 즐겨찾기에서 삭제되었습니다.");
                setFav({ userCode, status: false });
            }
        } catch (error) {
            console.error("즐겨찾기 상태 변경 중 오류:", error);
        }
    };

    // 뒤로가기
    const movePrevPage = ()=>{
        navigate(-1)
    }

    return (
        <>
            {isLoading ? <p className="boardText">실시간 경매품을 가져오는 중입니다.</p>
                : (<>
                    <h2 className="boardTitle">{board.title}</h2>
                    <button
                        className="favBtn"
                        style={{background: "none", border: "none", cursor: "pointer"}}
                        onClick={favorite}
                    >
                        {fav.status ?
                            (<FontAwesomeIcon icon={faStar} style={{color: "#FFD43B", fontSize: "24px"}}/>)
                            : (<FontAwesomeIcon icon={faStarRegular}
                                                style={{color: "#454545", fontSize: "24px"}}/>)}
                    </button>
                    <Bid/>
                    <hr/>

                    <div className="imageSlider">
                        <button onClick={handlePrev} className="sliderButton" style={{background: "none", border: "none", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faChevronLeft} style={{color: "#454545" , fontSize:"40px"}}/>
                        </button>
                        <img
                            className="sliderImage"
                            src={img[currentImgIndex]}
                            alt={`슬라이드 이미지 ${currentImgIndex + 1}`}
                            loading="lazy"
                        />
                        <button onClick={handleNext} className="sliderButton" style={{background: "none", border: "none", cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faChevronRight} style={{color: "#454545" , fontSize:"40px"}} />
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

                    <p className="live-text">현재가</p>
                    <p className="live-currentCash">여기에 실시간 경매가격 올라가는 거 보여줘야함</p>
                    <p className="live-text">입찰 시작가</p>
                    <div className="live-cash">{board.startCash}</div>
                    <div className="live-timer">{<AuctionTimer startTime={board.startDay} postId={postId} />}</div>
                    <div className="live-startdate">{formatToKoreanDate(board.startDay)}</div>

                    <div>
                        <ChatWindow/>
                    </div>
                    <hr/>

                    <p className="infoText">상세 정보</p>
                    <p className="boardContent">{board.content}</p>
                        <button onClick={movePrevPage}>이전으로</button>
                </>)}
            </>
    )
}
export default LiveDetail;