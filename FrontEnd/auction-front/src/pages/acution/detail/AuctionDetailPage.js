import {useParams} from "react-router-dom";
import * as api from "../../../apis/AuctionItem";
import {useEffect, useState} from "react";
import LiveDetail from "../../live/LiveDetail";


const AuctionDetailPage = () =>{

    const {postId} = useParams();
    const [board, setBoard] = useState({});
    const [postStatus, setPostStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [logintest,setLoginTest] = useState({
        UserCode: 7,
        Id: 'user7', Password: 'password7',
        Name: '나야,오류', email: 'user7@example.com',
        phone: '010-7777-7777', birthDate: '1996-07-07',
        address: '울산시 남구', cash: 7000, gender: '남',
        isAdult: 'y',isAdmin: 'n', nickName: 'nickname7',
        isSuspended: 'n'
    });

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

    const addFavorite = () =>{

        alert("즐겨찾기에 추가 되었습니다.")
     //   getBoard(); // 즐겨찾기 업데이트해서 데이터 가져오기
    }


    const showDetailPage = (postStatus) =>{

        switch (postStatus) {
            case "on":
                return <LiveDetail/>
            case "off":
                return (
                    <>
                        <h2>{board.title}</h2>
                        <button onClick={addFavorite}>즐겨찾기</button>
                        <p>경매 에정</p>
                        <hr/>
                        <img
                            className="itemImg"
                            src={board.imageUrl}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p>입찰 시작가</p>
                        <p>{board.startCash}</p>
                        <p>경매 날짜</p>
                        <p>{board.startDay}</p>
                        <hr/>
                        <p>상세 정보</p>
                        <p>{board.content}</p>
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
                        <h2>{board.title}</h2>
                        <p>낙찰 완료</p>
                        <button onClick={addFavorite}>즐겨찾기</button>
                        <hr/>
                        <img
                            className="itemImg"
                            src={board.imageUrl}
                            alt={`${board.title}의 이미지`}
                            loading="lazy"
                        />
                        <p>최종 낙찰가</p>
                        <p>{board.finalCash}</p>
                        <p>입찰 시작가</p>
                        <p>{board.startCash}</p>
                        <p>경매 날짜</p>
                        <p>{board.startDay}</p>
                        <hr/>
                        <p>상세 정보</p>
                        <p>{board.content}</p>
                        <img className="boardContentImg"
                             src={board.imageUrl}
                             alt={`${board.title}의 상세 이미지`}
                             loading="lazy"
                        />
                    </>
                )
            default:
                return  <p>해당 경매품의 상세 페이지를 불러 올 수 없습니다.</p>
        }
    }


    return (
        <>
            <div>
                {isLoading ? <p>해당 경매품의 상세 페이지를 가져오는 중입니다.</p> : showDetailPage(postStatus)}
            </div>
        </>
    )
}

export default AuctionDetailPage