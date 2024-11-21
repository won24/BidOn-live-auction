package com.gromit.auction_back.User;

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
@RequestMapping("/api/auth")
public class LoginController
{
    @Autowired
    private UserService userService;

    @Autowired
    private UserController userController;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request)
    {
        UserDTO user = userService.validateLogin(request.getId(), request.getPassword());
        if (user != null)
        {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login success");
            response.put("userCode", user.getUserCode());
            response.put("isAdmin", user.getIsAdmin()); // Assuming isAdmin is a boolean in UserDTO
            response.put("nickname", user.getNickname());
            return ResponseEntity.ok(response);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}



