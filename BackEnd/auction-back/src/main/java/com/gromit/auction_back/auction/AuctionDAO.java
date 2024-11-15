package com.gromit.auction_back.auction;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AuctionDAO {

    List<AuctionDTO> selectAllAuction();

    List<AuctionDTO> antiqueList();

    List<AuctionDTO> limitedList();

    List<AuctionDTO> discontinuationList();

    List<AuctionDTO> artProductList();

    List<AuctionDTO> valuablesList();

    void updateHits(int postId);

    AuctionDTO selectAuctionDetail(int postId);

    List<AuctionDTO> selectSearchItems(String q, String categoryCode);
}
