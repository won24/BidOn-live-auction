import {useParams} from "react-router-dom";
import * as api from "../../../apis/AuctionItem";
import {useEffect, useState} from "react";
import LiveDetail from "../../live/LiveDetail";
import '../../../css/AuctionDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


const AuctionDetailPage = () =>{

    const {postId} = useParams();
    const [board, setBoard] = useState({});
    const [postStatus, setPostStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const userCode = sessionStorage.getItem("userCode");
    const [fav, setFav] = useState({
        userCode: userCode,
        status: false
    })


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
    },[])



    // 즐겨 찾기
    const updateFavoriteStatus = (userCode, status) => {
        setFav({ userCode, status });
        console.log(`${userCode}, ${status ? "즐겨찾기 추가 성공" : "즐겨찾기 해제"}`);
    };

    const favorite = async () => {
        try {
            if (userCode === null) {
                alert("로그인이 필요합니다.");
                return;
            }

            if (fav.status === false) {
                console.log(`${userCode}, 즐겨찾기 추가 요청`);
                await api.addFavorite(postId, userCode);
                updateFavoriteStatus(userCode, true);
                alert("나의 즐겨찾기에 추가되었습니다.")
            } else if (fav.status === true && userCode === fav.userCode) {
                console.log(`${userCode}, 즐겨찾기 해제 요청`);
                await api.deleteFavorite(postId, userCode);
                updateFavoriteStatus(userCode, false);
                alert("나의 즐겨찾기에서 삭제 되었습니다.")
            }
        } catch (error) {
            console.error(
                `${fav.status === false ? "즐겨찾기 추가" : "즐겨찾기 해제"} 중 오류:`,
                error
            );
        }
    };

    useEffect(() => {
        console.log("즐겨찾기 상태 업데이트:", fav);
    }, [fav]);


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
                            {fav.status?
                                (<FontAwesomeIcon icon={faStar} style={{color: "#FFD43B", fontSize: "24px" }} />)
                                :(<FontAwesomeIcon icon={faStarRegular} style={{ color: "#454545", fontSize: "24px" }} />)}
                        </button>
                        <p className="boardStatus">경매 예정</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={board.imageUrl}
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
                        <img className="boardContentImg"
                             src={board.imageUrl}
                             alt={`${board.title}의 상세 이미지`}
                             loading="lazy"
                        />
                    </>
                )
            case "done":
                return (
                    <>
                        <h2 className="boardTitle">{board.title}</h2>
                        <button onClick={favorite} className="favBtn">즐겨찾기</button>
                        <p className="boardStatus">낙찰 완료</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={board.imageUrl}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p className="finalCashText">최종 낙찰가</p>
                        <p className="finalCash">{board.finalCash}</p>
                        <p className="cashText">입찰 시작가</p>
                        <p className="Cash">{board.startCash}</p>
                        <p className="dateText">경매 날짜</p>
                        <p className="date">{board.startDay}</p>
                        <hr/>
                        <p className="infoText">상세 정보</p>
                        <p className="boardContent">{board.content}</p>
                        <img className="boardContentImg"
                             src={board.imageUrl}
                             alt={`${board.title}의 상세 이미지`}
                             loading="lazy"
                        />
                    </>
                )
            default:
                return  <p className="boardText">해당 경매품의 상세 페이지를 불러 올 수 없습니다.</p>
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