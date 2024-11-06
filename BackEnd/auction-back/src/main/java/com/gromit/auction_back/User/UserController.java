package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
    public class UserController {

        private final UserService userService;

        @Autowired
        public UserController(UserService userService) {
            this.userService = userService;
        }
//    @GetMapping("/")
//    public String showRequestUsersPage() {
//        return "requestUsers"; // db연동 테스트
//    }

        @GetMapping("/users")
        public List<UserDTO> getAllUsers() {
            List<UserDTO> userList = userService.getAllUsers();
            return userList;
        }
}
