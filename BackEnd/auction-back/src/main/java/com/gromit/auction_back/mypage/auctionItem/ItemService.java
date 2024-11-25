package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    private ItemDAO itemDAO;

    public ItemDTO getUserAuctionItem(ItemDTO itemDTO) {
       ItemDTO item = itemDAO.findByAuctionItem(itemDTO);
       if (item != null) {
           return new ItemDTO();
       }
        return null;
    }
}
