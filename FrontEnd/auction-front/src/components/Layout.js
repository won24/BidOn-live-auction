import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";
import RecentlyView from "./aside/RecentlyView";
import Nav from "./header/NavigationBar";
import "../css/Layout.css";
const Layout = () =>{
    return (
        <>
        <Nav/>
        <Outlet/>
        <RecentlyView/>
        <Footer/>
        </>
    );
}
export default Layout;