import {Link, useNavigate, useParams} from "react-router-dom";
import * as api from "../common/AuctionAPIs";
import {useEffect, useState} from "react";
import LiveDetail from "../../live/LiveDetail";
import '../../../css/AuctionDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {useLogin} from "../../login/LoginContext";
import {formatToKoreanDate} from "./FormatDate";


const AuctionDetailPage = () =>{

    const {postId} = useParams();
    const [board, setBoard] = useState([]);
    const [postStatus, setPostStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const userCode = sessionStorage.getItem("userCode");
    const { user } = useLogin();
    const [fav, setFav] = useState({
        userCode: userCode,
        status: false
    })
    const [img, setImg] = useState([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const navigate = useNavigate();


    const getBoard = async () => {

        setIsLoading(true);

        try {
            const response = await api.postDetail(postId);
            const data = response.data;
            setBoard(data);
            setPostStatus(data.postStatus);
        } catch (error) {
            console.error("게시글 데이터를 불러오는 중 오류가 발생했습니다:", error);
        }finally {
            setIsLoading(false)
        }
    };

    useEffect( () => {
        getBoard()
    },[]);


    // 이미지 가져오기
    const getImg = async () => {

        setIsLoading(true);

        try {
            const response = await api.getBoardImg(postId);
            const data = response.data;
            console.log(data);

            const imageUrls = data.map(item => item.imageUrl);
            setImg(imageUrls);
        } catch (error) {
            console.error("게시글 이미지를 불러오는 중 오류가 발생했습니다:", error);
        }finally {
            setIsLoading(false)
        }
    };

    useEffect( () => {
        getImg();
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
                console.log("비상")
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

    const movePrevPage = ()=>{
        navigate(-1)
    }

    const onDelete = async () => {

        const response = await api.notUseThisPost(postId);
        console.log("postDelete",response.data);
        alert('삭제 완료')

        navigate('/auction')
    }

    const changeStatus = async ()=>{
        const response = await api.approval(postId);
        console.log(response.data);
        alert("승인 완료")

        navigate('/auction/{postId}')
    }

    const showDetailPage = (postStatus) =>{

        switch (postStatus) {
            case "on":
                return <LiveDetail/>
            case "off":
                return (
                    <>
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
                        <p className="boardStatus">경매 예정</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={img[0]}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p className="cashText">입찰 시작가</p>
                        <p className="Cash">{board.startCash}</p>
                        <p className="dateText">경매 날짜</p>
                        <p className="date">{formatToKoreanDate(board.startDay)}</p>
                        <hr/>
                        <p className="infoText">상세 정보</p>
                        <p className="boardContent">{board.content}</p>
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
                        {user?.isAdmin?
                            (<div>
                                    <button onClick={movePrevPage}>이전으로</button>
                                    <Link to={`/auction/update/${postId}`} className='btn'>수정</Link>
                                    <button className='btn' onClick={onDelete}>삭제</button>
                                </div>
                            ):(
                                <>
                                    <button onClick={movePrevPage}>이전으로</button>
                                </>
                            )
                        }
                    </>
                )
            case "done":
                return (
                    <>
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
                        <p className="boardStatus">낙찰 완료</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={img[0]}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p className="finalCashText">최종 낙찰가</p>
                        <p className="finalCash">{board.finalCash}</p>
                        <p className="cashText">입찰 시작가</p>
                        <p className="Cash">{board.startCash}</p>
                        <p className="dateText">경매 날짜</p>
                        <p className="date">{formatToKoreanDate(board.startDay)}</p>
                        <hr/>
                        <p className="infoText">상세 정보</p>
                        <p className="boardContent">{board.content}</p>
                        <div className="imageSlider">
                            <button onClick={handlePrev} className="sliderButton"
                                    style={{background: "none", border: "none", cursor: "pointer"}}>
                                <FontAwesomeIcon icon={faChevronLeft} style={{color: "#454545", fontSize: "40px"}}/>
                            </button>
                            <img
                                className="sliderImage"
                                src={img[currentImgIndex]}
                                alt={`슬라이드 이미지 ${currentImgIndex + 1}`}
                                loading="lazy"
                            />
                            <button onClick={handleNext} className="sliderButton"
                                    style={{background: "none", border: "none", cursor: "pointer"}}>
                                <FontAwesomeIcon icon={faChevronRight} style={{color: "#454545", fontSize: "40px"}}/>
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
                            {user?.isAdmin?
                                (<div>
                                        <button onClick={movePrevPage}>이전으로</button>
                                        <Link to={`/auction/update/${postId}`} className='btn'>수정</Link>
                                        <button className='btn' onClick={changeStatus}>승인</button>
                                        <button className='btn' onClick={onDelete}>삭제</button>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={movePrevPage}>이전으로</button>
                                    </>
                                )
                            }
                        </>
                )
            case "none":
                return (
                    <>
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
                        <p className="boardStatus">경매 예정</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={img[0]}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p className="cashText">입찰 시작가</p>
                        <p className="Cash">{board.startCash}</p>
                        <p className="dateText">경매 날짜</p>
                        <p className="date">{board.startDay}</p>
                        <hr/>
                        <p className="infoText">상세 정보</p>
                        <p className="boardContent">{board.content}</p>
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
                        {user?.isAdmin?
                            (<div>
                                    <button onClick={movePrevPage}>이전으로</button>
                                    <Link to={`/auction/update/${postId}`} className='btn'>수정</Link>
                                    <button className='btn' onClick={changeStatus}>승인</button>
                                    <button className='btn' onClick={onDelete}>삭제</button>
                                </div>
                            ):(
                                <>
                                    <button onClick={movePrevPage}>이전으로</button>
                                </>
                            )
                        }
                    </>
                )
            default:
                return <p className="boardText">해당 경매품의 상세 페이지를 불러 올 수 없습니다.</p>
        }
    }


    return (
        <>
            <div>
                {isLoading ? <p className="boardText">해당 경매품의 상세 페이지를 가져오는 중입니다.</p> : showDetailPage(postStatus)}
            </div>
        </>
    )
}

export default AuctionDetailPage