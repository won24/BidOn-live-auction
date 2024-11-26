package com.gromit.auction_back.websocket;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BidDAO {
        int getCurrentHighestBid(int postId);
        int getUserCash(int userCode);
        void updateBid(BidDTO bidDTO);
        void updateUserCash(@Param("userCode") int userCode, @Param("newCash") int newCash);

        BidDTO getLatestBidInfo(int postId);
        @Insert("INSERT INTO bid (userCode, postId, currentCash) VALUES (#{userCode}, #{postId}, #{bidAmount})")
        void insertBid(BidRequest bidRequest);

        void updateAuctionStatus(@Param("postId") int postId, @Param("currentPrice") int currentPrice);
}
