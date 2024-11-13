// 즐겨찾기 (/mypage/myfar)

import React from "react";
import { Component } from "react";

class MyFar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                { id: 1, title: "게시물 1", content: "내용 1" },
                { id: 2, title: "게시물 2", content: "내용 2" },
                { id: 3, title: "게시물 3", content: "내용 3" },
            ],
            fars: [] // 빈 배열로 초기화
        };
    }

    // 즐겨찾기 추가/제거 메서드
    toggleFar = (post) => {
        this.setState((prevState) => {
            const isFar = (prevState.fars || []).some((fav) => fav.id === post.id); // 오류 수정
            if (isFar) {
                // 이미 즐겨찾기 되어있으면 제거
                return {
                    fars: prevState.fars.filter((fav) => fav.id !== post.id),
                };
            } else {
                // 즐겨찾기에 추가
                return {
                    fars: [...prevState.fars, post],
                };
            }
        });
    };

    render() {
        const { posts, fars } = this.state;

        return (
            <div>
                <h2>게시물 목록</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => this.toggleFar(post)}>
                                {fars.some((fav) => fav.id === post.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                            </button>
                        </li>
                    ))}
                </ul>

                <h2>즐겨찾기 게시물</h2>
                {fars.length > 0 ? (
                    <ul>
                        {fars.map((post) => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>즐겨찾기 한 게시물이 없습니다.</p>
                )}
            </div>
        );
    }
}

export default MyFar;
