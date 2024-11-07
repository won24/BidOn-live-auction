import Nav from "./header/NavigationBar"; // Ensure the correct path is used
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;;