import {useEffect, useState} from "react";



const RecentlyView = () =>{

    const [recentViews, setRecentViews] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        setRecentViews(storedPosts);
    }, []);

    return (
        <aside className="rightAside">
            <p>최근 본 게시물</p>
            <ul>
                {recentViews.map((view, index) => (
                    <li key={index}>{view.img}</li>
                ))}
            </ul>
        </aside>
    );

}
export default RecentlyView;