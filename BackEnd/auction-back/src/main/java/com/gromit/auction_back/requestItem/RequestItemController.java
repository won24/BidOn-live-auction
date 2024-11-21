package com.gromit.auction_back.requestItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/requestitem")
public class RequestItemController {

    private final RequestItemService requestItemService;

    @Autowired
    public RequestItemController(RequestItemService requestItemService) {
        this.requestItemService = requestItemService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> requestItem(@RequestBody RequestItemDTO requestItemDTO) {
        // 폼 데이터를 DB에 저장하고, postId를 생성
        System.out.println(requestItemDTO+"첫번째 리퀘스트바디");
        int postId = requestItemService.saveAll(requestItemDTO);

        // postId 반환
        Map<String, Object> response = new HashMap<>();
        response.put("postId", postId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
