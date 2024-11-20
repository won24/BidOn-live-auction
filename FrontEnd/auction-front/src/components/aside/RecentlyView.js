import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <p>최근 본 게시물</p>
            <ul>
                {recentViews.length > 0 ? (
                    getRecentPosts().map((view, index) => (
                        <li key={index}>
                            <Link to={`/auction/${view.postId}`} onClick={()=>onItemClick(view)}>
                                <img
                                    src={view.imageUrl}
                                    alt={view.title}
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>최근 본 게시물이 없습니다.</p>
                )}
            </ul>
        </aside>
    );
}
export default RecentlyView;


export const updateRecentPosts = (post, limit = 2) => {
    const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
    const updatedPosts = [post, ...recentPosts.filter((p) => p.postId !== post.postId)];
    localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0, limit)));
};

