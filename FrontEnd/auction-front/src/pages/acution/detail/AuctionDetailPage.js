import {useParams} from "react-router-dom";
import * as api from "../../../apis/AuctionItem";
import {useEffect, useState} from "react";


const AuctionDetailPage = () =>{

    const {postId} = useParams();

    const [board, setBoard] = useState({});


    const getBoard = async () => {

        const response = await api.postDetail(postId);
        const data = response.data;
        setBoard(data);
    }

    useEffect( () => {
        getBoard()
    },[])


    return(
        <>
            <h2>{board.title}</h2>
            <p>{board.postStatus}</p>
            <hr/>
            <img className="boardImg" src={board.imageUrl} alt="경매품 이미지"/>
            <p>입찰 시작가</p>
            <p>{board.currentCash}</p>
            <p>경매 날짜</p>
            <p>{board.startDay}</p>
            <hr/>
            <p>{board.content}</p>
        </>
    )
}

export default AuctionDetailPage