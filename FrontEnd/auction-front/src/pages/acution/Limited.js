import {useEffect, useState} from "react";
import * as api from "../../apis/AuctionItem";
import {Link} from "react-router-dom";


const Limited = () =>{
    const [limitedList, setLimitedList] = useState([]);

    // 백엔드 연결
    const getItemList = async () =>{
        const response = await api.limitedList();
        const data = await response.data;
        console.log(data);
        setLimitedList(data);
    };

    useEffect(() => {
        getItemList();
    }, []);
    // 메인페이지에서 한정판 로고 클릭 시 오류 화면 잠깐 뜨면서 limited 페이지로 들어감
    // 백엔드 연결 부분 부터 useEffect 부분까지 주석처리 시 오류 없이 매끄럽게 들어감
    // (백엔드 코드 구현 시 없어질 것으로 예상)


    // 최근 본 게시물
    const onItemClick = () =>{
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        const updatedPosts = [limitedList, ...recentPosts.filter(p => p.id !== limitedList.id)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0,2))); // 최근 본 게시물 2개
    }; // 게시글 클릭하면 로컬스토리지에 최근 두개까지 저장

    return(
        <>
            <h1>한정판 Limited</h1>
            <input placeholder="현재 카테고리에서 검색"/>
            <select name="sort" id="sort">
                <option value="favorite">인기순</option>
                <option value="new">최신순</option>
                <option value="last">오래된순</option>
            </select>
            <hr/>
            {limitedList.map(list => (
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
export default Limited;