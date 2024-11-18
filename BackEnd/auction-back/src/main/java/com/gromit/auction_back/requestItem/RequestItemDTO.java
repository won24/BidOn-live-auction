package com.gromit.auction_back.requestItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestItemDTO {
    private int postId;
    private String title;
    private String content;
    private Date date;
    private String categoryCode;
    private int userCode;
    private int startCash;
}

