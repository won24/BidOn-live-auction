import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminUserDetail = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userCode } = useParams();
    const location = useLocation();
    const userInfo = location.state?.user;

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                setLoading(true);
                console.log("파람스 유저코드 확인 "+userCode);
                const response = await axios.get(`/admin/users/${userCode}`);
                setUser(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error('Error fetching user details:', err);
            }
        };

        fetchUserDetail();
    }, [userCode]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-user-detail">
            <h2>사용자 상세 정보</h2>
            <p>ID: {userInfo.id}</p>
            <p>이름: {userInfo.name}</p>
            <p>가입일: {new Date(userInfo.createUser).toLocaleDateString()}</p>
            
            <h3>사용자 게시물</h3>
            <table>
                <thead>
                    <tr>
                        <th>게시물 코드</th>
                        <th>게시물 제목</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((post, index) => (
                        <tr key={index}>
                            <td>{post.postId}</td>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserDetail;