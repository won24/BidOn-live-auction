import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import "../../src/css/AdminLayout.css"; // 이 CSS 파일을 생성해야 합니다.

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <aside className="admin-aside">
                <ul>
                    <li>
                        <NavLink to="/admin" end activeClassName="active-link" className="admin-center-link">
                            관리자 대시보드
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/inquiries" activeClassName="active-link">
                            1:1 문의 관리
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/posts" activeClassName="active-link">
                            게시물 관리
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" activeClassName="active-link">
                            유저 정보 관리
                        </NavLink>
                    </li>
                </ul>
            </aside>
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;