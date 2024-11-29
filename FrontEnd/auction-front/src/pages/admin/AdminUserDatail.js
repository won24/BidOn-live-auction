import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/AdminUserDetail.css";

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
                const response = await axios.get(`http://112.221.66.174:8081/admin/users/${userCode}`);
                setUser(response.data);
                console.log(response.data+"디테일")
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError('사용자 정보를 불러오는 데 실패했습니다.');
                console.error('Error fetching user details:', err);
            }
        };

        fetchUserDetail();
    }, [userCode]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="userdetail-container">
            <h2>사용자 상세 정보</h2>
            <table className="user-detail-table">
                <tbody>
                <tr>
                    <td>사용자 코드:</td>
                    <td>{user.userCode}</td>
                </tr>
                <tr>
                    <td>ID:</td>
                    <td>{user.id}</td>
                </tr>
                <tr>
                    <td>비밀번호:</td>
                    <td>{user.password}</td>
                </tr>
                <tr>
                    <td>이름:</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>닉네임:</td>
                    <td>{user.nickname}</td>
                </tr>
                <tr>
                    <td>생년월일:</td>
                    <td>{user.birth}</td>
                </tr>
                <tr>
                    <td>이메일:</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>전화번호:</td>
                    <td>{user.phone}</td>
                </tr>
                <tr>
                    <td>주소:</td>
                    <td>{user.address}</td>
                </tr>
                <tr>
                    <td>보유 캐시:</td>
                    <td>{user.cash}</td>
                </tr>
                <tr>
                    <td>성인 여부:</td>
                    <td>{user.isAdult ? '예' : '아니오'}</td>
                </tr>
                <tr>
                    <td>관리자 여부:</td>
                    <td>{user.isAdmin ? '예' : '아니오'}</td>
                </tr>
                <tr>
                    <td>정지 여부:</td>
                    <td>{user.isSuspended ? '예' : '아니오'}</td>
                </tr>
                <tr>
                    <td>이메일 수신 동의:</td>
                    <td>{user.sendEmail ? '예' : '아니오'}</td>
                </tr>
                <tr>
                    <td>메시지 수신 동의:</td>
                    <td>{user.sendMessage ? '예' : '아니오'}</td>
                </tr>
                <tr>
                    <td>가입일:</td>
                    <td>{new Date(user.createUser).toLocaleString()}</td>
                </tr>
                </tbody>
            </table>

            <h3>사용자 게시물</h3>
            <table className="user-posts-table">
                <thead>
                <tr>
                    <th>게시물 코드</th>
                    <th>게시물 제목</th>
                </tr>
                </thead>
                <tbody>
                {user.posts && user.posts.map((post, index) => (
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