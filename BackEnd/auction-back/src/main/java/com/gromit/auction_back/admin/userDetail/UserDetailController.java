package com.gromit.auction_back.admin.userDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class UserDetailController {


    private final UserDetailService userDetailService;

    @Autowired
    public UserDetailController(UserDetailService userDetailService) {
        this.userDetailService = userDetailService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDetailDTO>> getAllUsers() {
        try {
            System.out.println("모든유저 겟또~");
            List<UserDetailDTO> users = userDetailService.getAllUsers();
         //   System.out.println(users);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @PutMapping("/updatecash/{userCode}")
    public ResponseEntity<String> updateCash(@PathVariable int userCode, @RequestBody Map<String, Integer> requestBody) {
        Integer newCash = requestBody.get("cash");  // 전달된 캐시 값

        if (newCash == null) {
            return ResponseEntity.badRequest().body("Invalid cash value.");
        }

        // 서비스 계층을 통해 사용자 캐시 업데이트 처리
        boolean isUpdated = userDetailService.updateUserCash(userCode, newCash);

        if (isUpdated) {
            return ResponseEntity.ok("Cash updated successfully.");
        } else {
            return ResponseEntity.status(500).body("Failed to update cash.");
        }
    }


    @GetMapping("/users/{userCode}")
    public ResponseEntity<UserDetailDTO> getBoardsByUserCode(@PathVariable int userCode) {
        try {
            System.out.println("유저 코드 " + userCode + "의 게시글 조회");
            List<UserDetailDTO> boards = userDetailService.getBoardsByUserCode(userCode);
            UserDetailDTO user = userDetailService.getUserByCode(userCode);
            System.out.println(user);
            if (!boards.isEmpty()) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/bid/{userCode}")
    public ResponseEntity<UserDetailDTO> getUserById(@PathVariable int userCode){
        try {
            System.out.println("유저 코드 " + userCode + "의 상세정보");
            UserDetailDTO user = userDetailService.getUserByCode(userCode);
            System.out.println("유저정보확인"+user);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error occurred while fetching user: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
