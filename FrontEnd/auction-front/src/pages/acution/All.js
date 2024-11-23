import { useEffect, useRef, useState } from "react";
import * as api from "./common/AuctionAPIs";
import { Link } from "react-router-dom";
import { updateRecentPosts } from "../../components/aside/RecentlyView";
import '../../css/Auction.css';
import usePagination from "./common/paging/usePagination";
import Pagination from "./common/paging/Pagination";
import useFilterItem from "./common/FilterItem";
import {getImagesForPosts} from "./common/Images";

const AllList = () => {

    const [allList, setAllList] = useState([]);
    const searchItemRef = useRef("");
    const [searchItemList, setSearchItemList] = useState([]);
    const [imgMap, setImgMap] = useState({});
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


    // 카테고리 전체목록 가져오기
    useEffect(() => {
        const getItemList = async () => {
            try {
                const response = await api.totalAuctionList();
                const data = response.data;

                if (data && data.length > 0) {
                    setAllList(data);
                    const postIds = data.map(item => item.postId);
                    const images = await getImagesForPosts(postIds);
                    setImgMap(images);
                } else {
                    console.warn("받은 데이터가 비어 있습니다.");
                }
            } catch (error) {
                console.error("데이터를 가져오는 데 실패했습니다.", error);
            } finally {
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        getItemList();
    }, []);


    // 검색
    const onValueGet = (e) => {
        searchItemRef.current = e.target.value;
    };

    const search = async (e) => {
        e.preventDefault();

        if (!searchItemRef.current.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            const response = await api.searchItemAllList(searchItemRef.current);
            const data = response.data;
            setSearchItemList(data);
            console.log("검색 결과:", data);
        } catch (error) {
            console.error("검색 실패:", error);
            alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    // 경매 상태 체크 박스
    const handleCheckboxChange = (id, isChecked, type) => {
        setCheckBoxStates((prev) => ({
            ...prev,
            [type]: prev[type].map((item) =>
                item.id === id ? { ...item, isChecked } : item
            ),
        }));
    };
    const { filteredMainItems, filteredSearchItems } = useFilterItem(allList, searchItemList, checkBoxStates);


    // 페이징 처리
    const itemsPerPage = 20;
    const mainPagination = usePagination(filteredMainItems, itemsPerPage);
    const searchPagination = usePagination(filteredSearchItems, itemsPerPage);


    // 체크박스 렌더링
    const CheckboxGroup = ({ items, type }) => (
        <ul className="checkBoxContainer">
            {items.map((item) => (
                <div key={item.id}>
                    <label className="checkBoxLabel">
                        <input
                            type="checkbox"
                            className="checkboxInput"
                            checked={item.isChecked}
                            onChange={(e) =>
                                handleCheckboxChange(item.id, e.target.checked, type)
                            }
                        />
                        {item.title}
                    </label>
                </div>
            ))}
        </ul>
    );


    // 결과 렌더링
    const renderAuctionItems = (items) =>
        items.map((item) => (
            <div key={item.postId} className="auctionItem">
                <Link to={`/auction/${item.postId}`} onClick={() => updateRecentPosts(item)}>
                    <img
                        className="itemImg"
                        src={imgMap[item.postId]?.[0] || "/placeholder.png"}
                        alt={`${item.title}의 이미지`}
                        loading="lazy"
                    />
                    <h2 className="itemTitle">{item.title}</h2>
                </Link>
            </div>
        ));



    return (
        <>
            <h2 className="auctionTitle">경매 물품 전체보기</h2>
            <p className="auctionSubTitle">쇼미옥의 경매 물품</p>

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
                    placeholder="모든 카테고리에서 검색"
                    onChange={onValueGet}
                />
                <button type="submit" className="auctionSearchBtn">검색</button>
            </form>


            {!searchItemRef.current && <CheckboxGroup items={checkBoxStates.main} type="main" />}
            {searchItemRef.current && searchItemList.length > 0 && (
                <CheckboxGroup items={checkBoxStates.search} type="search" />
            )}
            <hr/>

            <div className="auctionListContainer">
                {isLoading ? (
                    <p className="loadingMessage">경매품 리스트를 가져오는 중입니다.</p>
                ) : (
                    <>
                        {searchItemRef.current ? (
                            searchItemList.length > 0 ? (
                                <>
                                    {renderAuctionItems(searchPagination.currentItems)}
                                    <Pagination {...searchPagination} />
                                </>
                            ) : (
                                <p className="loadingMessage">검색 결과가 없습니다.</p>
                            )
                        ) : (
                            <>
                                {renderAuctionItems(mainPagination.currentItems)}
                                <Pagination {...mainPagination} />
                            </>
                        )}
                    </>
                )}
                {searchItemList.length === 0 && allList.length === 0 && (
                    <p className="auctionListMessage">현재 경매품이 없습니다.</p>
                )}
            </div>
        </>
    );
}

export default AllList;
