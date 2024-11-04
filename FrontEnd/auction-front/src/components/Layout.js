import {Outlet} from "react-router-dom";
import Nav from "./header/NavigationBar";
import Footer from "./footer/Footer";
import Main from "../pages/main/Main";


const Layout = () =>{

    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;