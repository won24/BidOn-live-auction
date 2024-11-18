
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Live from "./pages/live/Live";
import RequestItem from "./pages/requestItem/RequestItem";
import FAQ from "./pages/customer/FAQ";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import { FailPage } from "./pages/tosspay/TosspayFail";
import { SuccessPage } from "./pages/tosspay/TosspaySuccess";
import { CheckoutPage } from "./pages/tosspay/TosspayAPI";
import CustomerLayout from "./components/CustomerLayout";
import Personal from "./pages/customer/Personal";
import Notice from "./pages/customer/Notice";
import Antique from "./pages/acution/Antique";
import Limited from "./pages/acution/Limited";
import Discontiuation from "./pages/acution/discontinuation";
import ArtProduct from "./pages/acution/artProduct";
import Valuables from "./pages/acution/valuables";
import Signup1 from "./pages/signup/Signup1";
import AuctionDetailPage from "./pages/acution/detail/AuctionDetailPage";
import OnlyFooterLayout from "./components/OnlyFooterLayout";
import MyFar from "./pages/mypage/MyFar";
import MyProfile from "./pages/mypage/MyProfile";
import MyNotice from "./pages/mypage/MyNotice";
import MyPageLayout from "./components/header/MyPageLayout";
import AllList from "./pages/acution/All";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="live" element={<Live />} />
                    <Route path="auction" element={<AllList />} />
                    <Route path="auction/:postId" element={<AuctionDetailPage/>} />
                    <Route path="auction/antique" element={<Antique/>}/>
                    <Route path="auction/limited" element={<Limited/>}/>
                    <Route path="auction/discontinuation" element={<Discontiuation/>}/>
                    <Route path="auction/artproduct" element={<ArtProduct/>}/>
                    <Route path="auction/valuables" element={<Valuables/>}/>
                    <Route path="/mypage" element={<MyPageLayout />} >
                        <Route path="mynotice" element={<MyNotice/>}/>
                        <Route path="myprofile" element={<MyProfile/>}/>
                        <Route path="myfar" element={<MyFar/>}/>
                    </Route>
                    <Route path="requestitem" element={<RequestItem />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup1" element={<Signup1 />} />
                    <Route path="/customer" element={<CustomerLayout />}>
                        <Route index element={<FAQ />} />
                        <Route path="faq" element={<FAQ/>} />
                        <Route path="personal" element={<Personal />} />
                        <Route path="notice" element={<Notice />} />
                    </Route>
                </Route>
                <Route path ="/member" element={<OnlyFooterLayout/>}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup1" element={<Signup1 />} />
                </Route>
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="tosspaySuccess" element={<SuccessPage />} />
                <Route path="tosspayFail" element={<FailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
