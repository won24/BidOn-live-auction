// 참여 경매 Controller

package com.gromit.auction_back.mypage.participate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class ParticipateController {

    @Autowired
    private ParticipateService participateService;

    // 경매 참여 목록 API
    @GetMapping("/myauction")
    public ResponseEntity<List<ParticipateDTO>> getParticipatedAuctions(@RequestParam String userCode) {
        List<ParticipateDTO> participatedAuctions = participateService.participationAuction(userCode);
        return ResponseEntity.ok(participatedAuctions);
    }

    // 낙찰받은 경매 목록 API
    @GetMapping("/successbid")
    public ResponseEntity<List<ParticipateDTO>> getWonAuctions(@RequestParam String userCode) {
        List<ParticipateDTO> wonAuctions = participateService.getAuctions(userCode);
        return ResponseEntity.ok(wonAuctions);
    }
}
