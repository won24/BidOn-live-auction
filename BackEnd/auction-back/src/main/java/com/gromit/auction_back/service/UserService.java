package com.gromit.auction_back.service;

import com.gromit.auction_back.common.dto.UserDTO;
import com.gromit.auction_back.model.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<UserDTO> getAllUsers() {
        return userDAO.selectAllUsers();
    }

}
