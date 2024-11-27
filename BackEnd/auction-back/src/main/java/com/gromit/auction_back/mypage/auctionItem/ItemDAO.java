// 경매품 DAO

package com.gromit.auction_back.mypage.auctionItem;



import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemDAO {

    List<ItemDTO> auctionItem(int userCode);
}
