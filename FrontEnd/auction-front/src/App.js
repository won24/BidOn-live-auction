
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
import Signup from "./pages/signup/Signup";
import MyFar from "./pages/mypage/MyFar";
import OnlyFooterLayout from "./components/OnlyFooterLayout";
import MyProfile from "./pages/mypage/MyProfile";
import MyNotice from "./pages/mypage/MyNotice";
import MyPageLayout from "./components/header/MyPageLayout";
import PersonalInquire from "./pages/customer/PersonalInquire";
import AllList from "./pages/acution/All";
import AuctionDetailPage from "./pages/acution/detail/AuctionDetailPage";
import Admin from "./pages/admin/Admin";
import Antique from "./pages/acution/Antique";
import PostEditPage from "./pages/acution/detail/PostEditPage";
import AdminLayout from "./components/AdminLayout";
import AdminInquire from "./pages/admin/AdminInquire";
import AdminBoard from "./pages/admin/AdminBoard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetail from "./pages/admin/AdminUserDatail";



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
                    <Route path="auction/:postId" element={<AuctionDetailPage/>} />
                    <Route path="/auction/update/:postId" element={<PostEditPage/>}/>
                    <Route path="/mypage" element={<MyPageLayout />} >
                        <Route path="mynotice" element={<MyNotice/>}/>
                        <Route path="myprofile" element={<MyProfile/>}/>
                        <Route path="myfar" element={<MyFar/>}/>
                    </Route>
                    <Route path="requestitem" element={<RequestItem />} />
                    <Route path="/customer" element={<CustomerLayout />}>
                        <Route index element={<FAQ />} />
                        <Route path="faq" element={<FAQ/>} />
                        <Route path="personal" element={<Personal />} />
                        <Route path="personalinquire" element={<PersonalInquire />} />
                        <Route path="notice" element={<Notice />} />
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminInquire />} />
                        <Route path="inquiries" element={<AdminInquire />} />
                        <Route path="posts" element={<AdminBoard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="users/:userCode" element={<AdminUserDetail />} />
                    </Route>
                </Route>
                <Route path ="/member" element={<OnlyFooterLayout/>}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup/>} />
                </Route>
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="tosspaySuccess" element={<SuccessPage />} />
                <Route path="tosspayFail" element={<FailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
