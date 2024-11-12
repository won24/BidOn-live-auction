import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";
import RecentlyView from "./aside/RecentlyView";
import Nav from "./header/NavigationBar";

const Layout = () =>{
    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
            <RecentlyView/>
        </>
    );
}
export default Layout;