package com.gromit.auction_back.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bid")
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }
//    @PostMapping("/save")
//    public ResponseEntity<String> createBid(@RequestBody BidDTO bidDTO) {
//        try {
//            System.out.println("bid테이블 세이브"+bidDTO);
//            bidService.saveBid(bidDTO);
//            return ResponseEntity.ok("bid테이블 저장 완료");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("저장 중 오류가 발생했습니다: " + e.getMessage());
//        }
    }