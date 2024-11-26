package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class BidWebSocketController {

    @Autowired
    private BidService bidService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/bid")
    @SendTo("/topic/bids")
    public BidResponse processBid(BidRequest bidRequest) {
        // 1. 입찰 데이터 검증
        System.out.println("Received bid request: " + bidRequest);  // 로그 추가
        System.out.println("여긴?"+bidRequest.getUserCode()+ bidRequest.getBidAmount()+ bidRequest.getPostId());

        if (bidRequest == null) {
            System.out.println("Bid request is null");  // null 체크
            return new BidResponse(false, "Invalid bid request", 0, 0);
        }

        // 2. 데이터베이스에 입찰 정보 저장
        try {
            System.out.println("웹소켓 매핑");
            boolean success = bidService.saveBid(bidRequest);
            if (success) {
                // 3. 성공적으로 처리된 경우, 업데이트된 정보를 모든 클라이언트에게 브로드캐스트
                return new BidResponse(true, "입찰정보가 저장됨.", bidRequest.getPostId(), bidRequest.getBidAmount());
            } else {
                return new BidResponse(false, "입찰정보가 저장되지않음.", bidRequest.getPostId(), bidRequest.getBidAmount());
            }
        } catch (Exception e) {
            return new BidResponse(false, "서버 오류가 발생했습니다.", bidRequest.getPostId(), bidRequest.getBidAmount());
        }
    }

    private boolean isValidBid(BidRequest bidRequest) {
        // 입찰의 유효성을 검사하는 로직
        // 예: 최소 입찰 금액, 경매 종료 여부 등을 확인
        return bidService.isValidBid(bidRequest.getPostId(), bidRequest.getUserCode(), bidRequest.getBidAmount());
    }
}
