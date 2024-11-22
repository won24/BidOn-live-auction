// 경매품 (/mypage/myauctionitem)

/*
* 내 글(1 : 1 문의)-> 정원님이 고객센터에서 이미 구현하심
* 내 글(경매품) -> 아직 안 했던 상태
* 어차피 내 글 안에는 1 : 1 문의와 경매품 2가지가 더 있기 때문에 1:1 문의를 빼면 경매품만 남으니까 아예 '내 글'을 '경매품'으로 교체(?)
* */

import { useEffect, useState } from "react";
import axios from "axios";

function MyAuctionItem({ loggedInUser }) {
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
                const response = await axios.get('http://localhost:8080/mypage/myauctionitem');
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

export default MyAuctionItem;