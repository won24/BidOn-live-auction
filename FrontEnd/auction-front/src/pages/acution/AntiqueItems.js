import {Link} from "react-router-dom";


const AntiqueItems = ( {antiqueList} ) =>{


    const onItemClick = () =>{
        const recentPosts = JSON.parse(localStorage.getItem("recentPosts")) || [];
        const updatedPosts = [antiqueList, ...recentPosts.filter(p => p.id !== antiqueList.id)];
        localStorage.setItem("recentPosts", JSON.stringify(updatedPosts.slice(0,2))); // 최근 본 게시물 2개
    }; // 게시글 클릭하면 로컬스토리지에 최근 두개까지 저장

    return (
        <>
            {antiqueList.map(list => (
                <div key={list.id}>
                    <Link to="/auction/antique/{id}">
                        <div className="auctionItem" onClick={onItemClick}>
                            <div className="itemName">{list.img}</div>
                            <h2 className="itemTitle">{list.title}</h2>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}
export default AntiqueItems;