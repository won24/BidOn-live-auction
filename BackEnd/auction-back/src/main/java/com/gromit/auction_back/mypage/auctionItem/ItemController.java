// 경매품 컨트롤러

package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/myauctionitem")
    public ResponseEntity<List<ItemDTO>> getMyAuctionItem(@RequestParam String userCode) {
        List<ItemDTO> auctionItems = ItemService.getUserItems(userCode);
        return ResponseEntity.ok(auctionItems);
    }
}
