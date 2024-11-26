import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";
import RecentlyView from "./aside/RecentlyView";
import Nav from "./header/NavigationBar";
import "../css/Layout.css";
const Layout = () =>{
    return (
        <div className="layout-container">
            <div className="navBar-container">
                <Nav/>
                <hr className="layout-container_line"/>
                <Outlet/>
            </div>
            <div className="aside-container">
                <RecentlyView/>
            </div>
            <div className="layout-footer-container">
                <Footer/>
            </div>
        </div>
    );
}
export default Layout;