import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/admin/users');
            setUsers(response.data);
            console.log(users);
            setLoading(false);
        } catch (err) {
            setError('사용자 정보를 불러오는 데 실패했습니다.');
            setLoading(false);
            console.error('Error fetching users:', err);
        }
    };

    const handleUserClick = (user) => {
        console.log("온클릭", user);
        navigate(`/admin/users/${user.userCode}`, { state: { user } });
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="users-container">
            <h2>사용자 관리</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr 
                            key={user.id} 
                            onClick={() => handleUserClick(user)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{new Date(user.createUser).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;