import {Outlet} from "react-router-dom";
import Nav from "./header/NavigationBar";
import Footer from "./footer/Footer";
import Aside from "./aside/Aside";


const Layout = () =>{

    return(
        <>
            <Aside/>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;