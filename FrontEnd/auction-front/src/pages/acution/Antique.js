import { useEffect, useState } from "react";
import * as api from "../../apis/AuctionItem";
import { Link } from "react-router-dom";
import {updateRecentPosts} from "../../components/aside/RecentlyView";


const Antique = () => {
    const [antiqueList, setAntiqueList] = useState([]);
    const [onList, setOnList] = useState([]);
    const [offList, setOffList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [searchItemList, setSearchItemList] = useState([]);

    const [sortOption, setSortOption] = useState("popular");
    const categoryCode = "a";

    // 리스트 정렬
    const onSortChange = e =>{
        const selectedOption = e.target.value
        setSortOption(selectedOption);
        sortedList(selectedOption);
    }

    const sortedList = option => {
        let sortedBoardList = [...antiqueList];

        switch (option) {
            case "popular":
                sortedBoardList.sort((a, b) => b.views - a.views);
                break;
            case "new":
                sortedBoardList.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "old":
                sortedBoardList.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            default:
                break;
        }
        setAntiqueList(sortedBoardList);
    }


    // 카테고리 전체목록 가져오기
    const getItemList = async () => {
        try {
            const response = await api.antiqueList();
            const data = response.data;
            if (data && data.length > 0) {
                setAntiqueList(data);

                // 경매 상태 가져오기
                const postStatus = data.postStatus;
                sortedList(sortOption);

                // 경매 상태 별 리스트 따로 담기
                const onResponse = await api.getOnList(categoryCode);
                setOnList(onResponse.data);

                const offResponse = await api.getOffList(categoryCode);
                setOffList(offResponse.data);

                const doneResponse = await api.getDoneList(categoryCode);
                setDoneList(doneResponse.data);
            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        }catch (error){
            console.error("해당 카테고리 경매 목록을 불러오는 데 실패했습니다.", error);
        }
    };



    useEffect(() => {
        getItemList();
    }, []);


    // 최근 본 게시글
    const onItemClick = (list) => {
        updateRecentPosts(list);
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
            const data = response.data;
            setSearchItemList(data);
            console.log("검색 결과:", data);
        } catch (error) {
            console.error("검색 실패:", error);
            alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
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

        <select name="sort" id="sort" value={sortOption} onChange={onSortChange}>
            <option value="popular">인기순</option>
            <option value="new">최신순</option>
            <option value="old">오래된순</option>
        </select>

        <hr/>
        <div className="auctionListContainer">
        {searchItemList.length > 0 ? (
                    searchItemList.map((list) => (
                        <div key={list.postId} className="auctionItem">
                            <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                                <img
                                    className="itemImg"
                                    src={list.imageUrl}
                                    alt={`${list.title}의 이미지`}
                                    loading="lazy"
                                />
                                <h2 className="itemTitle">{list.title}</h2>
                            </Link>
                        </div>
                    ))
                ) : searchItem ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    antiqueList.map((list) => (
                        <div key={list.postId} className="auctionItem">
                            <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                                <img
                                    className="itemImg"
                                    src={list.imageUrl}
                                    alt={`${list.title}의 이미지`}
                                    loading="lazy"
                                />
                                <h2 className="itemTitle">{list.title}</h2>
                            </Link>
                        </div>
                    ))
                )}
            {searchItemList.length === 0 && antiqueList.length === 0 && (
            <p>해당하는 카테고리의 경매품이 없습니다.</p>
                )}
        </div>
        </>
    );
}

export default Antique;
