import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import {Link} from "react-router-dom";


const Live = () =>{

    const [liveList, setLiveList] = useState([]);

    // 백엔드 연결
    const getItemList = async () =>{
        const response = await api.liveList();
        const data = await response.data;
        console.log(data);
        setLiveList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);

    // 최근 본 게시물 추가
    const onItemClick = () =>{
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        const updatedPosts = [liveList, ...recentPosts.filter(p => p.id !== liveList.id)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0,2))); // 최근 본 게시물 2개
    };


    return(
        <>
            <h1>SHOW ME THE AUCTION's LIVE</h1>
            <p>쇼미옥 신개념 생방송 스트리밍 경매</p>
            {liveList.map(list => (
                <div key={list.id} className="liveListContainer">
                    <Link to="/live/{id}" onClick={onItemClick}>
                        <div className="itemName">{list.img}</div>
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ))}
        </>
    )
}
export default Live;