import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentlyView = () => {
    const [recentViews, setRecentViews] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        setRecentViews(storedPosts);
    }, []);

    // 게시물 클릭 시 recentViews 업데이트
    const onItemClick = (list) => {
        const currentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];

        // 새 게시물이 이미 목록에 있으면 맨 앞에 추가, 그렇지 않으면 추가
        const updatedPosts = [list, ...currentPosts.filter(p => p.postId !== list.postId)];

        // 최근 본 게시물 2개
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0, 2)));

        setRecentViews(updatedPosts.slice(0, 2));
    };

    return (
        <aside className="rightAside">
            <p>최근 본 게시물</p>
            <ul>
                {recentViews.length > 0 ? (
                    recentViews.map((view, index) => (
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
