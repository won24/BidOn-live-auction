
import Nav from "./navagation/NavigationBar";
import Footer from "./footer/Footer";

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