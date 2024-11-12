import { NavLink, Outlet } from "react-router-dom";
import "../css/CustomerLayout.css";
import {useState} from "react";

    const CustomerLayout = () => {



    return (
        <div className="customer-layout">
            <aside className="customer-aside">
                <ul>
                    <li>
                        <NavLink to="/customer" activeClassName="active-link" className="customer-center-link">
                           고객센터
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customer/faq" activeClassName="active-link">
                            자주하는 질문
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customer/personal" activeClassName="active-link">
                            1:1 상담
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customer/notice" activeClassName="active-link">
                            공지사항
                        </NavLink>
                    </li>
                </ul>
            </aside>
            <div className="outlet-fixsize">
                <Outlet/>
            </div>
        </div>
    );
    }
export default CustomerLayout;