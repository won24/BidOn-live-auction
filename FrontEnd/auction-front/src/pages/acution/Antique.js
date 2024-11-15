import { useEffect, useState } from "react";
import * as api from "../../apis/AuctionItem";
import { Link } from "react-router-dom";


const Antique = () => {
    const [antiqueList, setAntiqueList] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [searchItemList, setSearchItemList] = useState([]);
    const [categoryCode, setCategoryCode] = useState("");


    // 백엔드 연결 -> 전체목록
    const getItemList = async () => {
        const response = await api.antiqueList();
        const data = await response.data;
        const categoryCode = data[0].categoryCode;
        setAntiqueList(data);
        setCategoryCode(categoryCode)
    };

    useEffect(() => {
        getItemList();
    }, []);


    // 최근 본 게시글
    const onItemClick = (list) => {
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        console.log("recentPosts :", recentPosts)
        console.log("리스트 : ",list)

        const updatedPosts = [list, ...recentPosts.filter(p => p.postId !== list.postId)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0, 2))); // 최근 본 게시물 2개
    };


    // 검색해서 물건 찾기
    const onValueGet = (e) => {
        setSearchItem(e.target.value);
    }

    const search = async (e) => {
        e.preventDefault();  // 페이지 리로드를 막을라고

        if (!searchItem.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            const response = await api.searchItemList(searchItem, categoryCode);
            const data = await response.data;
            setSearchItemList(data);
            console.log("검색 결과:", data);
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };




    return (
        <>
            <h1>앤티크 Antique</h1>

            <form onSubmit={search}>
                <input
                    placeholder="현재 카테고리에서 검색"
                    value={searchItem}
                    onChange={onValueGet}
                />
                <button type="submit">검색</button>
            </form>

            <select name="sort" id="sort">
                <option value="favorite">인기순</option>
                <option value="new">최신순</option>
                <option value="last">오래된순</option>
            </select>

            <hr/>
            <div className="auctionListContainer">
                {(searchItemList.length > 0 ? searchItemList : antiqueList).map((list) => (
                    <div key={list.postId} className="auctionItem">
                        <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                            <img className="itemImg" src={list.imageUrl} alt="경매품 이미지"/>
                            <h2 className="itemTitle">{list.title}</h2>
                        </Link>
                    </div>
                ))}
                {searchItemList.length === 0 && antiqueList.length === 0 && (
                    <p>해당하는 경매품이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default Antique;
