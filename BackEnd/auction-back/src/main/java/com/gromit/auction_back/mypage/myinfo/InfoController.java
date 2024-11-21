package com.gromit.auction_back.mypage.myinfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
// infoController 의 모든 메소드가 "/mypage" 경로 아래에 매핑된다는 의미
// InfoController 의 메소드는 모두 "/mypage" 를 기본 경로로 함
public class InfoController {

    private final InfoService infoService;
    // InfoService. 는 다른 코드의 도움을 받아 작업을 처리함
    // InfoService -> infoService 저장

    @Autowired
    public InfoController(InfoService infoService) {
        this.infoService = infoService;
        // InfoController 를 구현하기 위해 InfoService 라는 도구(?) 를 넣어줌으로써
        // InfoController 가 InfoService 기능을 사용할 수 있음.
    }

    @GetMapping("/myprofile")
    public List<InfoDTO> getMyProfile() {
        List<InfoDTO> allInfo = infoService.allSelect();
        // InfoService 를 이용해 데이터(사용자 정보 리스트)를 가져옴
        return allInfo;
        // 가져온 데이터를 요청한 allInfo 에 돌려줌
    }
}
