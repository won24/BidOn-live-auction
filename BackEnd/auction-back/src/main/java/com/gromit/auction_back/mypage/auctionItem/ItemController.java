// 경매품 컨트롤러

package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class ItemController {

    @Autowired
    private ItemService itemService;  // Spring에서 자동으로 주입받기

    @GetMapping("/myauctionitem")
    public ResponseEntity<List<ItemDTO>> getAuctionResult(@RequestParam String userCode) {
        List<ItemDTO> auctionItems = itemService.auctionItem(userCode);
        return ResponseEntity.ok(auctionItems);
    }
}

