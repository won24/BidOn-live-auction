// 참여 경매 DTO

package com.gromit.auction_back.mypage.participate;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipateDTO {

    private int postId;
    private String title;
    private String content;
    private int userCode;
}