import {Outlet} from "react-router-dom";
import Nav from "./header/NavigationBar";
import Footer from "./footer/Footer";
import RecentlyView from "./aside/RecentlyView";
import './Layout.css'


const Layout = () =>{

    return(
        <div className="pageContainer">
            <Nav/>
            <Outlet/>
            <RecentlyView/>
            <Footer/>
        </div>
    )
}

export default Layout;