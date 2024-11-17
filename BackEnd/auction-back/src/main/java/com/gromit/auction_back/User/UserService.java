package com.gromit.auction_back.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userDAO.selectAllUsers();
    }

    public boolean isIdDuplicate(String id)
    {
        return userRepository.existsById(id);
    }
}
