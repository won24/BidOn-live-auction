package com.gromit.auction_back.mypage.auctionItem;

import java.util.List;

public class ItemDTO {

    private int categoryCode;      // 경매품 카테고리 코드
    private String categoryName;   // 카테고리 이름
    private String description;    // 경매품 설명
    private int price;             // 경매품 가격
    private List<String> imageUrls; // 경매품 이미지 Url

    public ItemDTO() {
    }

    public ItemDTO(int categoryCode, String categoryName, String description, int price, List<String> imageUrls) {
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
        this.description = description;
        this.price = price;
        this.imageUrls = imageUrls;
    }

    public int getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(int categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    @Override
    public String toString() {
        return "ItemDTO{" +
                "categoryCode=" + categoryCode +
                ", categoryName='" + categoryName + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", imageUrls=" + imageUrls +
                '}';
    }
}
