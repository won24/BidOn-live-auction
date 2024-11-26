package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BidService {

    private final BidDAO bidDAO;

    @Autowired
    public BidService(BidDAO bidDAO) {
        this.bidDAO = bidDAO;
    }

//    @Transactional
//    public BidDTO processBid(BidDTO bidDTO) {
//        int currentHighestBid = bidDAO.getCurrentHighestBid(bidDTO.getPostId());
//        int userCash = bidDAO.getUserCash(bidDTO.getUserCode());
////
////        if (bidDTO.getBidAmount() <= currentHighestBid || userCash < bidDTO.getBidAmount()) {
////            return null; // 입찰 실패
////        }
//
//        // 새로운 입찰 정보 삽입
//        bidDAO.insertBid(bidDTO);
//
//        // 사용자 잔액 업데이트
//        bidDAO.updateUserCash(bidDTO.getUserCode(), userCash - bidDTO.getBidAmount());
//
//        // 경매 상태 업데이트
//        bidDAO.updateAuctionStatus(bidDTO.getPostId(), bidDTO.getBidAmount());
//
//        return getUpdatedBidInfo(bidDTO.getPostId());
//    }

    public BidDTO getUpdatedBidInfo(int postId) {
        return bidDAO.getLatestBidInfo(postId);
    }

    @Transactional
    public boolean saveBid(BidRequest bidRequest) {
        try {
            System.out.println("서비스에서"+bidRequest);
            bidDAO.insertBid(bidRequest);
            return true;  // Assuming insertBid returns the number of rows affected
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return false;
        }
    }

    public boolean isValidBid(int postId, int userCode, int bidAmount) {
        return true;
    }
}