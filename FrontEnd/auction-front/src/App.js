
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Live from "./pages/live/Live";
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
import Antique from "./pages/acution/Antique";
import Limited from "./pages/acution/Limited";
import Discontiuation from "./pages/acution/discontinuation";
import ArtProduct from "./pages/acution/artProduct";
import Valuables from "./pages/acution/valuables";

function App() {

    return (
       <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="live" element={<Live/>}/>
                        <Route path="auction" element={<Auction/>}/>
                        <Route path="auction/antique" element={<Antique/>}/>
                        <Route path="auction/limited" element={<Limited/>}/>
                        <Route path="auction/discontinuation" element={<Discontiuation/>}/>
                        <Route path="auction/artproduct" element={<ArtProduct/>}/>
                        <Route path="auction/valuables" element={<Valuables/>}/>
                        <Route path="requestitem" element={<RequestItem/>}/>
                        <Route path="mypage" element={<Mypage/>}/>
                        <Route path="customer" element={<Customer/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="tosspaySuccess" element={<SuccessPage />} />
                    <Route path="tosspayFail" element={<FailPage />} />
                </Routes>
            </BrowserRouter>
       </>
    );
}

export default App;
