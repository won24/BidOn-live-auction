import {NavLink, Route, Routes} from "react-router-dom";
import {useState} from "react";
import MyFar from "../../pages/mypage/MyFar";
import MyProfile from "../../pages/mypage/MyProfile";
import MyNotice from "../../pages/mypage/MyNotice";


const MyPageLayout = () => {

    const [showNavLinks, setShowNavLinks] = useState(true);

    const handleLinkClick = (shouldShow) => {
        setShowNavLinks(shouldShow);
    };

    return (
        <div>
            {showNavLinks && (
                <nav>
                    <NavLink to="/mypage/myfar" onClick={() => handleLinkClick(true)}>즐겨찾기 </NavLink>
                    <NavLink to="/mypage/myprofile" onClick={() => handleLinkClick(true)}>내 정보 </NavLink>
                    <NavLink to="/mypage/mynotice" onClick={() => handleLinkClick(true)}>내 글 </NavLink>
                </nav>
            )}

            <Routes>
                <Route path="myfar" element={<MyFar />}/>
                <Route path="myprofile" element={<MyProfile />}/>
                <Route path="mynotice" element={<MyNotice />} />
            </Routes>
        </div>
    );
};

export default MyPageLayout;
