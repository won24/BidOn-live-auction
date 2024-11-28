// 참여 경매 DTO

package com.gromit.auction_back.mypage.participate;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipateDTO {

    private int categoryCode;  // 경매품 카테고리 코드
    private int userCode;      // 회원 유저코드
    private String title;      // 경매 제목
    private Double finalCash; // 현재 가격
}