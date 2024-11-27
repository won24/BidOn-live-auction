// 내 정보 Controller

package com.gromit.auction_back.mypage.myinfo;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mypage")
// infoController 의 모든 메소드가 "/mypage" 경로 아래에 매핑된다는 의미
// InfoController 의 메소드는 모두 "/mypage" 를 기본 경로로 함
public class InfoController {

    private final InfoService infoService;
    // InfoService. 는 다른 코드의 도움을 받아 작업을 처리함
    // InfoService -> infoService 저장

    public InfoController(InfoService infoService) {
        this.infoService = infoService;
        // InfoController 를 구현하기 위해 InfoService 라는 도구(?) 를 넣어줌으로써
        // InfoController 가 InfoService 기능을 사용할 수 있음.
    }

    @PostMapping("/myprofile")
    public ResponseEntity<?> getUserProfile(@RequestBody InfoDTO infoDTO) {
        try {
            // PayloadDTO에서 userCode 추출
            int userCode = infoDTO.getUserCode();
            System.out.println("Received userCode: " + userCode);

            // userService를 통해 사용자 정보 가져오기
            InfoDTO user = infoService.getInfoByUserCode(userCode);
            System.out.println(user);
            if (user != null) {
                // 사용자 정보 반환
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("사용자를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류: " + e.getMessage());
        }
    }

    // 비밀번호 변경 처리
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody InfoDTO infoDTO) {
        try {
            // InfoDTO에서 userCode와 newPassword를 받아서 비밀번호 변경
            infoService.changePassword(infoDTO.getUserCode(), infoDTO.getNewPassword());
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
