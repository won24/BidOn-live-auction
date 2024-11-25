package com.gromit.auction_back.mypage.auctionItem;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/myauctionitem")
    public ResponseEntity<?> getMyAuctionItem(@RequestParam ItemDTO itemDTO) {
        ItemDTO item = itemService.getUserAuctionItem(itemDTO);
        if (item == null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이템을 찾을 수 없습니다.");
        }
    }
}
