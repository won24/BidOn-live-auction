package com.gromit.auction_back.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BidDTO {
    private int postId;
    private int userCode;
    private int bidAmount;
    private int currentCash;
}
