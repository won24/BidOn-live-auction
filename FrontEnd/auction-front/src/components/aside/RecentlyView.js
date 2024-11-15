import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const RecentlyView = () => {
    const [recentViews, setRecentViews] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        setRecentViews(storedPosts);
    }, []);

    return (
        <aside className="rightAside">
            <p>최근 본 게시물</p>
            <ul>
                {recentViews.length > 0 ? (
                    recentViews.map((view, index) => (
                        <li key={index}>
                            <Link to={`/auction/${view.postId}`}>
                                <img src={view.imageUrl} alt={view.title} style={{ width: '50px', height: '50px' }} />
                                <p>{view.title}</p>
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
