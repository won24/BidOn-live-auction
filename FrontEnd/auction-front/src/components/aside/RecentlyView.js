import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../pages/acution/common/AuctionAPIs";
import '../../css/RecentlyView.css'

const RecentlyView = () => {

    const getRecentPosts = () => JSON.parse(localStorage.getItem("recentPosts")) || [];
    const [recentViews, setRecentViews] = useState(getRecentPosts());

    // 브라우저 뒤로가기, 페이지 이동 감지
    useEffect(() => {
        const handlePopState = () =>{
            setRecentViews(getRecentPosts());
        }

        window.addEventListener("popstate", handlePopState);

        // 컴포넌트 언마운트 시 리스너 제거
        return() =>{
            window.removeEventListener("popstate", handlePopState)
        };
    }, []);


    const onItemClick = (post) => {
        updateRecentPosts(post);
        setRecentViews(getRecentPosts());  // 클릭하면 상태 업데이트
    };


    return (
        <aside className="rightAside">
            <p className="rightAsideText">최근 본 게시물</p>
            <ul>
                {recentViews.length > 0 ? (
                    getRecentPosts().map((view) => (
                        <div key={view.postId} className="recentlyViews">
                            <Link to={`/auction/${view.postId}`} onClick={()=>onItemClick(view)}>
                                <img
                                    className="recentlyViewsImg"
                                    src={view.imageUrl}
                                    alt={`${view.title}의 이미지`}
                                />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="recentlyViewsText">최근 본 게시물이 없습니다.</p>
                )}
            </ul>
        </aside>
    );
}
export default RecentlyView;


export const updateRecentPosts = async (post, limit = 2) => {
    const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];

    // 이미지 가져오기
    const postId = post.postId;
    try {
        const response = await api.getBoardImg(postId);
        const data = response.data;

        // 첫 번째 이미지 URL만 가져오기
        const firstImageUrl = data.length > 0 ? data[0].imageUrl : null;

        // 이미지 post 객체에 추가
        const postWithImage = { ...post, imageUrl: firstImageUrl };
        const updatedPostsWithImages = [
            postWithImage,
            ...recentPosts.filter((p) => p.postId !== post.postId),
        ];

        // 로컬 스토리지에 저장
        localStorage.setItem("recentPosts", JSON.stringify(updatedPostsWithImages.slice(0, limit)));

        console.log("업데이트된 최근 게시물:", updatedPostsWithImages);
    } catch (error) {
        console.error("게시글 이미지를 불러오는 중 오류가 발생했습니다:", error);
    }
};

