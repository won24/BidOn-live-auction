// 내가 쓴 글 (/mypage/mynotice)
// 보통 게시물의 비밀 댓글과 유사한 기능. 작성자와 관리자만 열람 가능

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const MyNotice = ( postId, currentUser ) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // const postId = "12345";  // 올바른 형태의 문자열로 지정(하다 말았음 ㅋ)
                const response = await axios.get("/mypage/mynotice");
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [postId]);


    // 댓글 내용, 비밀 댓글 여부, 볼 수 있는 사용자 목록을 저장할 상태 변수
    const [content, setContent] = useState('');
    const [isSecret, setIsSecret] = useState(false);
    const [visibleUsers, setVisibleUsers] = useState([]);

    // 폼 제출 시 실행되는 함수
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            // 서버에 댓글 작성 요청 보내기
            const response = await axios.post('http://localhost:3000/mypage/mynotice/', {
                content,       // 댓글 내용
                isSecret,      // 비밀 댓글 여부
                visibleUsers,  // 볼 수 있는 사용자 목록
                postId         // 게시글 ID
            });
            // 댓글 작성 성공 후 처리 (예 : 댓글 목록 새로고침)
            console.log("댓글 작성 성공 : ", response.data);
        } catch (error) {
            // 댓글 작성 실패 시 에러 처리
            console.log("댓글 작성 실패 : " , error);
        }
        // 폼 초기화
        setContent('');
        setIsSecret(false);
        setVisibleUsers([]);
    };

    return (

        <div>
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    {comment.isSecret && !comment.visibleUsers.includes(currentUser.id) ? (
                        <p>비밀 댓글입니다.</p>
                    ) : (
                        <div>
                            <p><strong>{comment.username}</strong></p>
                            <p>{comment.content}</p>
                            <p>작성일 : {comment.createdAt}</p><br/>
                        </div>
                    )}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                {/* 댓글 내용을 입력하는 textarea 요소 */}
                <textarea value={content} onChange={(e) => setContent(e.target.value)}/> {/* 입력 값이 변경될 때마다 상태 업데이트*/}
                {/* 상태에 저장된 값을 textarea 에 반영 */}

                {/* 비밀 댓글 체크박스 레이블 */}
            <label>
                <input type="checkbox"   // 체크박스
                    checked={isSecret} // 상태에 따라 체크 여부 결정
                    onChange={() => setIsSecret(!isSecret)}  // 쳌 여부 변경 시 상태 업데이트
                />1:1 대화 적용
                <button type="submit">대화 요청</button>
                </label>
            </form>
        </div>
    )
}

export default MyNotice;