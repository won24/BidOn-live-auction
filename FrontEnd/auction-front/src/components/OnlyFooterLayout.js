/**
 * OnlyFooterLayout.js
 * 
 * Footer만 필요할 때 사용할 수 있는 레이아웃
 */
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";
import "../css/Layout.css";

const OnlyFooterLayout = () =>
{
    return (
        <>
            <Outlet/>
            <Footer/>
        </>
    );
}
export default OnlyFooterLayout;