import {NavLink, Route, Routes} from "react-router-dom";
import {useState} from "react";
import MyFar from "../../pages/mypage/MyFar";
import MyProfile from "../../pages/mypage/MyProfile";
import MyAuctionItem from "../../pages/mypage/MyAuctionItem";
import MyAuction from "../../pages/mypage/MyAuction";
import ChangePassword from "../../pages/mypage/ChangePassword";


const MyPageLayout = () => {

    const [showNavLinks, setShowNavLinks] = useState(true);

    const handleLinkClick = (shouldShow) => {
        setShowNavLinks(shouldShow);
    };

    return (
        <div>
            {showNavLinks && (
                <nav>
                    <NavLink to="/mypage/myfar" onClick={() => handleLinkClick(true)}>| 즐겨찾기 |</NavLink>
                    <NavLink to="/mypage/myprofile" onClick={() => handleLinkClick(true)}> 내 정보 |</NavLink>
                    <NavLink to="/mypage/changepassword" onClick={() => handleLinkClick(true)}> 비밀번호 변경 |</NavLink>
                    <NavLink to="/mypage/myauctionitem" onClick={() => handleLinkClick(true)}> 경매품 |</NavLink>
                    <NavLink to="/mypage/myauction" onClick={() => handleLinkClick(true)}> 참여 경매 목록 |</NavLink>
                </nav>
            )}

            <Routes>
                <Route path="myfar" element={<MyFar />}/>
                <Route path="myprofile" element={<MyProfile />}/>
                <Route path="changepassword" element={<ChangePassword />}/>
                <Route path="myauctionitem" element={<MyAuctionItem />} />
                <Route path="myauction" element={<MyAuction />} />
            </Routes>
        </div>
    );
};

export default MyPageLayout;
