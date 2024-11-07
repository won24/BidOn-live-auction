
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Live from "./pages/live/Live";
import Mypage from "./pages/mypage/Mypage";
import RequestItem from "./pages/requestItem/RequestItem";
import Customer from "./pages/customer/Customer";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Auction from "./pages/acution/Auction";

function App() {

    return (
       <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="live" element={<Live/>}/>
                        <Route path="auction" element={<Auction/>}/>
                        <Route path="requestitem" element={<RequestItem/>}/>
                        <Route path="mypage" element={<Mypage/>}/>
                        <Route path="customer" element={<Customer/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
       </>
    );
}

export default App;
