/**
 * LogoAndFooter.js
 * 
 * Logo와 Footer만 필요할 때 사용할 레이아웃
 */
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import "../css/Layout.css";
import { Logo } from "./header/Logo";

const LogoAndFooter = () => 
{
    return (
        <div className="layout-container">
            <div className="navBar-container">
                <Logo />
                <hr className="layout-container_line"/>
                <Outlet/>
            </div>
            <div className="layout-footer-container">
                <Footer/>
            </div>
        </div>
    );
}

export default LogoAndFooter;
