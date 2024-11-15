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
    // 이렇게 하면 게터세터 안 해도 됨
}
