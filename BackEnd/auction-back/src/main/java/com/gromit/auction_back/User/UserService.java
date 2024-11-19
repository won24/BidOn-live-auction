package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean checkIfIdExists(String id) {
        return userRepository.existsById(id);
    }

    public void registerUser(SignupRequest signupRequest) {
        UserDTO user = new UserDTO();
        user.setId(signupRequest.getId());
        user.setPassword(signupRequest.getPassword());
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPhone(signupRequest.getPhone());
        user.setAddress(signupRequest.getAddress());
        user.setBirth(signupRequest.getBirth());
        user.setNickname(signupRequest.getNickname());
        user.setSendEmail(signupRequest.getMarketingPreferences().isSendEmail());
        user.setSendMessage(signupRequest.getMarketingPreferences().isSendMessage());
        user.setCash(0);
        user.setIsAdmin(false);
        user.setIsAdult(false);

        userRepository.save(user);
    }

    public UserDTO validateLogin(String id, String password)
    {
        UserDTO user = userRepository.findByIdAndPassword(id, password)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Map User entity to UserDTO
        UserDTO userDTO = new UserDTO();
        userDTO.setUserCode(user.getUserCode());
        userDTO.setIsAdmin(user.getIsAdmin());
        userDTO.setNickname(user.getNickname());
        return userDTO;
    }
}
