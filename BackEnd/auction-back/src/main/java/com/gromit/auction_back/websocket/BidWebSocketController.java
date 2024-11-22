package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BidWebSocketController {

    @Autowired
    private BidService bidService;

    @MessageMapping("/bid")
    @SendTo("/topic/bids")
    public BidDTO handleBid(BidDTO bidDTO) {
        // 입찰 로직 처리
        boolean success = bidService.processBid(bidDTO);
        if (success) {
            // 성공적인 입찰 처리 후, 업데이트된 정보를 반환
            return bidService.getUpdatedBidInfo(bidDTO.getPostId());
        } else {
            // 실패한 경우, 현재 상태 그대로 반환
            return bidDTO;
        }
    }
}