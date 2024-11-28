package com.gromit.auction_back.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/inquire")
    public List<AdminDTO> inquireList() {
        return adminService.getAllInquire();
    }
    @GetMapping("/answer")
    public ResponseEntity<String> answerInquiry(@RequestParam int userCode, String answer) {
        try {
            System.out.println(userCode+"<-아이디 답변->"+answer);
            adminService.answerInquiry(userCode, answer);
            return ResponseEntity.ok("Answer submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to submit answer: " + e.getMessage());
        }
    }

}
