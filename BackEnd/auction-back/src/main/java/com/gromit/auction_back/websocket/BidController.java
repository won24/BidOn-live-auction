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

    @PostMapping
    public ResponseEntity<String> placeBid(@RequestBody BidDTO bidDTO) {
        boolean result = bidService.processBid(bidDTO);
        if (result) {
            return ResponseEntity.ok("Bid placed successfully");
        } else {
            return ResponseEntity.badRequest().body("Bid failed");
        }
    }
}