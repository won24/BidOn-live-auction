import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import {Link} from "react-router-dom";


const Auction = () =>{

    const [auctionList, setAuctionList] = useState([]);

    // 백엔드 연결
    const getItemList = async () =>{
        const response = await api.totalAuctionList();
        const data = await response.data;
        setAuctionList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);

    // 최근 본 게시물
    const onItemClick = (list) => {
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        console.log("recentPosts :", recentPosts)

        const updatedPosts = [list, ...recentPosts.filter(p => p.postId !== list.postId)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0, 2))); // 최근 본 게시물 2개
    };

    return(
        <>
            <h2>경매 물품 전체보기</h2>
            <p>쇼미옥의 경매 물품</p>
            <a href="/auction/antique">골동품</a>
            <a href="/auction/limited">한정판</a>
            <a href="/auction/discontinuation">단종품</a>
            <a href="/auction/artproduct">예술품</a>
            <a href="/auction/valuables">귀중품</a>

            <select name="sort" id="sort">
                <option value="favorite">인기순</option>
                <option value="new">최신순</option>
                <option value="last">오래된순</option>
            </select>
            <hr/>

            {auctionList.map(list => (
                <div key={list.postId} className="auctionListContainer">
                    <Link to={`/auction/${list.postId}`} onClick={onItemClick}>
                        <img className="itemImg" src={list.imageUrl} alt="경매품 이미지"/>
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ))}
        </>
    )
}
export default Auction;