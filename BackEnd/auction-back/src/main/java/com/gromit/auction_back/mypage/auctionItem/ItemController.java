// 경매품 Controller

package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class ItemController {

    @Autowired
    private ItemService itemService;  // Spring에서 자동으로 주입받기

    @GetMapping("/myauctionitem")
    public List<ItemDTO> getUserAuctionItems(@RequestParam int userCode) {
        return itemService.auctionItem(userCode);
    }
}

