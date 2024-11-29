import {useEffect, useState} from "react";
import * as api from "../acution/common/AuctionAPIs";
import {getImagesForPosts} from "../acution/common/Images";
import {Link} from "react-router-dom";
import {updateRecentPosts} from "../../components/aside/RecentlyView";
import Pagination from "../acution/common/paging/Pagination";
import "../../css/AdminBoard.css";
import usePagination from "../acution/common/paging/usePagination";
const baseURL =process.env.REACT_APP_API_URL;
const AdminBoard = () => {

    const [imgMap, setImgMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [allList, setAllList] = useState([]);
    const itemsPerPage = 15;
    const searchPagination = usePagination(allList, itemsPerPage);

    useEffect(() => {
        const getItemList = async () => {
            try {
                const response = await api.totalAuctionList();
                const allData = response.data;
                if (allData && allData.length > 0) {
                    const data = allData.filter(item => item.postStatus === 'none');
                    if (data.length > 0) {
                        setAllList(data);
                        const postIds = data.map(item => item.postId);
                        const images = await getImagesForPosts(postIds);
                        setImgMap(images);
                    } else {
                        console.warn("postStatus가 'none'인 항목이 없습니다.");
                        setAllList([]);
                    }
                } else {
                    console.warn("받은 데이터가 비어 있습니다.");
                    setAllList([]);
                }
            } catch (error) {
                console.error("데이터를 가져오는 데 실패했습니다.", error);
                setAllList([]);
            } finally {
                setIsLoading(false);
            }
        };

        getItemList();
    }, []);

    const renderAuctionItems = (items) =>
        items.map((item) => (
            <div key={item.postId} className="auctionItem">
                <Link to={`/auction/${item.postId}`} onClick={() => updateRecentPosts(item)} className="auction-link">
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

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return(
        <>
            <div className="auctionListContainer">
                {allList.length > 0 ? renderAuctionItems(searchPagination.currentItems) : <div>게시물이 없습니다.</div>}
            </div>
            {allList.length > 0 && <Pagination {...searchPagination} className="paginationContainer"/>}
        </>
    )
}

export default AdminBoard;