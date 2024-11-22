import {useEffect, useRef, useState} from "react";
import * as api from "../acution/common/AuctionAPIs";
import {Link} from "react-router-dom";
import usePagination from "../acution/common/paging/usePagination";
import {updateRecentPosts} from "../../components/aside/RecentlyView";
import Pagination from "../acution/common/paging/Pagination";


const Live = () =>{

    const [liveList, setLiveList] = useState([]);
    const [imgMap, setImgMap] = useState({});
    const [postIds, setPostIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // 라이브 목록 가져오기
    const getItemList = async () => {
        try {
            const response = await api.liveList();
            const data = response.data;
            const postIds = data.map(item => item.postId);

            if (data && data.length > 0) {
                const sortedData = data.sort((a, b) => new Date(a.startDay) - new Date(b.startDay));

                setLiveList(sortedData);
                setPostIds(postIds);

            } else {
                console.warn("받은 데이터가 비어 있습니다.");
            }
        } catch (error) {
            console.error("라이브 경매 목록을 불러오는 데 실패했습니다.", error);
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



    // 페이징 처리
    const itemsPerPage = 20;
    const mainPagination = usePagination(liveList, itemsPerPage);


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
            <h1 className="auctionTitle">라이브경매 Live</h1>

            <div className="auctionListContainer">
                {isLoading ? (
                    <p className="loadingMessage">라이브 경매 리스트를 가져오는 중입니다.</p>
                ) : (
                        <>
                            {renderAuctionItems(mainPagination.currentItems)}
                            <Pagination {...mainPagination} />
                        </>
                    )
                }
                {liveList.length === 0 && (
                    <p className="auctionListMessage">현재 경매 중인 경매품이 없습니다.</p>
                )}
            </div>
        </>
    );
}
export default Live;