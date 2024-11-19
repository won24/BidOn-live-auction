package com.gromit.auction_back.mypage.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favo")
public class FavoController {

    private final FavoService favoService;

    @Autowired
    public FavoController(FavoService favoService) {
        this.favoService = favoService;
    }

    @PostMapping("/favoList")
    public List<FavoDTO> favolist(@RequestBody FavoDTO favoDTO) {
        System.out.println("요청 받은 데이터: " + favoDTO); // 요청 데이터 확인용 출력
         int usercode = favoDTO.getUserCode();
        System.out.println(usercode+"코드");
        List<FavoDTO> allList = favoService.allselect(favoDTO); // 서비스에서 데이터 가져오기
//        System.out.println(allList);
        return allList; // 가져온 데이터를 클라이언트로 반환
    }
}
