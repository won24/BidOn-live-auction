// 즐겨찾기 DTO

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
    private String title;
    private String imageUrl;
}
