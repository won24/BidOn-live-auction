package com.gromit.auction_back.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BidResponse {
    private boolean success;
    private String message;
    private int postId;
    private int bidAmount;
}
