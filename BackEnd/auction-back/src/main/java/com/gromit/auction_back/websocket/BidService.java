package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
            System.out.println("서비스에서" + bidRequest);
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

    public Integer getHighestBid(int postId) {
        return bidDAO.getHighestBid(postId);
    }

    public boolean getAllrefund(int postId) {
        List<BidDTO> bids = bidDAO.getAllrefund(postId);
        if(bids != null && !bids.isEmpty()) {
            for (BidDTO bid : bids) {
                try {
                    // 현재 사용자의 잔액을 가져옵니다.
                    int currentCash = bidDAO.getUserCash(bid.getUserCode());

                    // 환불할 금액을 현재 잔액에 더합니다.
                    int newCash = currentCash + bid.getCurrentCash();

                    // 업데이트된 잔액으로 사용자의 cash를 갱신합니다.
                    bidDAO.updateUserCash(bid.getUserCode(), newCash);

                    System.out.println("환불 완료: User " + bid.getUserCode() +
                            ", 환불 금액: " + bid.getCurrentCash() +
                            ", 갱신된 잔액: " + newCash);
                } catch (Exception e) {
                    System.err.println("환불 처리 중 오류 발생 (User " + bid.getUserCode() + "): " + e.getMessage());
                    // 여기서 추가적인 예외 처리나 로깅을 수행할 수 있습니다.
                    // 예: 실패한 환불을 별도로 기록하거나, 관리자에게 알림을 보내는 등
                }
            }
            return true;
        } else {
            System.out.println("환불할 내역이 없습니다. (PostId: " + postId + ")");
            return false;
        }
    }

    public BidDTO toprateUser(int postId) {
        return bidDAO.toprateUser(postId);
    }
}