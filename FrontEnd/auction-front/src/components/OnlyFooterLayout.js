/**
 * OnlyFooterLayout.js
 * 
 * Footer만 필요할 때 사용할 레이아웃
 * Logo 추가 여부 고려 중
 */
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import "../css/OnlyFooterLayout.css";

const OnlyFooterLayout = () => 
{
    return (
        <>
            <div className="outlet-container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default OnlyFooterLayout;
