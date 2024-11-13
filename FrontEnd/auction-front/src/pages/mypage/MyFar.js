// 즐겨찾기 (/mypage/myfar)

/*
* posts 는 전체 게시물 목록, fars 는 즐겨찾기된 게시물 목록을 관리
*
* toggleFar 메소드는 게시물이 즐겨찾기 목록에 있는지 확인 후 이미 있을 시 제거, 없을 시 추가
*
* fars 의 길이에 따라 즐겨찾기된 게시물이 있는지 확인 후 목록을 보여주거나 "즐겨찾기 한 게시물이 없습니다." 라는 메시지 표시
* */

import React from "react";
import { Component } from "react";

class MyFar extends Component {

    // 생성자 메소드 - 초기 상태 정의
    constructor(props) {
        super(props);  // Component 의 생성자 호출
        this.state = {
            posts: [  // 게시물 목록을 상태로 저장
                { id: 1, title: "게시물 1", content: "내용 1" },
                { id: 2, title: "게시물 2", content: "내용 2" },
                { id: 3, title: "게시물 3", content: "내용 3" },
            ],
            fars: [] // 즐겨찾기 목록을 빈 배열로 초기화
        };
    }

    // 즐겨찾기 추가/제거 메서드
    toggleFar = (post) => {
        // 상태 업데이트 함수 호출
        this.setState((prevState) => {
            // 게시물이 이미 즐겨찾기 목록에 있는지 확인
            const isFar = (prevState.fars || []).some((fav) => fav.id === post.id); // 오류 수정

            if (isFar) {
                // 이미 즐겨찾기된 경우, 해당 게시물 제거
                return {
                    fars: prevState.fars.filter((fav) => fav.id !== post.id),
                };
            } else {
                // 즐겨찾기에 목록에 없으면, 게시물 추가
                return {
                    fars: [...prevState.fars, post],
                };
            }
        });
    };

    // 렌더링 메소드
    render() {
        const { posts, fars } = this.state;  // 상태에서 게시물과 즐겨찾기 목록 추출

        return (
            // 전체 컴포넌트를 감싸는 div
            <div>
                <h2>게시물 목록</h2>
                <ul>
                    {posts.map((post) => (
                        // 각 게시물의 제목, 내용, 즐겨찾기 버튼
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
                {fars.length > 0 ? (  // 즐겨찾기 게시물이 있는 경우
                    <ul>
                        {fars.map((post) => (
                            // 즐겨찾기된 게시물의 제목과 내용 표시
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // 즐겨찾기된 게시물이 없을 때 표시할 텍스트
                    <p>즐겨찾기 한 게시물이 없습니다.</p>
                )}
            </div>
        );
    }
}

export default MyFar;
