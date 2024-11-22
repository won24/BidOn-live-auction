package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {

    private final BidDAO bidDAO;

    @Autowired
    public BidService(BidDAO bidDAO) {
        this.bidDAO = bidDAO;
    }

    public boolean processBid(BidDTO bidDTO) {
        // 1. 현재 경매 상태 확인
        int currentHighestBid = bidDAO.getCurrentHighestBid(bidDTO.getPostId());

        // 2. 입찰 금액이 현재 최고 입찰액보다 높은지 확인
        if (bidDTO.getBidAmount() <= currentHighestBid) {
            return false;
        }

        // 3. 사용자의 현재 잔액 확인
        int userCash = bidDAO.getUserCash(bidDTO.getUserCode());
        if (userCash < bidDTO.getBidAmount()) {
            return false;
        }

        // 4. 입찰 처리
        bidDAO.updateBid(bidDTO);

        // 5. 사용자 잔액 업데이트
        bidDAO.updateUserCash(bidDTO.getUserCode(), userCash - bidDTO.getBidAmount());

        return true;
    }

    public BidDTO getUpdatedBidInfo(int postId) {
        // 해당 postId의 최신 입찰 정보를 조회하여 반환
        return bidDAO.getLatestBidInfo(postId);
    }
}