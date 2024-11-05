import {Outlet} from "react-router-dom";
import Nav from "./header/NavigationBar";
import Footer from "./footer/Footer";
import Aside from "./aside/Aside";
import RecentlyView from "./aside/RecentlyView";


const Layout = () =>{

    return(
        <>
            <Nav/>
            <Outlet/>
            <RecentlyView/>
            <Footer/>
        </>
    )
}

export default Layout;