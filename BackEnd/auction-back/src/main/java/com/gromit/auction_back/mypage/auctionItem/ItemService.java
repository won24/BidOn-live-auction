// 경매품 Service

package com.gromit.auction_back.mypage.auctionItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemDAO itemDAO;

    public List<ItemDTO> getItemsByUserCode(int userCode) {

        List<ItemDTO> itemDTOList = itemDAO.getItemsByUserCode(userCode);

        return itemDTOList;
    }

    // 경매품 조회
//    public List<ItemDTO> auctionItem(String userCode) {
//        // 경매품 아이템을 조회
//        List<ItemDTO> itemList = itemDAO.auctionItem(userCode);// tlqkf userCode getaway...
//
//        // 조회된 아이템이 없으면 빈 리스트 반환
//        if (itemList == null || itemList.isEmpty()) {
//            return List.of(); // 빈 리스트 반환
//        }
//
//        return itemList;
//    }

}

