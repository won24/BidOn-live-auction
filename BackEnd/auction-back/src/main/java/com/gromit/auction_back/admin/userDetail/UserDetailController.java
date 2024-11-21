package com.gromit.auction_back.admin.userDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/users/{userCode}")
    public ResponseEntity<List<UserDetailDTO>> getBoardsByUserCode(@PathVariable int userCode) {
        try {
            System.out.println("유저 코드 " + userCode + "의 게시글 조회");
            List<UserDetailDTO> boards = userDetailService.getBoardsByUserCode(userCode);
            System.out.println(boards);
            if (!boards.isEmpty()) {
                return ResponseEntity.ok(boards);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
