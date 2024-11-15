package com.gromit.auction_back.requestItem;

import java.util.Date;

public class RequestItemDTO {
    private int postId;
    private String title;
    private String content;
    private Date date;
    private String categoryCode;
    private int userCode;
    private int currentCash;

    public RequestItemDTO() {
    }

    public RequestItemDTO(int postId, String title, String content, Date date, String categoryCode, int userCode, int currentCash) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.date = date;
        this.categoryCode = categoryCode;
        this.userCode = userCode;
        this.currentCash = currentCash;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public int getUserCode() {
        return userCode;
    }

    public void setUserCode(int userCode) {
        this.userCode = userCode;
    }

    public int getCurrentCash() {
        return currentCash;
    }

    public void setCurrentCash(int currentCash) {
        this.currentCash = currentCash;
    }

    @Override
    public String toString() {
        return "RequestItemDTO{" +
                "postId=" + postId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", categoryCode='" + categoryCode + '\'' +
                ", userCode=" + userCode +
                ", currentCash=" + currentCash +
                '}';
    }
}

