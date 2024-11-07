
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Live from "./pages/live/Live";
import AntiqueItems from "./pages/acution/AntiqueItems";
import Mypage from "./pages/mypage/Mypage";
import RequestItem from "./pages/requestItem/RequestItem";
import Customer from "./pages/customer/Customer";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Auction from "./pages/acution/Auction";
import {FailPage} from "./pages/tosspay/TosspayFail";
import {SuccessPage} from "./pages/tosspay/TosspaySuccess";
import {CheckoutPage} from "./pages/tosspay/TosspayAPI";

function App() {

    return (
       <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="live" element={<Live/>}/>
                        <Route path="auction" element={<Auction/>}/>
                        <Route path="mypage" element={<Mypage/>}/>
                        <Route path="requestitem" element={<RequestItem/>}/>
                        <Route path="customer" element={<Customer/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="tosspaySuccess" element={<SuccessPage />} />
                        <Route path="tosspayFail" element={<FailPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
       </>
    );
}

export default App;
