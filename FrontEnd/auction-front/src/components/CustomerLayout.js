import {NavLink, Outlet} from "react-router-dom";

const CustomerLayout = () => {
    return (
        <div className="customer-layout">
            <aside className="customer-sidebar">
                <div className="sidebar-title">고객센터</div>
                <ul>
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
            <main className="customer-content">
                <Outlet />
            </main>
        </div>
    );
}
export default CustomerLayout;