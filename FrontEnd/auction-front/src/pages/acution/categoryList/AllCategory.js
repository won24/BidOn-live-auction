import * as api from "../../../apis/AuctionItem";
import {Link} from "react-router-dom";
import {updateRecentPosts} from "../../../components/aside/RecentlyView";
import {useEffect, useState} from "react";


const AllCategory = ({ doneList, onList, offList }) =>{

    const allStatusList = [
        ...onList.map((item) => ({ ...item, status: "on" })),
        ...offList.map((item) => ({ ...item, status: "off" })),
        ...doneList.map((item) => ({ ...item, status: "done" })),
    ];

    // 체크 박스
    const [mainCheckBox, setMainCheckBox] = useState([
        { id: 1, title: "경매중", status: "on", isChecked: true },
        { id: 2, title: "경매 예정", status: "off", isChecked: true },
        { id: 3, title: "경매 종료", status: "done", isChecked: true },
    ]);

    const [searchCheckBox, setSearchCheckBox] = useState([]);

    const handleCheckboxChange = (id, isChecked, type = "main") => {
        if (type === "main") {
            setMainCheckBox((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, isChecked } : item
                )
            );
        } else if (type === "search") {
            setSearchCheckBox((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, isChecked } : item
                )
            );
        }
    };

    const filteredMainItems = allStatusList.filter((item) =>
        mainCheckBox.some(
            (box) => box.isChecked && box.status === item.status
        )
    );

    const filteredSearchItems = searchItemList.filter((item) =>
        searchCheckBox.some(
            (box) => box.isChecked && box.status === item.status
        )
    );


    // 최근 본 게시글 업데이트
    const [searchItem, setSearchItem] = useState("");
    const [searchItemList, setSearchItemList] = useState([]);

    const onItemClick = (list) => {
        updateRecentPosts(list);
        console.log("최근 본 게시글 업데이트", list)
    };


    // 전체 게시글
    const allList = () => {
        return(
            allStatusList.map((list) => (
                <div key={list.postId} className="auctionListContainer">
                    <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                        <img className="itemImg" src={list.imageUrl} alt="경매품 이미지"/>
                        <h2 className="itemTitle">{list.title}</h2>
                    </Link>
                </div>
            ))
        )
    }


    // 검색해서 물건 찾기
    const onGetValue = (e) => {
        setSearchItem(e.target.value);
    };

    const search = async (e) => {
        e.preventDefault();  // 페이지 리로드를 막을라고

        if (!searchItem.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        try {
            const response = await api.searchItemAllList(searchItem);
            const data = response.data;

            const newSearchCheckBox = [
                { id: 1, title: "경매중", status: "on", isChecked: true },
                { id: 2, title: "경매 예정", status: "off", isChecked: true },
                { id: 3, title: "경매 종료", status: "done", isChecked: true },
            ];

            setSearchItemList(data);
            setSearchCheckBox(newSearchCheckBox);
            console.log("검색 결과:", data);
        } catch (error) {
            console.error("검색 실패:", error);
            alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return(
        <>
            <h2>경매 물품 전체보기</h2>

            <a href="/auction/antique">골동품</a>
            <a href="/auction/limited">한정판</a>
            <a href="/auction/discontinuation">단종품</a>
            <a href="/auction/artproduct">예술품</a>
            <a href="/auction/valuables">귀중품</a>

            <form onSubmit={search}>
                <input
                    placeholder="경매품 검색"
                    value={searchItem}
                    onChange={onGetValue}
                />
                <button type="submit">검색</button>
            </form>

            {/*<select name="sort" id="sort">*/}
            {/*    <option value="favorite">인기순</option>*/}
            {/*    <option value="new">최신순</option>*/}
            {/*    <option value="last">오래된순</option>*/}
            {/*</select>*/}
            <hr/>

            {/* 메인 체크박스 */}
            {!searchItem && (
                <>
                    <ul>
                        {mainCheckBox.map((item) => (
                            <li key={item.id}>
                                <label>
                                    <input
                                        type="checkbox"
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
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* 검색 체크박스 */}
            {searchItem && searchItemList.length > 0 && (
                <>
                    <ul>
                        {searchCheckBox.map((item) => (
                            <li key={item.id}>
                                <label>
                                    <input
                                        type="checkbox"
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
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <hr />

            {/* 렌더링된 항목 */}
            <div>
                {searchItem
                    ? filteredSearchItems.length > 0
                        ? filteredSearchItems.map((list) => (
                            <div key={list.postId} className="auctionItem">
                                <Link to={`/auction/${list.postId}`} onClick={() => onItemClick(list)}>
                                    <img
                                        className="itemImg"
                                        src={list.imageUrl}
                                        alt={`${list.title}의 이미지`}
                                        loading="lazy"
                                    />
                                    <h2 className="itemTitle">
                                        {list.title}
                                    </h2>
                                </Link>
                            </div>
                        ))
                        : "선택된 항목이 없습니다."
                    : filteredMainItems.length > 0
                        ? filteredMainItems.map((list) => (
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
                        : "선택된 항목이 없습니다."}
            </div>
        </>
    );
}

export default AllCategory;