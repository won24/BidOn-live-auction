
import Nav from "./navagation/NavigationBar";
import Footer from "./footer/Footer";
import {Outlet} from "react-router-dom";

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