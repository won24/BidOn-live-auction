import { NavLink, Outlet } from "react-router-dom";
import { useLogin } from "../../pages/login/LoginContext";
import "../../css/MyPageLayout.css";

const MyPageLayout = () => {

    const nickname = sessionStorage.getItem("nickname");

    const { user } = useLogin();

        const welcomeMypage = (nickname, maxLength) => {
            if (nickname && nickname.length > maxLength) {
                return nickname.substring(0, maxLength) + "...";
            }
            return nickname;
        };

    return (
        <div>
            <p className="nickname-welcome">{welcomeMypage(nickname, 50)}님, 환영합니다.</p>
            <div className="mypage-layout">
                <div className="mypage">
                    <ul>
                        <button><NavLink to="/mypage" activeclassname="active-link"
                                     className="mypage-center-link">마이페이지</NavLink></button>
                        <button><NavLink to="/mypage/myfar" activeclassname="active-link">즐겨찾기</NavLink></button>
                        <button><NavLink to="/mypage/myprofile" activeclassname="active-link">내 정보</NavLink></button>
                        <button><NavLink to="/mypage/myauctionitem" activeclassname="active-link">경매품</NavLink></button>
                        <button><NavLink to="/mypage/myauction" activeclassname="active-link">낙찰 경매품 목록</NavLink></button>
                    </ul>
                </div>
                <div className="outlet-fixsize">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MyPageLayout;
