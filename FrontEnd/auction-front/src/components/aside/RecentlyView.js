import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentlyView = () => {
    const getRecentPosts = () => JSON.parse(localStorage.getItem("recentPosts")) || [];
    const [recentViews, setRecentViews] = useState(getRecentPosts());

    // useEffect(() => {
    //     const storedPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
    //     setRecentViews(storedPosts);
    // }, []);

    // 게시물 클릭 시 최근 본 게시글 업데이트
    const onItemClick = (view) => {

        const currentPosts = getRecentPosts();
        const updatedPosts = [view, ...currentPosts.filter(p => p.postId !== view.postId)];

        // 최근 본 게시물 2개 저장
        const slicedPosts = updatedPosts.slice(0, 2);
        localStorage.setItem("recentPosts", JSON.stringify(slicedPosts));

        // 상태를 강제로 업데이트하여 UI 갱신
        setRecentViews(slicedPosts); // 이 줄은 렌더링 필요 없으면 생략 가능
    };

    return (
        <aside className="rightAside">
            <p>최근 본 게시물</p>
            <ul>
                {recentViews.length > 0 ? (
                    getRecentPosts().map((view, index) => (
                        <li key={index}>
                            <Link to={`/auction/${view.postId}`} onClick={() => onItemClick(view)}>
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

