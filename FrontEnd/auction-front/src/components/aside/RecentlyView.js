import {useEffect, useState} from "react";



const RecentlyView = () =>{

    const [recentViews, setRecentViews] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        setRecentViews(storedPosts);
    }, []);

    return (
        <div>
            <h3>Recently Viewed Posts</h3>
            <ul>
                {recentViews.map((view, index) => (
                    <li key={index}>{view.img}</li>
                ))}
            </ul>
        </div>
    );

}
export default RecentlyView;