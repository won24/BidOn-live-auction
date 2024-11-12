
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Live from "./pages/live/Live";
import Mypage from "./pages/mypage/Mypage";
import RequestItem from "./pages/requestItem/RequestItem";
import FAQ from "./pages/customer/FAQ";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Auction from "./pages/acution/Auction";
import { FailPage } from "./pages/tosspay/TosspayFail";
import { SuccessPage } from "./pages/tosspay/TosspaySuccess";
import { CheckoutPage } from "./pages/tosspay/TosspayAPI";
import CustomerLayout from "./components/CustomerLayout";
import Personal from "./pages/customer/Personal";
import Notice from "./pages/customer/Notice";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="live" element={<Live />} />
                    <Route path="auction" element={<Auction />} />
                    <Route path="mypage" element={<Mypage />} />
                    <Route path="requestitem" element={<RequestItem />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/customer" element={<CustomerLayout />}>
                        <Route path="faq" element={<FAQ/>} />
                        <Route path="personal" element={<Personal />} />
                        <Route path="notice" element={<Notice />} />
                    </Route>
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="tosspaySuccess" element={<SuccessPage />} />
                    <Route path="tosspayFail" element={<FailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
