package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    private final UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkId(@RequestParam String id)
    {
        boolean isDuplicate = userRepository.existsById(id);
        return ResponseEntity.ok(isDuplicate);
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname)
    {
        boolean isDuplicate = userRepository.existsByNickname(nickname);
        return ResponseEntity.ok(isDuplicate);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest)
    {
        try {
            // Validate passwords
            if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword()))
            {
                return ResponseEntity.badRequest().body("Passwords do not match.");
            }

            // Check if ID already exists
            boolean exists = userService.checkIfIdExists(signupRequest.getId());
            if (exists)
            {
                return ResponseEntity.badRequest().body("ID is already taken.");
            }

            // Save user details
            userService.registerUser(signupRequest);

            return ResponseEntity.ok("Signup successful.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
