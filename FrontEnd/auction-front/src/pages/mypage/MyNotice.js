// 내가 쓴 글 (/mypage/mynotice)
// 고객센터에서 작성된 1 : 1 상담 글 중 본인이 작성한 상담 글만 보여지는 페이지

/*
* 각 상담 글은 author 가 현재 로그인한 사용자와 일치하면 "본인 작성" 이라고 표시되고,
* 그 외의 글은 "관리자 또는 작성자만 열람 가능" 으로 표시됨
*
* 로그인한 사용자가 본인의 1 : 1 상담 글을 볼 수 있으며, 공개 상담 글은 누구나 볼 수 있음
* */


import { useEffect, useState } from "react";
import axios from "axios";

function MyNotice({ loggedInUser }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // 서버에서 데이터 요청
                const response = await axios.get('/');
                const data = response.data;

                // 로그인한 사용자에게 보여줄 글 필터링
                const filterPosts = data.filter(post =>
                post.isPublic || post.author === loggedInUser);

                setPosts(filterPosts);
            } catch (err) {
                setError("데이터를 가져오는 중 오류가 발생했습니다.")
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [loggedInUser]);

    if (loading) return <p>로딩 중 ... </p>
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>1 : 1 상담</h2>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '20px', border: '1px soild #ccc', padding: '10px'}}>
                    <h3>{post.title}</h3>
                    <p>
                        {post.author === loggedInUser ? "본인 작성" : "관리자 또는 작성자만 열람 가능"}
                    </p>
                    {post.author === loggedInUser || post.isPublic ? (
                        <p>{post.content}</p>
                    ) : (
                        <p>이 글은 열람할 수 없습니다.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MyNotice;