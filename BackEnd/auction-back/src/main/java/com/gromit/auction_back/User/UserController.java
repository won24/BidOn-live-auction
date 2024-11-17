package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController
{
    private final UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

//    @GetMapping("/")
//    public String showRequestUsersPage()
//    {
//        return "requestUsers"; // db연동 테스트
//    }
//8080/api/users

    @GetMapping("/users")
    public List<UserDTO> getAllUsers()
    {
        return userService.getAllUsers();
    }

    @PostMapping("/check-id")
    public ResponseEntity<Boolean> checkIdDuplication(@RequestBody String id)
    {
        boolean isDuplicate = userService.isIdDuplicate(id); // Implement logic in UserService
        return ResponseEntity.ok(isDuplicate);
    }
}
