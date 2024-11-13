// 내가 쓴 글 (/mypage/mynotice)
// 고객센터에서 작성된 1 : 1 상담 글 중 본인이 작성한 상담 글만 보여지는 페이지

import { Component } from "react";
import React from "react";

class MyNotice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: { id: 1, name: "sua"}, // 로그인 한 사용자 정보
            comments: [
                { id: 1, content: "첫 번째 1 : 1 상담 글입니다.", author: 1, isSecret: true},
                { id: 2, content: "두 번째 1 : 1 상금 글입니다. 작성자와 관리자만 열람 가능합니다.", author: 2, isSecret: true},
                { id: 3, content: "세 번째 공개 상담 글입니다.", author: 1, isSecret: false}
            ]
        };
    }

    // 사용자가 작성한 1 : 1 상담 글만 필터링
    getUserComments = () => {
        const { comments, loggedInUser } = this.state;
        return comments.filter(comment => {
            // 댓글이 1 : 1 상담 글이며, 사용자가 작성한 댓글인 경우
            return (comment.isSecret && comment.author === loggedInUser.id) || !comment.isSecret;
        });
    };

    render() {
        const userComments = this.getUserComments();

        return (
            <div>
                <h1>고객센터</h1>
                <h2>1 : 1 상담 글 목록</h2>
                <ul>
                    {userComments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.content}</p>
                            <small>{comment.author === this.state.loggedInUser.id ? "본인 작성" : "관리자 또는 다른 작성자"}</small>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default MyNotice;