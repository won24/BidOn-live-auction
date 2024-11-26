package com.gromit.auction_back.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BidRequest {
    private int userCode;
    private int postId;
    private int bidAmount;
}
