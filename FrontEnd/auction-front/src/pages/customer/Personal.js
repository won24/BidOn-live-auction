import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Personal = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        UserCode: 7,
        Id: 'user7',
        Password: 'password7',
        Name: '나야,오류',
        email: 'user7@example.com',
        phone: '010-7777-7777',
        birthDate: '1996-07-07',
        address: '울산시 남구',
        cash: 7000,
        gender: '남',
        isAdult: 'y',
        isAdmin: 'n',
        nickName: 'nickname7',
        isSuspended: 'n'
    });
    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const userCode = loginInfo.UserCode;
                console.log("Fetching posts for user:", userCode);
                const response = await axios.post('/customer/personal', { userCode });
                console.log("Full response:", response);
                console.log("Response data:", response.data);

                if (Array.isArray(response.data)) {
                    setUserPosts(response.data);
                } else if (typeof response.data === 'object' && response.data !== null) {
                    // 만약 응답이 배열이 아니라 객체라면, 그 객체의 특정 필드를 사용
                    setUserPosts(response.data.posts || []);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('서버에서 예상치 못한 형식의 데이터를 반환했습니다.');
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
                setError(`게시물을 불러오는데 실패했습니다: ${error.message}`);
            }
        };
        fetchUserPosts();
    }, [loginInfo]);

    const handleCreatePost = () => {
        navigate('/customer/personalinquire');
    };
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return 'Invalid Date';
        }
        return date.toLocaleDateString();
    };

    return (
        <div className="personal-container">
            <h2>1:1 문의</h2>
            <div className="user-posts">
                <h3>내 게시물</h3>
                {userPosts.length > 0 ? (
                    <ul>
                        {userPosts.map((post, index) => (
                            <li key={index}>
                                <Link to={`/customer/personal/${index+1}`}>
                                    {post.title}
                                </Link>
                                <span> - {formatDate(post.createdAt)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>작성한 게시물이 없습니다.</p>
                )}
            </div>
            <button onClick={handleCreatePost}>새 게시물 작성</button>
        </div>
    );
}

export default Personal;