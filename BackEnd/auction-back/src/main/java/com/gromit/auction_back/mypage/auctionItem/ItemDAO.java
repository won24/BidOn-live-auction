// 경매품 DAO

package com.gromit.auction_back.mypage.auctionItem;


import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ItemDAO {

    ItemDTO findByAuctionItem(ItemDTO itemDTO);
}
