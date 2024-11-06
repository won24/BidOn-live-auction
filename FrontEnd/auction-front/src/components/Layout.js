import {Outlet} from "react-router-dom";
import Nav from "./header/NavigationBar";
import Footer from "./footer/Footer";
import RecentlyView from "./aside/RecentlyView";
import './Layout.css'
import Main from "../pages/main/Main";


const Layout = () =>{

    return(
        <div className="pageContainer">
            <div className="navContainer">
                <Nav/>
                <Outlet/>
            </div>
                <Footer/>
                <RecentlyView/>
        </div>
    )
}

export default Layout;