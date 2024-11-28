package com.gromit.auction_back.websocket;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BidDAO {
//        int getCurrentHighestBid(int postId);
//
//        int getUserCash(int userCode);
//
//        void updateBid(BidDTO bidDTO);
//
//        void updateUserCash(@Param("userCode") int userCode, @Param("newCash") int newCash);

        BidDTO getLatestBidInfo(int postId);

        @Insert("INSERT INTO bid (userCode, postId, currentCash) VALUES (#{userCode}, #{postId}, #{bidAmount})")
        void insertBid(BidRequest bidRequest);

     //   void updateAuctionStatus(@Param("postId") int postId, @Param("currentPrice") int currentPrice);

        @Select("SELECT MAX(currentCash) FROM bid WHERE postId = #{postId}")
        Integer getHighestBid(@Param("postId") int postId);

        @Select("SELECT b.* " +
                "FROM bid b " +
                "INNER JOIN ( " +
                "    SELECT userCode, MAX(currentCash) as maxCash " +
                "    FROM bid " +
                "    WHERE postId = #{postId} " +
                "    GROUP BY userCode " +
                ") max_bids ON b.userCode = max_bids.userCode AND b.currentCash = max_bids.maxCash " +
                "WHERE b.postId = #{postId} " +
                "  AND b.currentCash < ( " +
                "    SELECT MAX(currentCash) " +
                "    FROM bid " +
                "    WHERE postId = #{postId} " +
                "  ) " +
                "ORDER BY b.currentCash DESC")
        List<BidDTO> getAllrefund(int postId);

        @Update("UPDATE users SET cash = #{currentCash} WHERE UserCode = #{userCode}")
        void updaterefund(int userCode, int currentCash);

        @Select("SELECT cash from users WHERE UserCode = #{userCode}")
        int getUserCash(int userCode);

        @Update("UPDATE users SET cash = #{newCash} WHERE UserCode = #{userCode}")
        void updateUserCash(int userCode, int newCash);

        @Select("SELECT * FROM bid " +
                "WHERE postId = #{postId} " +
                "ORDER BY currentCash DESC " +
                "LIMIT 1")
        BidDTO toprateUser(int postId);
}
