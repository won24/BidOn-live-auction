import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import {Link} from "react-router-dom";


const Discontiuation = () =>{
    const [discontinuationList, setDiscontiuationList] = useState([]);

    // 백엔드 연결
    const getItemList = async () =>{
        const response = await api.discontinuationList();
        const data = await response.data;
        console.log(data);
        setDiscontiuationList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);

    // 최근 본 게시물
    const onItemClick = () =>{
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        const updatedPosts = [discontinuationList, ...recentPosts.filter(p => p.id !== discontinuationList.id)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0,2))); // 최근 본 게시물 2개
    }; // 게시글 클릭하면 로컬스토리지에 최근 두개까지 저장

    return(
        <>
            {discontinuationList.map(list => (
                <div key={list.id} className="auctionListContainer">
                    <Link to="/auction/discontinuation/{id}" onClick={onItemClick}>
                        <div className="itemName">{list.img}</div>
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ))}
        </>
    )
}
export default Discontiuation;