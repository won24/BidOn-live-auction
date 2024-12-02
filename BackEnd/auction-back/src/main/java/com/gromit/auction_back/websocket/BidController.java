package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }
    @GetMapping("/{postId}")
    public ResponseEntity<Integer> getHighestBid(@PathVariable int postId) {
        System.out.println("여기로 오는지 확인");
        Integer highestBid = bidService.getHighestBid(postId);
        System.out.println("최고가 갱신!"+highestBid);
        return ResponseEntity.ok(highestBid != null ? highestBid : 0); // 입찰 기록이 없으면 0 반환
    }
    @GetMapping("/end/{postId}")
    public boolean getAllBidsForPost(@PathVariable int postId){
        bidService.getAllrefund(postId);
        return true;
    }
    @GetMapping("/top/{postId}")
    public BidDTO toprateUser(@PathVariable int postId){
        return bidService.toprateUser(postId);
    }
    @GetMapping("/check/{postId}/{userCode}")
    public Integer checkUserBid(@PathVariable int postId, @PathVariable int userCode) {
        return bidService.checkUserBid(postId, userCode);
    }
    @GetMapping("/check/{postId}")
    public Integer checkPostBid(@PathVariable int postId){
        return  bidService.checkPostBid(postId);
    }

}