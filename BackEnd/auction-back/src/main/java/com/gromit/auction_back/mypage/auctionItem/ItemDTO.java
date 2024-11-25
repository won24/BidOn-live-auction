// 경매품 DTO

package com.gromit.auction_back.mypage.auctionItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {

    private int categoryCode;   // 경매품 카테고리 코드
    private String title;       // 경매품 명
    private String content;     // 경매품 설명
    private double price;       // 경매품 가격
    private String imageUrls;   // 경매품 이미지 Url

}