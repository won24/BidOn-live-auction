// 경매품 Service

package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemDAO itemDAO;

    public static List<ItemDTO> getUserItems(String userCode) {
        return null;
    }

//    public ItemDTO getUserItems(ItemDTO itemDTO) {
//       ItemDTO item = itemDAO.findByAuctionItem(itemDTO);
//       if (item != null) {
//           return new ItemDTO();
//       }
//        return null;
//    }
}

//@Service
//public class ParticipationService {
//
//    @Autowired
//    private ParticipationMapper participationMapper;
//
//    // 사용자가 신청한 경매품 목록 조회
//    public List<AuctionItemDTO> getUserParticipatedItems(String userCode) {
//        return participationMapper.getUserParticipatedItems(userCode);
//    }
//}

