import {Link, useNavigate, useParams} from "react-router-dom";
import * as api from "../common/AuctionAPIs";
import {useEffect, useState} from "react";
import LiveDetail from "../../live/LiveDetail";
import '../../../css/AuctionDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {formatToKoreanDate} from "./FormatDate";
import {getPostImages} from "../common/Images";


const AuctionDetailPage = () =>{

    const {postId} = useParams();
    const [board, setBoard] = useState([]);
    const [postStatus, setPostStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const userCode = sessionStorage.getItem("userCode");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    const [fav, setFav] = useState({
        userCode,
        status: false
    })
    const [img, setImg] = useState([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const navigate = useNavigate();


    // 게시글 가져오기
    useEffect( () => {
        const getBoard = async () => {

            try {
                const response = await api.postDetail(postId);
                const data = response.data;
                setBoard(data);
                setPostStatus(data.postStatus);
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

    // 뒤로가기
    const movePrevPage = ()=>{
        navigate(-1)
    }

    // 게시글 삭제
    const onDelete = async () => {

        const response = await api.notUseThisPost(postId);
        console.log("postDelete",response.data);
        alert('삭제 완료')

        navigate('/auction')
    }

    // 게시글 승인
    const changeStatus = async ()=>{
        const response = await api.approval(postId);
        console.log(response.data);
        alert("승인 완료")

        navigate('/auction/{postId}')
    }

    // 관리자 모드
    const renderAdminActions = () => (
        <div>
            <button onClick={() => navigate(-1)}>이전으로</button>
            <Link to={`/auction/update/${postId}`} className="btn">수정</Link>
            {postStatus === "none" && <button className="btn" onClick={changeStatus}>승인</button>}
            <button className="btn" onClick={onDelete}>삭제</button>
        </div>
    );

    // 즐겨찾기 버튼
    const renderFavoriteButton = () => (
        <button className="favBtn" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={favorite}>
            <FontAwesomeIcon icon={fav.status ? faStar : faStarRegular} style={{ color: fav.status ? "#FFD43B" : "#454545", fontSize: "24px" }} />
        </button>
    );

    // 이미지 슬라이드
    const renderImageSlider = () => (
        <div>
            <div className="imageSlider">
                <button onClick={handlePrev} className="sliderButton" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#454545", fontSize: "40px" }} />
                </button>
                <img className="sliderImage" src={img[currentImgIndex]} alt={`슬라이드 이미지 ${currentImgIndex + 1}`} loading="lazy" />
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
        </div>
    );


    // 게시글 상태별 최종 UI
    const renderContent = () => {

        if (postStatus === "on") {
            return <LiveDetail/>
        }

        return (
            <>
                <h2 className="boardTitle">{board.title}</h2>
                {renderFavoriteButton()}
                <p className="boardStatus">{postStatus === "off" && "none" ? "경매 예정" : "낙찰 완료"}</p>
                <hr/>
                <img className="itemImg" src={img[0]} alt={`${board.title}의 이미지`} loading="lazy"/>
                {postStatus === "done" && (
                    <>
                        <p className="finalCashText">최종 낙찰가</p>
                        <p className="finalCash">{board.finalCash}</p>
                    </>
                )}
                <p className="cashText">입찰 시작가</p>
                <p className="Cash">{board.startCash}</p>
                <p className="dateText">경매 날짜</p>
                <p className="date">{formatToKoreanDate(board.startDay)}</p>
                <hr/>
                <p className="infoText">상세 정보</p>
                <p className="boardContent">{board.content}</p>
                {renderImageSlider()}
                {isAdmin ? renderAdminActions()
                    : <button onClick={movePrevPage}>이전으로</button>
                }
            </>
        )
    }


    return (
        <>
            <div>
                {isLoading ? <p className="boardText">해당 경매품의 상세 페이지를 가져오는 중입니다.</p> : renderContent()}
            </div>
        </>
    )
}

export default AuctionDetailPage