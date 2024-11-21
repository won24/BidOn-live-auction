import { useEffect, useMemo, useRef, useState } from "react";
import * as api from "../../apis/AuctionItem";
import { Link } from "react-router-dom";
import { updateRecentPosts } from "../../components/aside/RecentlyView";
import '../../css/Auction.css'


const ArtProduct = () => {

    const [artProductList, setArtProductList] = useState([]);
    const [categoryCode, setCategoryCode] = useState([]);
    const searchItemRef = useRef("");
    const [searchItemList, setSearchItemList] = useState([]);
    const [imgMap, setImgMap] = useState({});
    const [postIds, setPostIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checkBoxStates, setCheckBoxStates] = useState({
        main: [
            { id: 1, title: "경매중", status: "on", isChecked: true },
            { id: 2, title: "경매 예정", status: "off", isChecked: true },
            { id: 3, title: "경매 종료", status: "done", isChecked: true },
        ],
        search: [
            { id: 1, title: "경매중", status: "on", isChecked: true },
            { id: 2, title: "경매 예정", status: "off", isChecked: true },
            { id: 3, title: "경매 종료", status: "done", isChecked: true },
        ],
    });


    // 정렬하기
    const sortItemsByStatus = (items) => {
        const order = ["on", "off", "done"];
        return items.sort((a, b) => order.indexOf(a.postStatus) - order.indexOf(b.postStatus));
    };

    // 카테고리 전체목록 가져오기
    const getItemList = async () => {
        try {
            const response = await api.artProductList();
            const data = response.data;
            const category = data[0].categoryCode;
            const postIds = data.map(item => item.postId);
            if (data && data.length > 0) {
                setArtProductList(data);
                setCategoryCode(category);
                setPostIds(postIds);
            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        } catch (error) {
            console.error("해당 카테고리 경매 목록을 불러오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        getItemList();
    }, []);


    // 이미지 가져오기
    const getImagesForPosts = async () => {
        setIsLoading(true);
        try {
            const imageMap = {};
            for (const id of postIds) {
                try {
                    const response = await api.getBoardImg(id);
                    const data = response.data;
                    imageMap[id] = data.map(item => item.imageUrl);
                } catch (error) {
                    console.error(`Post ID ${id}의 이미지를 가져오는 중 오류가 발생했습니다:`, error);
                    imageMap[id] = []; // 오류 발생 시 빈 배열로 대체
                }
            }
            setImgMap(imageMap);

        } catch (error) {
            console.error("이미지를 가져오는 중 오류가 발생했습니다:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (postIds.length > 0) {
            getImagesForPosts();
        }
    }, [postIds]);



    // 최근 본 게시글
    const onItemClick = (list) => {
        updateRecentPosts(list);
    };

    // 검색어 입력
    const onValueGet = (e) => {
        searchItemRef.current = e.target.value;
    };

    // 검색해서 물건 찾기
    const search = async (e) => {
        e.preventDefault();

        if (!searchItemRef.current.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            const response = await api.searchItemList(searchItemRef.current, categoryCode);
            const data = response.data;
            setSearchItemList(data);
            console.log("검색 결과:", data);
        } catch (error) {
            console.error("검색 실패:", error);
            alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    // 체크 박스
    const handleCheckboxChange = (id, isChecked, type) => {
        setCheckBoxStates((prev) => ({
            ...prev,
            [type]: prev[type].map((item) =>
                item.id === id ? { ...item, isChecked } : item
            ),
        }));
    };

    // 검색했을 때 체크박스 결과 필터링
    const filteredSearchItems = useMemo(
        () =>
            sortItemsByStatus(
                searchItemList.filter((item) =>
                    checkBoxStates.search.some(
                        (box) => box.isChecked && box.status === item.postStatus
                    )
                )
            ),
        [searchItemList, checkBoxStates.search]
    );

    //전체 목록에서 체크박스 필터링
    const filteredMainItems = useMemo(
        () =>
            sortItemsByStatus(
                artProductList.filter((item) =>
                    checkBoxStates.main.some(
                        (box) => box.isChecked && box.status === item.postStatus
                    )
                )
            ),
        [artProductList, checkBoxStates.main]
    );

    const renderAuctionItems = () => {
        if (searchItemList.length > 0) {
            return filteredSearchItems.map((list) => (
                <div key={list.postId} className="auctionItem">
                    <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                        <img className="itemImg" src={imgMap[list.postId]?.[0] || "/placeholder.png"} alt={`${list.title}의 이미지`} loading="lazy" />
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ));
        } else if (searchItemRef.current) {
            return <p className="auctionListMessage">검색 결과가 없습니다.</p>;
        } else {
            return filteredMainItems.map((list) => (
                <div key={list.postId} className="auctionItem">
                    <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                        <img className="itemImg" src={imgMap[list.postId]?.[0] || "/placeholder.png"} alt={`${list.title}의 이미지`} loading="lazy" />
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ));
        }
    };

    return (
        <>
            <h1 className="auctionTitle">에술품 Art Product</h1>

            <div className="auctionCategory">
                <a href="/auction/antique">골동품</a>
                <a href="/auction/limited">한정판</a>
                <a href="/auction/discontinuation">단종품</a>
                <a href="/auction/artproduct">예술품</a>
                <a href="/auction/valuables">귀중품</a>
            </div>

            <form onSubmit={search} className="auctionSearch">
                <input
                    className="auctionSearchInput"
                    placeholder="현재 카테고리에서 검색"
                    onChange={onValueGet}
                />
                <button type="submit" className="auctionSearchBtn">검색</button>
            </form>

            {!searchItemRef.current && (
                <>
                    <ul className="checkBoxContainer">
                        {checkBoxStates.main.map((item) => (
                            <div key={item.id}>
                                <label className="checkBoxLabel">
                                    <input
                                        type="checkbox"
                                        className="checkboxInput"
                                        checked={item.isChecked}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                item.id,
                                                e.target.checked,
                                                "main"
                                            )
                                        }
                                    />
                                    {item.title}
                                </label>
                            </div>
                        ))}
                    </ul>
                </>
            )}

            {searchItemRef.current && searchItemList.length > 0 && (
                <>
                    <ul className="checkBoxContainer">
                        {checkBoxStates.search.map((item) => (
                            <div key={item.id}>
                                <label className="checkBoxLabel">
                                    <input
                                        type="checkbox"
                                        className="checkboxInput"
                                        checked={item.isChecked}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                item.id,
                                                e.target.checked,
                                                "search"
                                            )
                                        }
                                    />
                                    {item.title}
                                </label>
                            </div>
                        ))}
                    </ul>
                </>
            )}
            <hr/>

            <div className="auctionListContainer">
                {isLoading ? (
                    <p className="loadingMessage">경매품을 가져오는 중입니다</p>
                ) : (
                    renderAuctionItems()
                )}
                {searchItemList.length === 0 && artProductList.length === 0 && (
                    <p className="auctionListMessage">해당하는 카테고리의 경매품이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default ArtProduct;
