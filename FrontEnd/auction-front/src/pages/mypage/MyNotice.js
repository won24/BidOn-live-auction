// 내가 쓴 글 (/mypage/mynotice)
// 고객센터에서 작성된 1 : 1 상담 글 중 본인이 작성한 상담 글만 보여지는 페이지

/*
* 각 상담 글은 author 가 현재 로그인한 사용자와 일치하면 "본인 작성" 이라고 표시되고,
* 그 외의 글은 "관리자 또는 작성자만 열람 가능" 으로 표시됨
*
* 로그인한 사용자가 본인의 1 : 1 상담 글을 볼 수 있으며, 공개 상담 글은 누구나 볼 수 있음
* */

import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

class MyNotice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: { id: 3, name: "sua"}, // 로그인한 사용자 정보
            comments: [
                { id: 1, content: "첫 번째 1 : 1 상담 글입니다.", author: 1, isSecret: true},  // 첫 번째 상담 글(작성자 1, 비밀 글)
                { id: 2, content: "두 번째 1 : 1 상금 글입니다. 작성자와 관리자만 열람 가능합니다.", author: 2, isSecret: true}, // 두 번째 상담 글(작성자 2, 비밀 글)
                { id: 3, content: "세 번째 공개 상담 글입니다.", author: 3, isSecret: false}   // 세 번째 상담 글(작성 자 3, 공개 글)
            ]
        };
    }

    // 사용자가 작성한 1 : 1 상담 글 필터링 메소드
    getUserComments = () => {
        const { comments, loggedInUser } = this.state;

        // 댓글 목록에서 사용자가 작성한 비밀 댓글과 공개 댓글 필터링
        return comments.filter(comment => {
            // 비밀 댓글(isSecret 이 true) 인 경우, 작성자 ID 가 로그인 한 사용자와 일치하면 필터링
            // 공개 댓글(isSecret 이 false) 인 경우에는 모두 포시
            return (comment.isSecret && comment.author === loggedInUser.id) || !comment.isSecret;
        });
    };

    render() {
        const userComments = this.getUserComments();  // 사용자가 볼 수 있는 상담 글만 가져옴

        return (
            <div>
                <h2>고객센터</h2>
                <div>
                    <Link to="/mypage/auction">경매품</Link>
                    <Link to="/mypage/inquiry">1 : 1 문의</Link>
                </div>
                <h3>1 : 1 상담 글 목록</h3>
                <ul>
                    {/* 필터링 된 사용자가 볼 수 있는 상담 글을 순회하여 목록으로 출력 */}
                    {userComments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.content}</p>
                            {/* 상담 글이 본인 작성인지 관리자 또는 다른 작성자만 볼 수 있는 글인지 표시 */}
                            <small>{comment.author === this.state.loggedInUser.id ? "본인 작성" : "관리자 또는 작성자만 열람 가능"}</small>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default MyNotice;

