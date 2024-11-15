/**
 * OnlyFooterLayout.js
 * 
 * Layout that only includes Footer with a margin around the Outlet content.
 */
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import "../css/OnlyFooterLayout.css";

const OnlyFooterLayout = () => {
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
