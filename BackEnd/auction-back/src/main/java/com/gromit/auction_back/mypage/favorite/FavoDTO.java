package com.gromit.auction_back.mypage.favorite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoDTO {
    private int userCode;
    private int postId;
    private boolean status;
// 이렇게 하면 게터세터 안 해도 됨
// 화면에 뿌려주는 거 닉네임,제목, 사진

    private String title;
    private String imageUrl;

}
