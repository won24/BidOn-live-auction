package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController
{
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request)
    {
        UserDTO user = userService.validateLogin(request.getId(), request.getPassword());
        if (user != null)
        {
            Map<String, Object> response = new HashMap<>();
            response.put("userCode", user.getUserCode());
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("nickname", user.getNickname());
            response.put("email", user.getEmail());
            response.put("phone", user.getPhone());
            response.put("birth", user.getBirth());
            response.put("address", user.getAddress());
            response.put("cash", user.getCash());
            response.put("isAdult", user.getIsAdult());
            response.put("isAdmin", user.getIsAdmin());
            response.put("isSuspended", user.getIsSuspended());
            response.put("sendEmail", user.isSendEmail());
            response.put("sendMessage", user.isSendMessage());
            return ResponseEntity.ok(response);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}



