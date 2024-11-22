package com.gromit.auction_back.mypage.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class FavoController {

    private final FavoService favoService;

    @Autowired
    public FavoController(FavoService favoService) {
        this.favoService = favoService;
    }

    @PostMapping("/myfar")
    public List<FavoDTO> favolist(@RequestBody FavoDTO favoDTO) {
        System.out.println("요청 받은 데이터 : " + favoDTO); // 요청 데이터 확인용 출력
        System.out.println("userCode" + favoDTO.getUserCode());
        System.out.println("postId" + favoDTO.getPostId());

        int userCode = favoDTO.getUserCode();
        int postId = favoDTO.getPostId();

        System.out.println(userCode + "코드");
        System.out.println(postId + "게시글 ID");

        List<FavoDTO> allList = favoService.allselect(favoDTO); // 서비스에서 데이터 가져오기

        System.out.println(allList);
        return allList; // 가져온 데이터를 클라이언트로 반환
    }
}
