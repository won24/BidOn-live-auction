import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import {Link} from "react-router-dom";


const Auction = () =>{

    const [auctionList, setAuctionList] = useState([]);

    // 백엔드 연결
    const getItemList = async () =>{
        const response = await api.totalAuctionList();
        const data = await response.data;
        console.log(data);
        setAuctionList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);

    // 최근 본 게시물
    const onItemClick = () =>{
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        const updatedPosts = [auctionList, ...recentPosts.filter(p => p.id !== auctionList.id)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0,2))); // 최근 본 게시물 2개
    }; // 게시글 클릭하면 로컬스토리지에 최근 두개까지 저장

    return(
        <>
            {auctionList.map(list => (
                <div key={list.id} className="auctionListContainer">
                    <Link to="/auction/{id}" onClick={onItemClick}>
                        <div className="itemName">{list.img}</div>
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ))}
        </>
    )
}
export default Auction;